//--------------------------------------------------------------------------
//                      DECLARACIÓN DE LAS ESTRUCTURAS A UTILIZAR
//--------------------------------------------------------------------------


let avlTree = new AvlTree();
let TablaHash = new HashTable();
let permisos2 = [];
// let index2 = ""
//--------------------------------------------------------------------------
//                      FUNCIÓN PARA MANEJAR FORMULARIOS
//--------------------------------------------------------------------------
function loadStudentsForm(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const form = Object.fromEntries(formData);
    let studentsArray = [];
    try{        
        let fr = new FileReader();
        fr.readAsText(form.inputFile);
        fr.onload = () => {
            
            studentsArray = JSON.parse(fr.result).alumnos;
            //AGREGAR A LA TABLA LOS ALUMNOS CARGADOS 
            //$('#studentsTable tbody').html(

                // studentsArray.map((item, index) => {
                //     return(`
                //         <tr>
                //             <th>${item.carnet}</th>
                //             <td>${item.nombre}</td>
                //             <td>${item.password}</td>
                //         </tr>
                //     `);
                // }).join('')
            //)
            for(let i = 0; i < studentsArray.length; i++){
                avlTree.insert(studentsArray[i]);
            }
            console.log(avlTree.root)
            CargarHash(avlTree.root);
            $('#studentsTable tbody').html(
                TablaHash.imprimir()
            )
            // GUARDAR EN LOCAL STORAGE
            localStorage.setItem("avlTree", JSON.stringify(avlTree));
            localStorage.setItem("TablaHash", JSON.stringify(TablaHash))
            console.log(TablaHash)
            alert('Alumnos cargados con éxito!');
        }
    }catch(error){
        console.log(error);
        alert("Error en la inserción");
    }

}

function CargarHash(current){
    if(current.left != null){
        CargarHash(current.left);
    }
    TablaHash.insert(current.item.carnet,current.item.nombre,current.item.password);
    // console.log("Inserción hecha")
    if(current.right != null){
        CargarHash(current.right);
    }
}

function showLocalStudents(){

    let temp2 = localStorage.getItem("avlTree")
    let temp = localStorage.getItem("TablaHash")
    if (temp2===null){

    }
    else{
        avlTree.root = JSON.parse(temp2).root;
        TablaHash.table = JSON.parse(temp).table;
        TablaHash.capacidad = JSON.parse(temp).capacidad;
        TablaHash.espaciosUsados = JSON.parse(temp).espaciosUsados;
    
        if (localStorage.getItem("Permisos")!==null){
            permisos2=localStorage.getItem("Permisos");
            permisos2=JSON.parse(permisos2);
            
            $('#studentsPermisos tbody').html(
                iterarPermisos()
            );
        }
        $('#studentsTable tbody').html(
            TablaHash.imprimir()
        );
        $('#Espacios').html(
            `
            <h5>Capacidad: ${TablaHash.capacidad}</h5>
            `
        );
        $('#Espacios2').html(
            `
            <h5>Espacios Usados: ${TablaHash.espaciosUsados}</h5>
            `
        );

    }
    
    
}

function iterarPermisos(){
    let texto2=""
    texto2+=`
                <tr>
                        <th scope="col">Propietario</th>
                        <th scope="col">Destino</th>
                        <th scope="col">Ubicación</th>
                        <th scope="col">Archivo</th>
                        <th scope="col">Permisos</th>
                    </tr>`
    for(j=0;j<permisos2.length;j++){
        texto2+=`
                <tr>
                    <th>${permisos2[j]["Propietario"]}</th>
                    <th>${permisos2[j]["Destino"]}</th>
                    <th>${permisos2[j]["Ubicación"]}</th>
                    <th>${permisos2[j]["Archivo"]}</th>
                    <th>${permisos2[j]["Permisos"]}</th>
                </tr>`
    }
    return texto2;
}

//--------------------------------------------------------------------------
//                   FUNCIÓN PARA AGREGAR RECORRIDOS
//--------------------------------------------------------------------------
function showStudentsForm(e){
    e.preventDefault();
    const formData = new FormData(e.target);
    const form = Object.fromEntries(formData);
    if(avlTree.root !== null){
        switch(form.traversal){
            case 'inOrder':
                $('#studentsTable tbody').html(
                    avlTree.inOrder()
                )
                break;
            case 'preOrder':
                $('#studentsTable tbody').html(
                    avlTree.preOrder()
                )
                break;
            case 'postOrder':
                $('#studentsTable tbody').html(
                    avlTree.postOrder()
                )
                break;
            default:
                $('#studentsTable tbody').html("")
                break;
        }
    }
}

//--------------------------------------------------------------------------
//                   FUNCIÓN PARA MOSTRAR LA GRÁFICA
//--------------------------------------------------------------------------
function showAvlGraph(){
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = `digraph G {
        ${avlTree.treeGraph()}}`
    console.log(body);
    $("#graph").attr("src", url + body);
    alert('Árbol creado con éxito!')
}

// const loginButton = document.getElementById("login-button");

// loginButton.addEventListener("click", function() {





$( document ).ready(showLocalStudents);