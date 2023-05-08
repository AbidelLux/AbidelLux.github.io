// let NaryTree = require('./structu

tree =  new Tree();
lista = new ListaCircular();
let lista45= new SparseMatrix()
var index =null
let clave="caracoles"
let arr = [];
let permisos = [];





function crearCarpeta(e){
    e.preventDefault();
    let folderName =  $('#folderName').val();
    let path =  $('#path').val();
    if (folderName===""){
        alert("Ingrese un nombre de carpeta válido.")
    } else {
        folderName=tree.validarDuplicado(folderName,0)
        tree.insert(folderName, path);
        añadirALista(folderName,"Se creo carpeta ")

        localStorage.setItem("tree"+index, JSON.stringify(tree))
        alert("Todo bien!")
        $('#carpetas').html(tree.getHTML(path))
    }
}

function añadirALista(name,action){
    const fechaActual = new Date();
    const añoActual = fechaActual.getFullYear();
    const mesActual = fechaActual.getMonth() + 1;
    const diaActual = fechaActual.getDate();
    const horaActual = fechaActual.getHours();
    const minutosActuales = fechaActual.getMinutes();
    const segundosActuales = fechaActual.getSeconds();
    const fechaCompleta = `${añoActual}-${mesActual}-${diaActual}`;
    const horaCompleta = `${horaActual}:${minutosActuales}:${segundosActuales}`;

    let cadena=action+"\\n'"+name+"'"
    
    

    lista.añadirInicio(cadena,name,fechaCompleta,horaCompleta)
    // lista.tail.siguiente=null

    arr = [];
    let currentNode = lista.head;
    // console.log(currentNode)
    do {
    arr.push([currentNode.text,currentNode.archivo,currentNode.fecha,currentNode.hora]);
    currentNode = currentNode.siguiente;
    } while (currentNode !== lista.head);

    // localStorage.removeItem(arr)
    localStorage.setItem("lista"+index, JSON.stringify(arr))
    console.log(name+"Se añadió correctamente.")

}

function entrarCarpeta(folderName){
    let path = $('#path').val();
    lista45 = new SparseMatrix()
    let curretPath = path == '/'? path + folderName : path + "/"+ folderName;
    console.log(curretPath)
    
    $('#path').val(curretPath);
    $('#boton').html(`<button onclick="eliminarCarpet()" class="btn btn-personalizado2 w-100"> Eliminar Carpeta</button>`)
    $('#carpetas').html(tree.getHTML(curretPath))
    let path2 = $('#path').val();
    valor=tree.getFolder(path2)
    for (i=0;i<valor.matriz.length;i++){
        lista45.insert(valor.matriz[i][0], valor.matriz[i][1],valor.matriz[i][2]);
    }
}

function entrarCarpeta1(){
    let curretPath2 = $('#path').val();
    console.log(curretPath2)
    lista45 = new SparseMatrix()
    if (tree.getFolder(curretPath2)===null){
        alert("Ingrese una ruta válida.")
    }
    else {
        $('#boton').html(`<button onclick="eliminarCarpet()" class="btn btn-personalizado2 w-100"> Eliminar Carpeta</button>`)
        $('#carpetas').html(tree.getHTML(curretPath2))
        let path2 = $('#path').val();
        valor=tree.getFolder(path2)
        for (i=0;i<valor.matriz.length;i++){
            lista45.insert(valor.matriz[i][0], valor.matriz[i][1],valor.matriz[i][2]);
        }
    }
    
}



