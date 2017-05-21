client.onMessageArrived = function (message) {
	console.log('Message Recieved: Topic: ', message.destinationName, ' | Payload: ', message.payloadString);

	var messageTime = new Date().toISOString();
	console.log('opa');
	var table = document.getElementById("tb_historic").getElementsByTagName('tbody')[0];

	var row = table.insertRow(0);
	row.insertCell(0).innerHTML = message.destinationName;
	row.insertCell(1).innerHTML = message.payloadString;
	row.insertCell(2).innerHTML = messageTime;

};