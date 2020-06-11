<template>
    <div id="div">
        <div id="jogando" v-show=visivelJogando class="jogando">
            <fieldset>
                <div id="jogadoresNaSala">
                    <h1>Jogadores</h1>
                    <div v-for="jogador of dadosDaSala.jogadores" v-bind:key="jogador" id="caixaJogador">
                        <img id="imgUser" src="https://upload.wikimedia.org/wikipedia/commons/f/f4/User_Avatar_2.png" width="30px" height="30px"><p>{{jogador}}</p>
                    </div>
                </div>
                <div id="colunas">
                    <h1>Preencha</h1>
                    <div v-for="input of this.items" v-bind:key="input" id='inputJogador'>
                        <span v-html="input"></span>
                    </div>
                </div>
                <div id="dadosDoJogo">
                    <p class="pDados">Letra<br> 
                    {{dadosDaSala.letra}}</p>

                    <p class="pDados" id="pRodadas">Rodadas<br>
                    {{dadosDaSala.qtdRodadas}}/{{dadosDaSala.numeroMaxDeRodadas}}</p>

                    <button id="stop" v-on:click="Stop()">Stop</button>
                </div>
            </fieldset>
        </div>

        <div id="avaliando" v-show=visivelAvaliando class="jogando">
            <fieldset>
                <div v-if="dadosDaSala.qtdRodadas > 1">
                    <div v-for="dado of palavrasASeremExibidas" v-bind:key="dado.palavra">
                        <p>{{dado.palavra}}</p>
                        <button v-on:click="Qualifica(dado.palavra)"><img src="https://images.vexels.com/media/users/3/157871/isolated/lists/2f8afedb03309f34bb746cf38cb283ba-icone-de-marca-de-verificacao-basica.png" width="30px" height="30px"></button>
                        <button v-on:click="Qualifica(dado.palavra)"><img src="https://cdn.pixabay.com/photo/2012/04/12/13/15/red-29985_960_720.png" width="30px" height="30px"></button>
                    </div>
                </div>
                <button v-on:click="IniciarRodada()" id="iniciarRodada">Estou pronto!</button>
            </fieldset>
        </div>

        <div id="finalizando" v-show=visivelFinalizando class="jogando">
            <fieldset>
            </fieldset>
        </div>
    </div>
</template>

<script>
import socket_cliente from 'socket.io-client';

export default {
    data(){
        return {
            socket: null,
            nomeDaSala: null,
            dadosDaSala: null,
            visivelJogando: false,
            visivelAvaliando: false,
            visivelFinalizando: false,
            items: [],
            letra: null,
            objetoDeDados: [],
            palavrasASeremExibidas: []
        }
    },

    mounted(){
        this.socket = socket_cliente('http://localhost:3000');
        this.nomeDaSala = this.$session.get('sala');
        var usuario;

        if(this.$session.exists()){
            var jogador = this.$session.get('jogador');
            usuario = jogador.usuario;
        }else
            usuario = 'UserAnonimo';

        var objSocket = {nomeDaSala: this.nomeDaSala, usuario: usuario};
        this.socket.emit('entrar', objSocket);
        this.socket.on('dadosDaSala', dados => {
            if(dados == 'erro'){
                alert("Sala lotada!");
                this.$router.push('/telaEntrar');
            }else
                this.dadosDaSala = dados;

            if(this.items.length == 0)
                for(var i = 0; i < this.dadosDaSala.palavras.length; i++){
                    var input = "<input type='text' id='"+ this.dadosDaSala.palavras[i] + "' placeholder='" + this.dadosDaSala.palavras[i] + "'>";
                    this.items.push(input);
                }

            switch(this.dadosDaSala.divVisivel){
                case 1: {
                    this.visivelJogando = true;
                    this.visivelAvaliando = false;
                    this.visivelFinalizando = false;
                    for(var i = 0; i < this.dadosDaSala.palavras.length; i++)
                        document.getElementById(this.dadosDaSala.palavras[i]).value = null;
                }break;

                case 2:{
                    this.visivelJogando = false;
                    this.visivelAvaliando = true;
                    this.visivelFinalizando = false;
                }break;

                case 3:{
                    this.visivelJogando = false;
                    this.visivelAvaliando = false;
                    this.visivelFinalizando = true;
                }break;
            }
        });

        this.socket.on('acabarRodada', data => {
            var palavrasPreenchidas = [];

            for(var i = 0; i < this.dadosDaSala.palavras.length; i++){
                var objPalavra = {palavra: document.getElementById(this.dadosDaSala.palavras[i]).value, 
                                  valida: false}

                palavrasPreenchidas.push(objPalavra); 
            }


            var dados = {nomeDaSala: this.nomeDaSala, jogador: usuario, palavrasPreenchidas: palavrasPreenchidas};

            this.socket.emit('passarDados', dados);
        });

        this.socket.on('recebaDados', objetoDeDados =>{
            this.objetoDeDados = objetoDeDados;
            for(var i = 0; i < this.objetoDeDados.length; i++){
                this.palavrasASeremExibidas = this.objetoDeDados[i].palavrasPreenchidas;
                console.log(this.palavrasASeremExibidas);
            }
        });
    },

    methods: {
        IniciarRodada(){
            this.socket.emit('iniciarRodada', this.dadosDaSala.nomeDaSala);
        },

        Stop(){
            this.socket.emit('finalizarRodada', this.dadosDaSala.nomeDaSala);
        },

        Qualifica(palavra){
            for(var i = 0; i < this.objetoDeDados.length; i++){}
        },

        Desqualifica(palavra){
            for(var i = 0; i < this.objetoDeDados.length; i++){}        
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
#div{
    width: 1355px;
    height: 641px;
}

fieldset{
    position: absolute;
    width: 600px;
    height: 500px;
    background-color: rgba(191, 255, 62, 0.459);
    border: none;
    font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    margin-left: 350px;
    margin-top: 60px;
}

.jogando{
    position: absolute;
    background-image: url("0001.jpg");
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 1355px;
    height: 641px;
}

#jogadoresNaSala{
    width: 100px;
}

#usuario{
    align-items: center;
    width: 100px;
}

img{
    float: left;
}
p{
    float: right;
    margin-top: 6px;
    margin-right: -10px;
}

#caixaJogador{
    width: 100px;
    height: 50px;
}

#jogadoresNaSala{
    height:500px;
    width: 170px;
    overflow: auto;
    border: 2px;
    border-style: solid;
    text-align: center;
    margin-left: -9px;
    margin-top: -3px;
    padding: 5px;
}

#colunas{
    float: right;
    margin-top: -500px;
    margin-right: 205px;
    text-align: center;
}

#dadosDoJogo{
    height:500px;
    width: 170px;
    overflow: auto;
    border: 2px;
    border-style: solid;
    text-align: center;
    position: absolute;
    margin-left: 430px;
    margin-top: -514px;
    padding: 5px;
}

.pDados{
    margin-right: 44px;
    font-size: 40px;
}

#pRodadas{
    margin-right: 12px;
}

#stop{
    border-radius: 100%;
    width: 100px;
    height: 100px;
    border: none;
    background-color: red;
    color: white;
    font-size: 40px;
    font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    margin-top: 80px;
}
</style>