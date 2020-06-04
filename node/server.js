const express = require('express')();
const http = require('http').Server(express);
const Socketio = require('socket.io')(http);
var Objeto = [];
var contador = 0;

//esse comando é ativado quando conecta com um novo cliente
Socketio.on("connection", socket => {
     socket.on('Dados', data => {
          Objeto.push(data);
          socket.join(data.nomeDaSala);
          
     });
});

http.listen(3000, () => {console.log("Rodando na porta 3000");});

