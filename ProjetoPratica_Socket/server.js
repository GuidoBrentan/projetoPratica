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

     socket.on('finalizarRodada', nomeDaSala => {
          Socketio.in(nomeDaSala).emit('acabarRodada');
     });

     socket.on('passarDados', dados =>{
          for(var i = 0; i < Objeto.length; i++)
               if(Objeto[i].nomeDaSala == dados.nomeDaSala){
                    Objeto[i].objetoDeDados.push(dados);
                    Objeto[i].contadorDeDados++;
                    Objeto[i].qtdRodadas++;
                    Objeto[i].divVisivel = 2;
                    if(Objeto[i].contador == Objeto[i].contadorDeDados){
                         Socketio.in(dados.nomeDaSala).emit('recebaDados', Objeto[i].objetoDeDados);
                         Socketio.in(dados.nomeDaSala).emit('dadosDaSala', Objeto[i]);
                         Objeto[i].objetoDeDados = [];
                         Objeto[i].contadorDeDados = 0;
                    }
               }
     });

     socket.on('iniciarRodada', nomeDaSala => {
          var letras = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
          var indice;
          do
               indice = Math.random()*100;
          while(indice < 1 || indice > 25)
          
          var letra = letras[parseInt(indice)];

          for(var i = 0; i < Objeto.length; i++){
               if(Objeto[i].nomeDaSala = nomeDaSala){
                    if(Objeto[i].qtdRodadas > Objeto[i].numeroMaxDeRodadas){
                         TerminarJogo(Objeto[i]);
                         return;
                    }
                    Objeto[i].divVisivel = 1;
                    Objeto[i].letra = letra;
                    Socketio.in(Objeto[i].nomeDaSala).emit('dadosDaSala', Objeto[i]);
               }
          }
     });

     function TerminarJogo(objeto){
          objeto.divVisivel = 3;
          Socketio.in(objeto.nomeDaSala).emit('dadosDaSala', objeto);
     }

     socket.on('validacao', objValida =>{
          for(var i = 0; i < objValida.dados.length; i++){
               if(objValida.dados[i].valida)
                    objValida.dados[i].contadorValida++;
               else
                    objValida.dados[i].contadorValida--;

          if(objValida.dados[i].contadorValida > 0)
               objValida.jogador.pontos =  objValida.jogador.pontos + 10;

               console.log(objValida.jogador.pontos);
          }

          for(var i = 0; i < Objeto.length; i++){
               console.log("entrou no primeiro for");
               for(var a = 0; a < Objeto[i].jogadores.length; a++){
                    console.log("entrou no segundo for");
                    if(Objeto[i].jogadores[a].usuario == objValida.jogador.usuario){
                         console.log("entrou no if");
                         Objeto[i].jogadores[a].pontos = objValida.jogador.pontos;
                         Socketio.in(Objeto[i].nomeDaSala).emit('dadosDaSala', Objeto[i]);
                    }
               }
          }
     });

     socket.on('entrar', objSocket => {
     for(var i = 0; i < Objeto.length; i++)
          if(Objeto[i].nomeDaSala.trim() == objSocket.nomeDaSala.trim()){
               if(Objeto[i].contador < Objeto[i].numeroMaxJogadores){
                         socket.join(Objeto[i].nomeDaSala);
                         Objeto[i].contador++;
                         var objetoJogador = {usuario: objSocket.usuario, pontos: 0}
                         Objeto[i].jogadores.push(objetoJogador);
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

