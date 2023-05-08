class Block{
    

    constructor(index, timestamp, transmitter, receiver, message, previusHash, hash){
        this.index = index;
        this.timestamp = timestamp;
        this.transmitter = transmitter;
        this.receiver = receiver;
        this.message = message;
        this.previusHash = previusHash; // HASH DEL BLOQUE ANTERIOR
        this.hash = hash; // HASH DEL BLOQUE ACTUAL
        
        // APUNTADORES DEL NODO
        this.next = null;
        this.prev = null;
    }
    // RETORNAR FECHA EN FORMATO DEL ENUNCIADO
    getFormatDate(){
        // FORMATO DE FECHA DD-MM-YYYY :: HH:MM:SS
        let day = this.timestamp.getDate();
        let month = this.timestamp.getMonth();
        let year = this.timestamp.getFullYear();
        let hours = this.timestamp.getHours();
        let min = this.timestamp.getMinutes();
        let sec = this.timestamp.getSeconds();
        return `${day}-${month}-${year} :: ${hours}:${min}:${sec}`;
    }
}

class BlockChain{
    // CONSTRUCTOR PARA LA LISTA DOBLE
    constructor(){
        this.head = null;
        this.end = null;
        this.size = 0;
    }

    // INSERCIÓN SÓLO AL FINAL **FUNCIÓN ASÍNCRONA**
    async insert(transmitter, receiver, message){
        let timestamp2=new Date()
        let newNode = new Block(this.size, timestamp2, transmitter, receiver, message, "","");
        if(this.head == null){
            // HASH ANTERIOR DEL PRIMER BLOQUE
            newNode.previusHash = "00000";
            // ASIGNAR EL HASH AL BLOQUE ACTUAL
            newNode.hash = await this.getSha256(newNode);
            // INSERTAR EL NODO
            this.head = newNode;
            this.end = newNode;
            // AUMENTAR TAMAÑO
            this.size++;
        }else{
            // ASIGNAR PRIMERO EL HASH ANTERIOR
            newNode.previusHash = this.end.hash;
            // CREAR EL HASH ACTUAL
            newNode.hash = await this.getSha256(newNode);
            // INSERTAR EL NODO AL FINAL
            this.end.next = newNode;
            newNode.prev = this.end;
            this.end = newNode;
            // AUMENTAR TAMAÑO
            this.size++;
        }
    }

    insert2(timestamp, transmitter, receiver, message, previusHash, hash){
        let newNode = new Block(this.size,timestamp, transmitter, receiver, message, previusHash, hash);
        if(this.head == null){
            
            // INSERTAR EL NODO
            this.head = newNode;
            this.end = newNode;
            // AUMENTAR TAMAÑO
            this.size++;
        }else{
            // ASIGNAR PRIMERO EL HASH ANTERIOR
            newNode.previusHash = this.end.hash;
            // CREAR EL HASH ACTUAL
            // INSERTAR EL NODO AL FINAL
            this.end.next = newNode;
            newNode.prev = this.end;
            this.end = newNode;
            // AUMENTAR TAMAÑO
            this.size++;
        }
    }

    // MÉTODO PARA OBTENER SHA256 DE UN BLOQUE
    // REF: https://stackoverflow.com/questions/63736585/why-does-crypto-subtle-digest-return-an-empty-object
    async getSha256(block){
        // PASAR EL OBJETO A STRING
        let str = JSON.stringify(block).toString();
        // OBTENER LOS BYTES DEL STRING 
        let bytes = new TextEncoder().encode(str);
        // OBTENER BYTES DEL HASH
        let hashBytes = await window.crypto.subtle.digest("SHA-256", bytes);
        // PASAR EL HASH A STRING 
        let hash = Array.prototype.map.call(new Uint8Array(hashBytes), x => ('00' + x.toString(16)).slice(-2)).join('');
        // RETORNAR EL HASH
        return hash;
    }

    // METODO PARA IMPRIMIR EN CONSOLA
    print(){        
        if(this.head !== null){
            let temp = this.head;
            while(temp !== null){
                console.log(temp);
                temp = temp.next;
            }
        }
    }

    // NÚMEROS DE CARNET DEL CHAT
    getMessages(transmitter, receiver){
        if(this.head !== null){
            let msgs = "";
            let temp = this.head;
            while(temp !== null){
                if(String(temp.receiver) === String(transmitter)){
                    if(String(temp.transmitter) === String(receiver)){
                        msgs += `<li class="list-group-item">${temp.message}</li>`;
                    }
                }else if(String(temp.transmitter) === String(transmitter)){
                    if(String(temp.receiver) === String(receiver)){
                        msgs += `<li class="list-group-item bg-primary text-light" style="text-align: right">${temp.message}</li>`;
                    }
                }
                temp = temp.next;
            }
            if(msgs){
                return `
                    <ul class="list-group">
                        ${msgs}
                    </ul>
                `;
            }
        }
        return "No hay mensajes";
    }

    getValores(){
        let directorio={"index":this.end.index,"timestamp":this.end.timestamp,"previusHash":this.end.previusHash,"hash":this.end.hash}
        return directorio
    }

    blockReport(index = 0){
        if(this.head){
            let temp = this.head;
            while(temp !== null){
                if(temp.index === index){
                    // EL NOMBRE DE LA TABLA TIENE EL INDEX DEL BLOQUE, PARA PODER OBTENER EL SIGUIENTE O EL ANTERIOR
                    return `
                        <table class="table bg-contenedor-3" id="block-table" style="color: #ffff" name="${temp.index}">
                            <tbody>
                                <tr>
                                    <th scope="row" class="col-3">Index</th>
                                    <td class="col-9">${temp.index}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Timestamp</th>
                                    <td>${temp.timestamp}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Transmitter</th>
                                    <td>${temp.receiver}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Receiver</th>
                                    <td>${temp.transmitter}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Message</th>
                                    <td>${temp.message}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Previus Hash</th>
                                    <td>${temp.previusHash}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Hash del Bloque</th>
                                    <td>${temp.hash}</td>
                                </tr>
                            </tbody>
                        </table>
                    `;
                }else{
                    temp = temp.next;
                }

            }
        }
        return "";
    }
    print(){        
        if(this.head !== null){
            let temp = this.head;
            while(temp !== null){
                console.log(temp);
                temp = temp.next;
            }
        }
    }

    blockGraph(){       
        nodes = "";
        connections = "";
        this.#blockGraphRecursive(this.head);
        // console.log(nodes,connections);
        return nodes + connections;
    }
    #blockGraphRecursive(current){
        if(this.head !== null){
            let temp = this.head;
            let num=0;
            while(temp !== null){
                num=current.index+1
                nodes += `S_${current.index}[label="Timestamp: ${current.timestamp} \\n Emisor: ${current.receiver} \\n Receptor: ${current.transmitter}\\n Previous: ${current.previusHash}"];\n`
                connections += `S_${current.index} -> S_${num};\n`;
                current=current.next;
                temp = temp.next;
            }
            nodes+=`S_${num}[label="Fin"]\n`
        }
    }

}