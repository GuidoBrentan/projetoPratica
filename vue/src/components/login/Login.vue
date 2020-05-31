<template>
<div class="corpo">
    <fieldset>
        <p>{{mensagemErro}}</p>
        <input type="text" v-model="usuario" placeholder="username" id="primeiroInput"><br>
        <input type="password" v-model="senha" placeholder="senha"><br>
        <button type="button" v-on:click="Conferir()">Entrar</button><br>
        Não tem uma conta? <a href="http://localhost:8080/?#/cadastro">Cadastre-se</a><br><br><br><br>
        Siga-nos nas Redes Socias<br>
        <div id="twitter">
        <a href="https://twitter.com/GuidoBrentan"><img src="https://logodownload.org/wp-content/uploads/2014/09/twitter-logo-6.png" alt="some text" width=60 height=45></a>
        </div>
        <div id="git">
        <a href="https://github.com/GuidoBrentan"><img src="https://pngimg.com/uploads/github/github_PNG40.png" alt="some text" width=60 height=60></a>
        </div>
    </fieldset>
</div>
</template>

<script>
import VueRouter from 'vue-router';
import router from "../Routes";
import {routes} from "../Routes.js";

export default {
    data(){
        return {
            usuario: null,
            senha: null,
            mensagemErro: null
        }
    },
    methods: {
        Conferir(){
            this.$http
            .get("https://localhost:5001/api/jogador/getJogadoresByUsuario/" + this.usuario)
            .then(res => res.json())
            .then(dadosRetornados => {if(dadosRetornados.senha == this.senha)
                                    this.$router.push('/telaPrincipal');
                                    else
                                    this.mensagemErro = "Usuario ou senha incorretos"},
                err => this.mensagemErro = "Usuario ou senha incorretos"
            )
        }
    }
}
</script>
<style scoped>
.corpo{
    width: 100vw;
    height: 100vh;
    background: rgba(148, 255, 127, 0.534);
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
fieldset{
    text-align: center;
    padding: 40px;
    padding-top: 100px;
    height: 440px;
    width: 220px;
    position: relative;
    border-radius: 10px;
    font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    font-size: 15px;
    background-color: rgb(191, 255, 62);
    border-style: hidden;
}

input{
    height: 20px;
    padding: 7px;
    margin-bottom: 7px;
    border-radius: 5px;
    border-style: none;
    font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}

#primeiroInput{
    margin-top: 100px;
}

button{
    margin-bottom: 40px;
    margin-top: 20px;
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

a:link{
text-decoration:none;
}

#twitter{
   position: absolute;
   margin-top: 10px; 
   margin-left: 35px;
}

#git{
    margin-left: 75px;
}

p{
    position: absolute;
    font-size: 12px;
    color: red;
    text-align: left;
    margin-left: 20px;
    margin-top: 84px;
}
</style>