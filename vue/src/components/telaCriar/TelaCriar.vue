<template>
  <div>
      <input type="text" v-model="nomeDaSala">
      <input type="number" v-model="numeroDeRodadas">
      <input type="number" v-model="numeroMaxJogadores">
      <td><tr>Adicione as colunas para o jogo</tr></td>
      <article> 
        <span v-for="item of items" v-bind:key="item[0]"><span v-html="item[0]"></span></span>
        <button v-on:click="Add()">+</button>
      </article>
      <button v-on:click="Criar()">Criar</button>
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
            if(this.contador < 10){
                this.contador++;
                this.item=['<input type="text" class="inputPalavra" id="a' + this.contador + '"><br>'];
                this.items.push(this.item);
            }else
                alert("Número maxímo de colunas já obtido!");
        },

        Criar(){
            for(var i = 1; i <= this.contador; i++)
                this.palavras[i-1] = document.getElementById("a" + i).value;
            
            this.socket = socket_cliente('http://localhost:3000');
            var objeto= {nomeDaSala: this.nomeDaSala, numeroDeRodadas: this.numeroDeRodadas,
                         numeroMaxJogadores: this.numeroMaxJogadores, palavras: this.palavras};
            
            this.socket.emit('Dados',objeto);
        }
    }
}
</script>

<style>

</style>