function abrirVentana() {
    let text=""

    let avlTree = new AvlTree();
    let temp2 = localStorage.getItem("avlTree")
    avlTree.root = JSON.parse(temp2).root;

    let path = $('#path').val();
    let temp=tree.getFolder(path)
    let lista456=temp.files

    for(let i=0;i<lista456.length;i++){
        if (lista456[i].type==="text/plain"){
            var file1="text";
        }else if (lista456[i].type==="image/jpeg" || lista456[i].type==="image/png"){
            var file1=lista456[i].type.replace("image/","");
        } else {
            var file1=lista456[i].type.replace("application/","")
        }
        text+=`<option value="`+lista456[i].name+"."+file1+`">${lista456[i].name}.`+file1+`</option>`
    }
    // console.log(text)
    // console.log(avlTree.inOrderPlegable())
    $('#ceder').html(`<select id="miSelect">
                        <option value="">Seleccione el archivo</option>`+
                        text
                        +`
                       </select>`);

    $('#ceder2').html(`<select id="miSelect2" >
                        <option value="">Seleccione carnet</option>`+
                        avlTree.inOrderPlegable()+
                        `</select>`)
    
    $('#ceder3').html(`<select id="miSelect3" >
                       <option value="">Seleccione permiso</option>
                       <option value="r"> r   </option>
                       <option value="w"> w   </option>
                       <option value="r-w"> r-w </option>
                      </select>
                      <a href="usuario.html" class="btn mt-3 btn-personalizado2 "> Cancelar </a>
                      <button onclick="guardarValores()" class="btn mt-3 btn-personalizado2 "> Guardar</button>`)

}

function guardarValores(){
    console.log(lista45);
    let clav=localStorage.getItem("caracoles");
    clav=JSON.parse(clav).id;
    let path = $('#path').val();
    let curretPath = path == '/'? path + folderName : path + "/"+ folderName;
    var miSelect = document.getElementById("miSelect");
    var miSelect2 = document.getElementById("miSelect2");
    var miSelect3 = document.getElementById("miSelect3");
    var valorSeleccionado = miSelect.value;
    var valorSeleccionado2 = miSelect2.value;
    var valorSeleccionado3 = miSelect3.value;
    console.log("Valor 1 seleccionado: " + valorSeleccionado);
    console.log("Valor 2 seleccionado: " + valorSeleccionado2);
    console.log("Valor 3 seleccionado: " + valorSeleccionado3);

    let temp=tree.getFolder(path);
    temp.matriz.push([valorSeleccionado,valorSeleccionado2,valorSeleccionado3]);
    lista45.insert(valorSeleccionado, valorSeleccionado2, valorSeleccionado3);
    curretPath=curretPath.replace("/[object HTMLInputElement]","")
    if (curretPath===""){
        curretPath="/"
    }
    permisos.push({"Propietario":clav,"Destino":valorSeleccionado2,"Ubicación":curretPath,"Archivo":valorSeleccionado,"Permisos":valorSeleccionado3})
    console.log(curretPath)
    console.log(permisos)
    localStorage.setItem("Permisos",JSON.stringify(permisos))

    localStorage.setItem("tree"+index, JSON.stringify(tree));
    alert("Permiso concedido")
}

function eliminarCarpet(){
    let path = $('#path').val();
    temp=tree.getFolder(path)
    añadirALista(temp.folderName,"Se eliminó carpeta ")
    tree.eliminarFolder(path);
    localStorage.removeItem('tree'+index);
    localStorage.setItem("tree"+index, JSON.stringify(tree))
    retornarInicio()
}

function retornarInicio(){
    
    $('#boton').html(``)
    if (localStorage.getItem(clave) != null){

        let temp2 = localStorage.getItem(clave)
        index = JSON.parse(temp2).id;
        if (localStorage.getItem("tree"+index)!=null){
            if (localStorage.getItem("Permisos")!==null){
                console.log("actualizado")
                permisos=localStorage.getItem("Permisos")
                permisos=JSON.parse(permisos);
                console.log(permisos)
            }
            let temp = localStorage.getItem("tree"+index)
            let path = $('#path').val();
            tree.root = JSON.parse(temp).root;
            tree.size = JSON.parse(temp).size;
            const arrFromStorage = JSON.parse(localStorage.getItem("lista"+index));
            for (let i = 0; i < arrFromStorage.length; i++) {
                lista.añadirInicio(arrFromStorage[i][0],arrFromStorage[i][1],arrFromStorage[i][2],arrFromStorage[i][3]);   
            }
            $('#path').val("/");
            $('#carpetas').html(tree.getHTML("/"))
            valor=tree.getFolder(path)
            for (i=0;i<valor.matriz.length;i++){
                lista45.insert(valor.matriz[i][0], valor.matriz[i][1], valor.matriz[i][2]);
            }
        }
        else {
            console.log("árbol y lista no creado aún ;)")
        }
        
    }
    else {
        console.log("no se pudo prro el valor del index es: " ,index)

    }
}

