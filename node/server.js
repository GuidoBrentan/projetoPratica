const express = require('express')();
const http = require('http').Server(express);
const Socketio = require('socket.io')(http);
var Objeto = [];

//esse comando é ativado quando conecta com um novo cliente
Socketio.on("connection", socket => {
     socket.on('pedidoDados', data =>{
          socket.emit('getDados', Objeto);
          socket.join('atualizar');
     });

     socket.on('Dados', data => {
          Objeto.push(data);
          
          if(data.contador <= data.numeroMaxJogadores)
               socket.join(data.nomeDaSala);
          else
               data.contador++;
               
          Socketio.in('atualizar').emit('getDados', Objeto);
     });
});

http.listen(3000, () => {console.log("Rodando na porta 3000");});

