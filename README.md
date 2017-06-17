# Instalação Broker MQTT Mosca
## 1)	Instalar node.js
Fazer o download do node.js no link https://nodejs.org/en/download/ e fazer a instalação. Durante a instalação não é preciso fazer nenhuma configuração adicional, basta aceitar os termos de licença e ir clicando em next.
Para testar se a instalação foi bem-sucedida, basta digitar no prompt de comando **node –v** e a versão do node.js deve aparecer, como mostra a imagem abaixo.

![node](https://user-images.githubusercontent.com/8160775/27249403-259e358a-52eb-11e7-8887-a51030552c1a.png)

## 2)	Instalar Broker Mosca
Não é necessário fazer o download de nada, basta abrir o prompt de comando e digitar **npm install mosca bunyan –g**.

![install](https://user-images.githubusercontent.com/8160775/27249401-259ab50e-52eb-11e7-9763-e32bd1dc5869.png)

Para testar se a instalação foi bem-sucedida, assim como no node.js, basta digitar no prompt de comando **mosca –v** e o nome mosca e algumas informações devem aparecer, como mostra a imagem abaixo.

![confirm](https://user-images.githubusercontent.com/8160775/27249402-259ae97a-52eb-11e7-80bd-3153ba66e5a6.png)

# Configuração broker e clientes
Vamos ver agora como configurar o broker MQTT e os clientes - o nodeMCU e uma webpage simples – para apenas se conectarem com o broker.

## 1)	Configurar o boker
**1°) Importar o mosca;**
```
var mosca = require('mosca')
```
O mosca é um módulo node.js e assim como todos os outros pode ser importado e usado em qualquer aplicação Node.js.

**2°) Definir configurações do broker;**
```
var settings = {
	port: 1883, 		 //porta de operação do MQTT
	host: '192.168.15.8', //endereço do servidor
 	http: { 			// Servidor de WebSockets
    		port: 80,
    		bundle: true,
    		static: './'
  	}
};
```

Criamos um objeto com as configurações básicas do broker, que são: porta de operação do protocolo MQTT, que por padrão é a 1883; o host ou endereço do servidor, neste caso o ip na rede conectada, já que é um servidor local; e por fim o servidor de websockets http para que possamos usar o cliente JS Paho e para podermos fazer monitoramento em tempo real.

**3°) Criar/instanciar o broker**

```
server = new mosca.Server(settings);
```

Cria um novo broker MQTT passando como parametro o objeto contendo as configurações.

**4°) Função de inicialização do broker**

```
server.on('ready', setup);
function setup(){
	console.log("Server is up and running");
}
```

Quando o broker é iniciado é chamada a função **setup()** é chamada e é exibido no console a mensagem “Server is up and running”.
A função **on()** fica “ouvindo” a conexão, tanto do lado do servidor, quando do cliente, e recebendo mensagens.

**5°) Funções básicas**

```
Conexão de clientes:
server.on('clientConnected', function(client){ 
	console.log("Cliente Conectado! id = ", client.id);
});
```

Sempre que um cliente se conecta ao servidor o evento **clientConnected** é disparado e a função anônima é chamada passando o id do cliente como parâmetro.

Publicação de mensagens:
```
server.on('published', function(packet, client){
     console.log("Tópico: ", packet.topic, " | ", packet.payload,    " | ", new Date().toISOString());
});
```

Quando uma nova mensagem é publicada no broker o evento **publishing** é disparado passando o pacote contendo os dados da mensagem e o cliente que publicou como parametro da função.
É exibido  no console o tópico no qual a mensagem foi publicada, o buffer da mensagem e a data e hora da publicação.



