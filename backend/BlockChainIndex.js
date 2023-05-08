
avlTree2 =  new AvlTree();
let clave2="caracoles";
let index2 =null;
let listaSoporte =[];

// INSTANCIA DE LA CLASE
let blockChain = new BlockChain();

// MOSTRAR LOS USAURIOS EN LOS SELECTS
$(document).ready(() => {
    let optionsForSelect1 = "";
    let temp2 = localStorage.getItem(clave2)
    index2 = JSON.parse(temp2).id;
    if (localStorage.getItem("avlTree")!=null){

        if (localStorage.getItem("listaSoporte")!==null){
            const arrFrom = JSON.parse(localStorage.getItem("listaSoporte"));
            console.log(arrFrom)
            for (let i = 0; i < arrFrom.length; i++) {
                //directorio["index"],directorio["timestamp"],transmitter, receiver, msgt,directorio["previusHash"],directorio["hash"]
                blockChain.insert2( arrFrom[i]["timestamp"],
                                    arrFrom[i]["transmitter"],
                                    arrFrom[i]["receiver"],
                                    arrFrom[i]["Msg"],
                                    arrFrom[i]["previusHash"],
                                    arrFrom[i]["hash"]);

                listaSoporte.push( {"timestamp":arrFrom[i]["timestamp"],
                                    "transmitter":arrFrom[i]["transmitter"],
                                    "receiver":arrFrom[i]["receiver"],
                                    "Msg":arrFrom[i]["Msg"],
                                    "previusHash":arrFrom[i]["previusHash"],
                                    "hash":arrFrom[i]["hash"]});              
            }
        }
        let temp2 = localStorage.getItem("avlTree")
        avlTree2.root = JSON.parse(temp2).root;
        optionsForSelect1 += `<option value="">`+avlTree2.inOrderPlegable2()+`</option>`;
        $('#transmitter').append(optionsForSelect1);

    }
    
});

function showGraphBlock(){
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = `digraph G {\n rankdir="TB";\n ${blockChain.blockGraph()}}`

    $('#reportt').html(`<h3 id="S7" class="text-center">
                            Reporte gráfico de bloques      
                        </h3>
                        <img class="bg-contenedor" id="graph12" style="margin: 0 auto;">
                        `)
                        console.log(body);
    
    $("#graph12").attr("src", url + body);
    alert('Gráfica creada con éxito!')
}

// ACTUALIZAR AMBOS CHATS 
function updateChats(){
    let transmitter = $('#transmitter').val();
    let receiver = index2;
    $('#transmitter-chat').html(blockChain.getMessages(transmitter, receiver));
}


async function sendMessage(whoSend){
    // OBTENER VALORES DEL SELECT 
    let transmitter = $('#transmitter').val();
    let receiver = index2;
    let directorio =null ;
    // VERIFICAR QUE HAYA SELECCIONADO UN USUARIO
    if(transmitter && receiver){
        switch(whoSend){
            case 'transmitter':
                // OBTENER MENSAJE A ENVIAR
                let msgt = $('#msg-transmitter').val();
                // INSERTAR MENSAJE EN BLOCKCHAIN
                await blockChain.insert(transmitter, receiver, msgt);
                directorio =blockChain.getValores();
                listaSoporte.push({ "timestamp":directorio["timestamp"],
                                    "transmitter":transmitter, 
                                    "receiver":receiver, 
                                    "Msg":msgt,
                                    "previusHash":directorio["previusHash"],
                                    "hash":directorio["hash"]});
                localStorage.setItem("listaSoporte", JSON.stringify(listaSoporte));
                $('#msg-transmitter').val("");
            break;
            case 'receiver':
                // OBTENER MENSAJE A ENVIAR
                let msgr = $('#msg-receiver').val();
                // INSERTAR MENSAJE EN BLOCKCHAIN
                await blockChain.insert(receiver, transmitter, msgr);
                directorio =blockChain.getValores();
                //index , timestamp, transmitter, receiver, message, previusHash, hash
                listaSoporte.push({ "timestamp":directorio["timestamp"],
                                    "transmitter":transmitter, 
                                    "receiver":receiver, 
                                    "Msg":msgt,
                                    "previusHash":directorio["previusHash"],
                                    "hash":directorio["hash"]});
                localStorage.setItem("listaSoporte", JSON.stringify(listaSoporte));
                $('#msg-receiver').val("");
            break;
        }
        alert("Mensaje enviado");
        // ACTUALIZAR CHATS
        updateChats();
    }else{
        alert("No ha seleccionado Receptop o Emisor");
    }
}


function getBlock(index){
    if(index === 0){
        let html = blockChain.blockReport(index);
        if(html){
            $('#show-block').html(html);
        }
    }else{
        let currentBlock = Number($('#block-table').attr('name'));
        
        if(index < 0){ // MOSTRAR EL ANTERIOR
            if(currentBlock - 1 < 0){
                alert("No existen elementos anteriores");
            }else{
                let html = blockChain.blockReport(currentBlock - 1);
                if(html){
                    $('#show-block').html(html);
                }
            }

        }else if(index > 0){ // MOSTRAR EL SIGUIENTE
            if(currentBlock + 1 > blockChain.size ){
                alert("No existen elementos siguientes");
            }else{
                let html = blockChain.blockReport(currentBlock + 1);
                if(html){
                    $('#show-block').html(html);
                }
            }
        }
    }
}
