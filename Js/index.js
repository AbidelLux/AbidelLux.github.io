function verifica(){
    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;
    if (user == "admin" && pass=="admin"){
        window.location = "CargaMasiva.html";
    } else{
        alert("Datos Incorrectos")
    }
}
