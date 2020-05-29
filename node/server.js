const express = require('express')();
const http = require('http').Server(express);
const Socketio = require('socket.io')(http);

//esse comando é ativado quando conecta com um novo cliente
Socktio.on("conection", socket => {
     console.log(socket.id);
     socket.emit("teste", "msg teste");
});

http.listen(3000, () => {console.log("Rodando na porta 3000");});

