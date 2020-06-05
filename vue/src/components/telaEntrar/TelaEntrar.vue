<template>
  <div class="corpo">
      <fieldset>
          <div id="sala">
            <input type="search" class="filtro" placeholder="Pesquise aqui..." v-model="filtro">
            <div v-for="data of FiltraSalas"  id="caixaSala">
                <div>
                    {{data.nomeDaSala}}
                </div>
                <div id="primeiraDiv">
                    <span title="Número de Jogadores"><img src="https://simpleicon.com/wp-content/uploads/user1.png" width="20px" height="20px"></span><br>
                    {{data.contador}}/{{data.numeroMaxJogadores}}
                </div>
                <div class="divInterna" id="segundaDiv">
                    <span title="Número de Rodadas"><img src="https://image.flaticon.com/icons/svg/1248/1248846.svg" width="20px" height="20px"></span><br>
                    {{data.numeroDeRodadas}}
                </div>
                <div class="divInterna" id="terceiraDiv">
                    <span title="Número de Temas"><img src="https://images.vexels.com/media/users/3/151870/isolated/preview/8b1a89d3f271913146d4cd63f3920464---cone-de-tra--o-de-lista-de-verifica----o-m--dica-by-vexels.png" height="20px" width="20px"></span><br>
                    {{data.palavras.length}}
                </div>
            </div>
          </div>
      </fieldset>
  </div>
</template>

<script>
import socket_cliente from 'socket.io-client';

export default {
    data(){
        return{
            socket: null,
            salas: [],
            filtro: ""
        }
    },
    mounted(){
        this.socket = socket_cliente('http://localhost:3000');
        this.socket.emit('pedidoDados', null);
        this.socket.on('getDados', data => {
            this.salas = data;
        });
    },
    
    computed:{
    FiltraSalas() {
        if (this.filtro) {
            let exp = new RegExp("^" + this.filtro.trim(), "i");
            return this.salas.filter(data => exp.test(data.nomeDaSala));
        }else
            return this.salas;
        }   
    }
}   
</script>

<style>
.corpo{
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

fieldset{
  width: 600px;
  height: 500px;
  background-color: rgba(191, 255, 62, 0.459);
  margin-right: 20px;
  border: none;
  font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}

#caixaSala{
    width: 120px;
    border: 2px;
    border-style: solid;
    text-align: center;
    margin: 5px;
}

.divInterna{
   float: right;
   margin-top: -42px;
}

#primeiraDiv{
    margin-left: -80px;
}

#segundaDiv{
    margin-left: 22px;
    margin-right: 5px;
}

#sala{
    max-height: 490px;
    width: 180px;
    overflow: auto;
}

.filtro{
    height: 20px;
    width: 160px;
    padding: 7px;
    margin-bottom: 7px;
    border-radius: 5px;
    border-style: none;
    font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}
</style>