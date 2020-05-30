<template>
<div class="corpo">
    <fieldset>
        <input type="text" v-model="usuario" placeholder="username"><br>
        <input type="password" v-model="senha" placeholder="senha"><br>
        <button type="button" v-on:click="Conferir()">Entrar</button><br>
        Não tem uma conta? <a href="http://localhost:8080/?#/cadastro">Cadastre-se</a>
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
            senha: null
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
                                    alert("Senha ou usuarios incorretos!")},
                err => alert("Senha ou usuarios incorretos!")
            )
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
}
fieldset{
    text-align: center;
    padding: 40px;
    padding-top: 100px;
    height: 220px;
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
</style>