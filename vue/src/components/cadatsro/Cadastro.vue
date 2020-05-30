<template>
  <div class="corpo">
    <fieldset>
        <input type="text" v-model="usuario" placeholder="Digite um nome de Usuario"><br>
        <input type="text" v-model="nome" placeholder="Digite seu nome"><br>
        <input type="text" v-model="email" placeholder="Digite seu Email"><br>
        <input type="password" v-model="senha" placeholder="Digite uma senha"><br>
        <input type="password" v-model="senhaConfirmada" placeholder="Confirme sua senha"><br>
        <button v-on:click="Cadastrar()">Cadastrar</button>
    </fieldset>
  </div>
</template>

<script>
export default {
    data(){
        return{
            usuario: null,
            nome: null,
            email: null,
            senha: null,
            senhaConfirmada: null, 
            mensagemUsuario: null,
            mensagemSenha: null,
            dadoRetornado: null
        }
    },
    methods: {
        Cadastrar(){
            this.$http
            .get("https://localhost:5001/api/jogador/getJogadoresByUsuario/" + this.usuario)
            .then(res => res.json())
            .then(dadosRetornados => {this.dadoRetornado = dadosRetornados},
            err => console.log(err));

            alert(this.dadoRetornado);

             var linkASP = "https://localhost:5001/api/jogador"
             var jogadorJson = JSON.parse('{"usuario": "' + this.usuario + '", "nome": "' + this.nome
                                        + '", "email": "' + this.email + '", "senha": "' + this.senha
                                        + '", "estaConect": "N"}');

             this.$http
            .post(linkASP, jogadorJson)
            .then(alert("Jogador cadastrado!"));
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

</style>