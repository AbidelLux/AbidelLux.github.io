
// CLASE NODO 
class Tnode{
    
    constructor(folderName){
        this.folderName = folderName; //nombre de la carpeta
        this.files = [];              //archivos txt pdf y jpg
        this.matriz = [];
        this.children = []; // TODOS LOS NODOS HIJOS
        this.id = null; // PARA GENERAR LA GRÁFICA
    }
}


class Tree{
    constructor(){
        this.root = new Tnode('/');
        this.root.id = 0;
        this.size = 1; // Para generar los ids
    }

    insert(folderName, fatherPath){ 
        let newNode =  new Tnode(folderName);
        let fatherNode = this.getFolder(fatherPath);
        if(fatherNode){
            this.size += 1;
            newNode.id = this.size;
            console.log(newNode)
            console.log(fatherNode)
            fatherNode.children.push(newNode);//se ingresa el folder
        }else{
            console.log("Ruta no existe");
            alert("Seleccione otra ruta.")
        }
    }

    validarDuplicado(name,valor){
        // Padre sea una '/'
        // console.log(path);

            let temp = this.root;
            let folders = name.split('/');
            folders = folders.filter( str => str !== '');
            let folder = null;
            while(folders.length > 0){
                let currentFolder = folders.shift()
                folder = temp.children.find(child => child.folderName == currentFolder);
                if(typeof folder == 'undefined' || folder == null){
                    return name;
                }
                temp = folder;
            }
            valor=valor+1;
            console.log(valor)
            name=name+valor
            console.log("se encontró duplicado.")
            return this.validarDuplicado(name,valor);
        
    }

    getFolder(path){
        // Padre sea una '/'
        // console.log(path);
        if(path == this.root.folderName){
            return this.root;
        }else{
            let temp = this.root;
            let folders = path.split('/');
            folders = folders.filter( str => str !== '');
            let folder = null;
            while(folders.length > 0){
                let currentFolder = folders.shift()
                folder = temp.children.find(child => child.folderName == currentFolder);
                if(typeof folder == 'undefined' || folder == null){
                    return null;
                }
                temp = folder;
            }
            return temp;
        }
    }

    eliminarFolder(path){
        // Padre sea una '/'
        // console.log(path);
        if(path == this.root.folderName){
            alert("No se puede eliminar la carpeta raiz.");
        }else{
            let temp = this.root;
            let folders = path.split('/');
            folders = folders.filter( str => str !== '');
            let folder = null;
            while(folders.length > 0){
                let currentFolder = folders.shift()
                const folder = temp.children.findIndex(child => child.folderName === currentFolder);
                if (folder !== -1) {
                    temp.children.splice(folder, 1);
                }
            }
            temp=null;
            console.log("se elimino D:")
            alert("Carpeta eliminada.")
        }
    }

    graph(){
        let nodes = "";
        let connections = "";

        let node = this.root;
        let queue = [];
        queue.push(node);
        while(queue.length !== 0){
            let len = queue.length;
            for(let i = 0; i < len; i ++){
                let node = queue.shift();
                nodes += `S_${node.id}[label="${node.folderName}"];\n`;
                node.children.forEach( item => {
                    connections += `S_${node.id} -> S_${item.id};\n`
                    queue.push(item);
                });
            }
        }
        return 'node[shape="record"];\n' + nodes +'\n'+ connections;
    }

    getHTML(path){
        let node = this.getFolder(path);
        let code = "";
        node.children.map(child => {
            code += ` <div class="col-2 folder" onclick="entrarCarpeta('${child.folderName}')">
                        <img src="../../backend/img/carpeta1.png" width="100%"/>
                        <p class="h6 text-center">${child.folderName}</p>
                    </div>`
        })
        // console.log(node.files)
        node.files.map(file => {
            if(file.type === 'text/plain'){
                let archivo = new Blob([file.content], {type: "text/plain"});
                const url = URL.createObjectURL(archivo); 
                // archivo de texto
                code += `
                        <div class="col-2 folder">
                        <img src="../../backend/img/texto.png" width="100%"/>
                        <p class="h6  text-center">
                            <a class="docu" href="${url}" download="miArchivo.txt">
                                ${file.name}.txt
                            </a>
                        </p>
                    </div>
                `
            }else{
                if (file.type==="image/jpeg" || file.type==="image/png"){
                    var file1=file.type.replace("image/","");
                    var foto=file.content;
                } else {
                    var file1=file.type.replace("application/","")
                    var foto="../../backend/img/pdff.png"
                }
                console.log(file1)
                code += ` <div class="col-2 folder">
                        <img src="`+foto+`" width="100%"/>
                        <p class="h6  text-center">
                            <a class="docu" href="${file.content}" download>
                                ${file.name}.`+file1+` 
                            </a>
                        </p>
                    </div>`
            }
        })
        return code;
    }


    // insertFile(path, fileName, content, type){
    //     let temp = this.getFolder(path);
    //     temp.matriz.insertHeaderOnly(fileName, content, type);
    // }    

    // matrixGrpah(path){
    //     let temp = this.getFolder(path);
    //     console.log(temp.matriz);
    //     return temp.matriz.graph();
    // }
}


// module.exports = Tree;