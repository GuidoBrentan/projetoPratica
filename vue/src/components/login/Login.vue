<template>
  <div>
      <form>
          <label id="usuarioLabel">Usuario</label>
          <input type="text" id="usuarioJogador" v-model="usuario"><br>
          <label>Senha</label>
          <input type="password" id="senha" v-model="senha"><br>
          <button value="Entrar" v-on:click = "Conferir()">Entrar</button><br>
          <a href="http://localhost:8080/#/cadastro">Cadastre-se</a>
      </form>
      <p>{{usuario}}</p>
  </div>
</template>

<script>
import VueRouter from 'vue-router';
import router from "../Routes";
import {routes} from "../Routes.js";

export default {
    data(){
        return {
            jogadores: null,
            usuario: null,
            senha: null
        }
    },
    methods: {
        Conferir(){
            this.$http
            .get("https://localhost:5001/api/jogador/getJogadoresByUsuario/" + this.usuario)
            .then(res => res.json())
            .then(
                dadosRetornados => {if(dadosRetornados.senha == this.senha)
                                    this.$router.push('/telaPrincipal');
                                    else
                                    alert("Senha ou usuarios incorretos!")},
                err => console.log(err)
            )
        }
    }
}
</script>

<style>

</style>