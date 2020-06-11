<template>
  <div id="corpo">
      <fieldset id="jogo">
        <a href="http://localhost:8080/?#/telaPrincipal"><img id="imgVoltar" src="https://image.flaticon.com/icons/png/512/60/60577.png" width="30px" height="30px"></a><h1>Crie sua Sala</h1>
        <input type="text" v-model="nomeDaSala" placeholder="Digite o nome da sala" id="nomeDaSala"><br>
        <label>Digite o número de rodadas: </label><input type="number" class="number" v-model="numeroDeRodadas" placeholder="1 a 10"><br>
        <label>Digite o número Máximo de Jogadores: </label><input type="number" class="number" v-model="numeroMaxJogadores" placeholder="1 a 8">
        <p id="txtAdicionar"> Adicione as colunas para o jogo</p>
        <input type="text" class="palavra0" id="a0" placeholder="Digite o tema 1">
        <span v-for="item of items" v-bind:key="item[0]">
            <span v-html="item[0]"></span>
        </span><br>
        <p id="mensagemErro">{{mensagemErro}}</p><br>
        <button v-on:click="Add()" id="botaoAdd">+</button>
        <button v-on:click="Remove()">-</button>
        <button v-on:click="Criar()">Criar</button>
      </fieldset>
  </div>
</template>

<script>
import socket_cliente from 'socket.io-client';

export default {
    data(){
        return{
            nomeDaSala: null,
            numeroDeRodadas: null,
            numeroMaxJogadores: null,
            contador: 0,
            items:[],
            item:['NEW VALUE'],
            palavras: [],
            socket: null,
            mensagemErro: null,
            jogadores: []
        }
    },

    methods: {
        Add(){
            if(this.contador < 9){
                this.contador++;
                this.mensagemErro = null;
                
                if(this.contador == 1){
                    this.item=['<input type="text" class="palavra1" id="a' + this.contador + '" placeholder="Digite o tema ' + (this.contador + 1) + '"><br>'];
                    this.items.push(this.item);
                }else{
                    if((this.contador%2) != 0)
                        this.item=['<input type="text" class="palavra" id="a' + this.contador + '" placeholder="Digite o tema ' + (this.contador + 1) +'"><br>'];
                    else
                        this.item=['<input type="text" class="palavra" id="a' + this.contador + '" placeholder="Digite o tema ' + (this.contador + 1) + '">'];
                this.items.push(this.item);
                }
            }else
                this.mensagemErro = "Número maxímo de colunas já obtido!";
        },

        Remove(){
            if(this.contador >= 1){
                this.mensagemErro = null;
                this.items.pop();
                this.contador--;
            }else
                this.mensagemErro = "Número mínimo de colunas já obtido!";
        },

        Criar(){
            this.palavras = [];

            for(var i = 0; i <= this.contador; i++)
                this.palavras[i] = document.getElementById("a" + i).value;

            this.socket = socket_cliente('http://localhost:3000');
            var objeto= {nomeDaSala: this.nomeDaSala, numeroMaxDeRodadas: this.numeroDeRodadas,
                         numeroMaxJogadores: this.numeroMaxJogadores, palavras: this.palavras, contador: 0,
                         jogadores: this.jogadores, divVisivel: 2, qtdRodadas: 1, letra: null, contadorDeDados: 0,
                         objetoDeDados: []};
            
            this.socket.emit('Dados', objeto);
            this.socket.on('resultado', data =>{
                if(data == 'erro')
                    alert("Este nome de sala já está em uso!");

                if(data == 'certo'){
                    alert("Sala criada com sucesso!");
                    this.$session.set('sala', this.nomeDaSala);
                    this.$router.push('/telaJogar');
                }
            })
        }
    }
}
</script>
<style>
.palavra{
    margin-right: 40px;
    margin-left: 40px;
    height: 20px;
    padding: 7px;
    border-radius: 5px;
    border-style: none;
    font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}

.palavra1{
    margin-right: 0px;
    height: 20px;
    padding: 7px;
    border-radius: 5px;
    border-style: none;
    font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}

input{
    height: 20px;
    padding: 7px;
    margin-bottom: 7px;
    border-radius: 5px;
    border-style: none;
    font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}
</style>
<style scoped>
#corpo{
    width: 100vw;
    height: 100vh;
    background: rgba(148, 255, 127, 0.534);
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-image: url("0001.jpg");
    margin-left: -12px;
}

#jogo{
  text-align: center;
  width: 600px;
  height: 500px;
  background-color: rgba(191, 255, 62, 0.459);
  margin-right: 20px;
  border: none;
  font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}

.number{
    width: 60px;
}

button{
    margin-bottom: 40px;
    margin-top: 10px;
    padding: 2px;
    height: 40px;
    width: 80px;
    border-radius: 5px;
    border-style: none;
    background-color: rgb(255, 0, 0);
    color: aliceblue;
    font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    font-size: 18px;
}

.palavra0{
    margin-right: 75px;
    height: 20px;
    padding: 7px;
    border-radius: 5px;
    border-style: none;
    font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}

#txtAdicionar{
    margin-top: 0px;
}

#nomeDaSala{
    margin-top: 0px;
    margin-bottom: 15px;
}

#mensagemErro{
    position: relative;
    font-size: 12px;
    color: red;
    margin-top: -5px;
    margin-bottom: -20px;
}

#imgVoltar{
    position: absolute;
    margin-left: -300px;
}
h1{
    margin-top: -3px;
}
</style>