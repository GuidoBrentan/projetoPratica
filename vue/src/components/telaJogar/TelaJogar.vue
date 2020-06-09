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
                    <h1>Preencha as colunas</h1>
                    <div v-for="input of this.items" v-bind:key="input" id='inputJogador'>
                        <span v-html="input"></span>
                    </div>
                </div>
            </fieldset>
        </div>

        <div id="avaliando" v-show=visivelAvaliando class="jogando">
            <fieldset>
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
            visivelJogando: true,
            visivelAvaliando: false,
            visivelFinalizando: false,
            items: []
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
                alert("Sala lotada!")
                this.$router.push('/telaEntrar');
            }else{
                this.dadosDaSala = dados;

                for(var i = 0; i < dados.palavras.length; i++){
                    var input = "<input type='text' id='"+ dados.palavras[i] + "' placeholder='" + dados.palavras[i] + "'>";
                    this.items.push(input);
                }
            }
        });
    }
}
</script>

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
    margin-right: 100px;
}
</style>