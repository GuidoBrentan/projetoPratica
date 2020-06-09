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

     socket.on('entrar', objSocket => {
          for(var i = 0; i < Objeto.length; i++)
               if(Objeto[i].nomeDaSala == objSocket.nomeDaSala){
                    if(Objeto[i].contador < Objeto[i].numeroMaxJogadores){
                         socket.join(Objeto[i].nomeDaSala);
                         Objeto[i].contador++;
                         Objeto[i].jogadores.push(objSocket.usuario);
                         socket.emit('dadosDaSala', Objeto[i]);
                    }else{
                         socket.emit('dadosDaSala', 'erro');
                    }
                    Socketio.in(Objeto[i].nomeDaSala).emit('dadosDaSala', Objeto[i]);
               }
     });

     socket.on('Dados', data => {
          var valida = true;

          if(Objeto.length == 0)
               valida = true;
          else
               for(var i = 0;(i < Objeto.length) && valida; i++)
                    if(Objeto[i].nomeDaSala == data.nomeDaSala)
                         valida = false;
                    else
                         valida = true;

          if(valida){
               Objeto.push(data);
               socket.emit('resultado', 'certo');
          }else
               socket.emit('resultado', 'erro');

          Socketio.in('atualizar').emit('getDados', Objeto);
     });
});

http.listen(3000, () => {console.log("Rodando na porta 3000");});

