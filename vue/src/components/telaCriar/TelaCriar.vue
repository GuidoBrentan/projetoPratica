<template>
  <div id="corpo">
      <fieldset id="jogo">
          <h1>Crie sua Sala</h1>
        <input type="text" v-model="nomeDaSala" placeholder="Digite o nome da sala" id="nomeDaSala"><br>
        <label>Digite o número de rodadas: </label><input type="number" class="number" v-model="numeroDeRodadas" placeholder="1 a 10"><br>
        <label>Digite o número Máximo de Jogadores: </label><input type="number" class="number" v-model="numeroMaxJogadores" placeholder="1 a 8">
        <p>Adicione as colunas para o jogo</p>
        <input type="text" class="palavra0" id="a0" placeholder="Digite o tema 1">
        <span v-for="item of items" v-bind:key="item[0]">
            <span v-html="item[0]"></span>
        </span><br>
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
            socket: null
        }
    },

    methods: {
        Add(){
            if(this.contador < 9){
                this.contador++;
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
                alert("Número maxímo de colunas já obtido!");
        },

        Remove(){
            if(this.contador >= 1){
                this.items.pop();
                this.contador--;
            }else
                alert("Mínimo de colunas já alcançado");
        },

        Criar(){
            this.palavras = [];

            for(var i = 0; i <= this.contador; i++)
                this.palavras[i] = document.getElementById("a" + i).value;
                alert(this.palavras);
            this.socket = socket_cliente('http://localhost:3000');
            var objeto= {nomeDaSala: this.nomeDaSala, numeroDeRodadas: this.numeroDeRodadas,
                         numeroMaxJogadores: this.numeroMaxJogadores, palavras: this.palavras};
            
            this.socket.emit('Dados',objeto);
        }
    }
}
</script>

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

input{
    height: 20px;
    padding: 7px;
    margin-bottom: 7px;
    border-radius: 5px;
    border-style: none;
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

.palavra0{
    margin-right: 75px;
    height: 20px;
    padding: 7px;
    border-radius: 5px;
    border-style: none;
    font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}

p{
    margin-top: 0px;
}

#nomeDaSala{
    margin-top: 0px;
    margin-bottom: 15px;
}
h1{
    margin-top: -3px;
}
</style>