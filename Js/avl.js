class Nodo{
    constructor(_name, _carne,_password,_carpetaRaiz){
        this.name=_name;
        this.carne = _carne;
        this.password = _password;
        this.carpetaRaiz = _carpetaRaiz;
        this.izquierda = null;
        this.derecha = null;
        this.altura = 0;
    }
}

class AVL{
    constructor(){
        this.raiz = null;
    }
    //maximo
    MAXIMO(valor1,valor2){
        if(valor1>valor2) return valor1;
        return valor2;
    }
    //altura del arbol
    altura(nodo){
        if(nodo == null) return -1;
        return nodo.altura;
    }
    //insertar
    insertar(name,carne,pass,carpetaRaiz){
        this.raiz = this.add(name,carne,pass,carpetaRaiz,this.raiz)

    }
    //insertar recursivo
    add(name,carne,pass,carpetaRaiz, nodo){
        if(nodo == null) return new Nodo(name,carne,pass,carpetaRaiz);
        else{
            if(carne < nodo.carne){
                nodo.izquierda = this.add(name,carne,pass,carpetaRaiz, nodo.izquierda)
                if(this.altura(nodo.derecha)-this.altura(nodo.izquierda) == -2){
                    //programar los casos 
                    //rsi
                    if(carne < nodo.izquierda.carne){
                        nodo = this.rotacionizquierda(nodo);
                    }//rdi}
                    else{
                        nodo = this.Rotaciondobleizquierda(nodo);
                    }
                    
                }
            }else if(carne > nodo.carne){
                nodo.derecha = this.add(name,carne,pass,carpetaRaiz, nodo.derecha);
                if(this.altura(nodo.derecha)-this.altura(nodo.izquierda)== 2){
                    //otros dos casos
                    //rotacion simple derecha
                    if(carne > nodo.derecha.carne){
                        nodo = this.rotacionderecha(nodo);
                    }else{
                        nodo = this.Rotaciondoblederecha(nodo);
                    }
                    //rotacion doble derecha
                }
            }else{
                nodo.carne = carne;
            }
        }
        nodo.altura = this.MAXIMO(this.altura(nodo.izquierda),this.altura(nodo.derecha))+1
        return nodo;
    }


    //rotacion simple izquierda
    rotacionizquierda(nodo){
        var aux = nodo.izquierda;
        nodo.izquierda = aux.derecha;
        aux.derecha = nodo;
        //calculo de nueva altura
        nodo.altura = this.MAXIMO(this.altura(nodo.derecha),this.altura(nodo.izquierda))+1;
        aux.altura = this.MAXIMO(this.altura(nodo.izquierda), nodo.altura)+1;
        return aux;
    }
    //rotacion simple derecha
    rotacionderecha(nodo){
        var aux = nodo.derecha;
        nodo.derecha = aux.izquierda;
        aux.izquierda = nodo;
        //calcular de nuevo altura
        nodo.altura = this.MAXIMO(this.altura(nodo.derecha),this.altura(nodo.izquierda))+1;
        aux.altura = this.MAXIMO(this.altura(nodo.derecha),nodo.altura)+1;
        return aux;
    }
    //rotacion dobles derecha
    Rotaciondoblederecha(nodo){
        nodo.derecho = this.rotacionizquierda(nodo.derecho);
        return this.rotacionderecha(nodo);
    }

    //rotaciones dobles
    Rotaciondobleizquierda(nodo){
        nodo.izquierda = this.rotacionderecha(nodo.izquierda);
        return this.rotacionizquierda(nodo);
    }

    //recorridos
    preorden(){
        this.pre_orden(this.raiz);
    }
    pre_orden(nodo){
        if(nodo!=null){
            console.log("valor=" +nodo.carne);
            this.pre_orden(nodo.izquierda);
            this.pre_orden(nodo.derecha);
        }
    }

    //postorden
    postorden(){
        this.post_orden(this.raiz);
    }
    post_orden(nodo){
        if(nodo!=null){
            this.post_orden(nodo.izquierda);
            this.post_orden(nodo.derecha);
            console.log("valor=" +nodo.carne);
        }
    }
    //inorden
    inorden(){
        this.in_orden(this.raiz);
    }
    in_orden(nodo){
        if(nodo!=null){
            this.in_orden(nodo.izquierda);
            console.log("valor=" +nodo.carne);
            this.in_orden(nodo.derecha);    
        }
    }
}

function showAvlGraph(){
    console.log(document.getElementById("ejemplo2").value);

    var cadenaADividir = document.getElementById("ejemplo2").value;
    var cadenaADividir1 = "[{nombre:victor},{nombre:carlos}";
    var separador = "}"
    var arrayDeCadenas = cadenaADividir.split(separador);

    for (var i=0; i < arrayDeCadenas.length; i++) {
       console.log(arrayDeCadenas[i] + " / ");
    }
}



console.log("Recorrido preorden")
var arbolavl = new AVL();



arbolavl.insertar("Victor Lux",201403946,"vic123","/");
arbolavl.insertar("Carlos Lopez",201903946,"vic123","/");
arbolavl.insertar("Daniel",202003946,"vic123","/");
arbolavl.insertar("Pedro",201404050,"vic123","/");
arbolavl.insertar("Marcos Witt",201408050,"vic123","/");
arbolavl.insertar("Gojo df",201603040,"vic123","/");
arbolavl.insertar(9);
console.log("Recorrido preorden")
arbolavl.preorden()
console.log("Recorrido inorden")
arbolavl.inorden()
console.log("Recorrido postorden")
arbolavl.postorden()