var mosca = require('mosca') //importa o mosca
 
//configurações do broker
var settings = {
	port: 1883, //porta de operação do MQTT
	host: '192.168.15.6', //endereço do servidor
 	http: { // Servidor de WebSockets
    	port: 80,
    	bundle: true,
    	static: './'
  	}
};
/*
var server = new mosca.Server(settings, function() {
  console.log('Mosca server is up and running');
});
*/
var server = new mosca.Server(settings); //cria um broker MQTT com base nas configurações

//evento ocore quando um cliente se conecta ao broker
//a função .on() permite ouvir programaticamente mensagens recebidas do lado do cliente
server.on('clientConnected', function(cliente){
	console.log("Cliente Conectado! id = ", cliente.id);
});

//evento ocorre quando uma mensagem é publicada
server.on('published', function(packet, cliente){
	console.log("Tópico: ", packet.topic, " | ", new Date().toISOString());// Exibe uma mensagem com o tópico da mensagem recebida
});
server.on('ready', setup);//inicia o broker
function setup(){
	console.log("Server is up and running");
}

