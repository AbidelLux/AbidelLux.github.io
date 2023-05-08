
function verifica(){
    if (localStorage.getItem("caracoles")!=null){
    }else{
        window.location.href = "../../../index.html";
        alert("Inicie sesión primero");
    }

}

$( document ).ready(verifica);