<template>
  <div class="corpo">
    <fieldset>
        <a href="http://localhost:8080/?#/telaInicial"><img id="logo" src="https://uploaddeimagens.com.br/images/002/685/942/full/logo.bmp?1591108004" width="120" height="120"></a><br>
        <p id="mensagemUsuario">{{mensagemUsuario}}</p>
        <input type="text" v-model="usuario" placeholder="Digite um nome de Usuario" id="primeiroInput"><br>
        <input type="text" v-model="nome" placeholder="Digite seu nome"><br>
        <input type="text" v-model="email" placeholder="Digite seu Email"><br>
        <p id="mensagemSenha">{{mensagemSenha}}</p>
        <input type="password" v-model="senha" placeholder="Digite uma senha" id="inputSenha"><br>
        <input type="password" v-model="senhaConfirmada" placeholder="Confirme sua senha"><br>
        <button v-on:click="Cadastrar()">Cadastrar</button><br>
        Já é cadastrado? <a href="http://localhost:8080/?#/login">Entre</a>
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
            mensagemSenha: null
        }
    },
    methods: {
        Cadastrar(){
            this.$http
            .get("https://localhost:5001/api/jogador/getJogadoresByUsuario/" + this.usuario)
            .then(res => res.json())
            .then(dadosRetornados => {this.mensagemUsuario = "Este usuário já está em uso"})
            .catch (faz =>{
                this.mensagemUsuario = null;
                if(this.senha == this.senhaConfirmada){
                    if(this.usuario == null || this.nome == null || this.email == null || this.senha == null)
                        alert("Preecha todos os campos!");
                    else{
                    this.mensagemSenha = null;
                    var linkASP = "https://localhost:5001/api/jogador"
                    var jogadorJson = JSON.parse('{"usuario": "' + this.usuario + '", "nome": "' + this.nome
                                        + '", "email": "' + this.email + '", "senha": "' + this.senha
                                        + '", "estaConect": "N"}');

                    this.$http
                    .post(linkASP, jogadorJson)
                    .then(alert("Jogador cadastrado!"))

                    this.$http
                    .get("https://localhost:5001/api/jogador/getJogadoresByUsuario/" + this.usuario)
                    .then(res => res.json())
                    .then(dadosRetornados => {
                        this.$session.start()
                        this.$session.set('jogador', dadosRetornados)
                        this.$router.push('/telaPrincipal');
                    })
                    }
                }else
                    this.mensagemSenha = "As senhas são diferentes";
                })
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
    background-image: url("0001.jpg");
    margin-left: -12px;
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
    background-color: yellow;
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

#inputSenha{
    margin-top: 20px;
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

#mensagemSenha{
    font-size: 12px;
    text-align: left;
    margin-left: 20px;
    color: red;
    position: absolute;
    margin-top: 2px;
}

#mensagemUsuario{
    position: absolute;
    font-size: 12px;
    color: red;
    text-align: left;
    margin-left: 20px;
    margin-top: 84px;
}

#logo{
    margin-bottom: -60px;
    margin-top: -50px;
}
</style>