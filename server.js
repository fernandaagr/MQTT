var mosca = require('mosca'); //import mosca
 
//server configuration
var settings = {
	port: 1883, 			//MQTT port, port where the server is created
	host: '192.168.0.29', 	//server address
 	http: { 				//WebSockets server
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
var server = new mosca.Server(settings); 		//create a mqtt broker based on settings
//fired when the mqtt server is ready
server.on('ready', setup);
function setup(){
	console.log("Server is up and running");
}
//.on () function allows you to programmatically listen to incoming client-side messages
//fired when a client is connected
server.on('clientConnected', function(client){  //when a client is connected; the client is passed as a parameter.
	console.log("Cliente Conectado! id = ", client.id);
});

//fired when a message is received
server.on('published', function(packet, client){ // when a new message is published, the packet and the client are passed as parameters.
	console.log("Tópico: ", packet.topic, " | ", packet.payload, " | ", new Date().toISOString());//Displays the message topic received and the message buffer
});