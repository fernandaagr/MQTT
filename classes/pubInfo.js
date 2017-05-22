client.onMessageArrived = function (message) {
	console.log('Message Recieved: Topic: ', message.destinationName, ' | Payload: ', message.payloadString);

	var messageTime = new Date().toISOString();
	//insere na tabela de ultima mensagem
	if (!document.getElementById(message.destinationName)) {
		var tbLastMessage = document.getElementById("tb_last").getElementsByTagName('tbody')[0];
		var lastRow = tbLastMessage.insertRow(0);
		lastRow.id = message.destinationName;
		lastRow.insertCell(0).innerHTML = message.destinationName;
		lastRow.insertCell(1).innerHTML = message.payloadString;
		lastRow.insertCell(2).innerHTML = messageTime;
	}else{
		//atualiza ultima mensagem recebida
		var lastMessage = document.getElementById(message.destinationName);
		lastMessage.id = message.destinationName;
		lastMessage.cells[0].innerHTML = message.destinationName;
		lastMessage.cells[1].innerHTML = message.payloadString;
		lastMessage.cells[2].innerHTML = messageTime;
	}
};
//função para limpar o campo da mensagem quando for publicada
function cleanForm(){
	document.getElementById('msg').value=''; 
}