function showTreeGraph(){
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = `digraph G { ${tree.graph()} }`
    //console.log(body)
    $("#graph").attr("src", url + body);
}

function showListaGraph(){
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = `digraph G { ${lista.toGraph()} }`
    // console.log(body)
    $("#graph1").attr("src", url + body);
}

function showMatrixGraph(){
    let path = $('#path').val();
    let url = 'https://quickchart.io/graphviz?graph=';
    let arbol=tree.getFolder(path)
    console.log(lista45)
    // console.log(lista45.matriz.graph3());
    let body = `digraph G { ${lista45.graphChido()} }`
    $("#graph3").attr("src", url + body);
}


const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

function  verificaArchivo(name,list,num){
    const elementoEncontrado = list.find(function(elemento) {
        return elemento.name === name;
    });
    if (elementoEncontrado){
        name=name+num
        console.log("se econtró duplicado")
        // console.log(name)
        return verificaArchivo(name,list,num+1)
    }
    else{
        return name
    }

}

const subirArchivo =  async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const form = Object.fromEntries(formData);
    // console.log(form.file.type);
    let path = $('#path').val();
    if (form.fileName!=""){
        let nombre = verificaArchivo(form.fileName,tree.getFolder(path).files,0)
        if(form.file.type === 'text/plain'){
            // ARCHIVO DE TEXTO
            let fr = new FileReader();
            fr.readAsText(form.file);
            fr.onload = () => { 
                // CARGAR ARCHIVO A LA MATRIZ
                tree.getFolder(path).files.push({
                    name: nombre, 
                    content: fr.result, 
                    type: form.file.type
                })
                var file123=form.file.type.replace("text/plain","txt");
                añadirALista(nombre+"."+file123,"Se creo archivo ")
                localStorage.setItem("tree"+index, JSON.stringify(tree));
                $('#carpetas').html(tree.getHTML(path));
            };
        }else{
            // IMÁGENES O PDF 
            let parseBase64 = await toBase64(form.file);
            tree.getFolder(path).files.push({
                name: nombre, 
                content: parseBase64, 
                type: form.file.type
            })
            var file123=form.file.type.replace("image/","");
            añadirALista(nombre+"."+file123,"Se creo imagen/pdf ")
            localStorage.setItem("tree"+index, JSON.stringify(tree));
            $('#carpetas').html(tree.getHTML(path));
            // console.log(parseBase64)
            //$("#imagenSubida").attr("src", imgBase64); 
            // console.log(await toBase64(form.file));
        }
        alert('Archivo Subido!')
    } else {
        alert("Seleccione un nombre válido.")
    }
    

}

function verifica(){
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    console.log(username,password)
    if (username === "admin" && password === "admin") {
        index={"id":username};
        localStorage.setItem(clave, JSON.stringify(index));
        console.log("clave guardada");
        window.location.href = "../-EDD_1S2023_PY_202006681/EDD_Proyecto1_Fase3/frontend/administrador/administrador.html";
    } else{
        NodoChetado=avlTree.find(username,password)
        if (NodoChetado!=null) {
            console.log(NodoChetado);
            alert("se pudo B)");
            if (localStorage.getItem(clave) === null) {
                index={"id":username};
                localStorage.setItem(clave, JSON.stringify(index));
                console.log("clave guardada");
            }
            else {
                localStorage.removeItem(clave);
                console.log("clave cambiada");
                index={"id":username};
                localStorage.setItem(clave, JSON.stringify(index));
            }
            window.location.href = "../-EDD_1S2023_PY_202006681/EDD_Proyecto1_Fase3/frontend/usuario/usuario.html";
        } else {
            if (localStorage.getItem(clave) != null) {
                localStorage.removeItem(clave);
            }
            alert("Credenciales incorrectas. Inténtalo de nuevo.");
        }
    }
    
}

function reinicio(){
    localStorage.removeItem(clave);  
}


$( document ).ready(retornarInicio);