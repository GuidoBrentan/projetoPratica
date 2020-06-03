<template>
  <div id="corpo">
    <fieldset id="jogo">
      <div id="txtJogador">
        <p>{{txtJogador}} <img id="imgConfig" src="https://image.flaticon.com/icons/png/512/45/45712.png" width="30" height="30"></p>
      </div>
      <div id="txtUsuario">
        <img id="imgUser" src="https://lh3.googleusercontent.com/proxy/qYsikM3_Toawt6aDxJ7t9-KXe0XbeUhVjSVs0S-lqTpY2MRfXGFTaPOyfj2engK6iCV0JXVaJ34550RsQwJJqv9QnZ1Bg_QZNyVyUGVZd31oTXUYpGA" width="100px" height="100px">
        <u>{{txtUsuario}}</u><br>
        <button id="buttonSair" v-on:click="Sair()">-> Sair</button>
      </div>
      <div id="botoes">
        <button class="jogar" id="botaoCriar" v-on:click="Criar()">Criar</button><br>
        <button class="jogar" id="botaoEntrar">Entrar</button>
      </div>
    </fieldset>
  </div>
</template>

<script>
export default {
  data(){
    return{
      jogador: null,
      txtJogador: null,
      txtNivel: null,
      txtUsuario: null
    }
  },

  mounted(){
    if(this.$session.exists())
    {
      this.jogador = this.$session.get('valor');
      var divisao = this.jogador.pontos / 100;
      divisao = Math.trunc(divisao);

      switch(divisao){
        case 0: this.txtNivel = "Iniciante";break;
        case 1: this.txtNivel = "Aspirante";break;
        case 2: this.txtNivel = "Intermediário";break;
        case 3: this.txtNivel = "Formado";break;
        case 4: this.txtNivel = "Mestre";break;
        case 5: this.txtNivel = "Doutor";break;
      }
      if(divisao >= 6)
        this.txtNivel = "Expert"

      this.txtJogador = "Pontuação: " + this.jogador.pontos + 
                        " | Nível: " + this.txtNivel;

      this.txtUsuario = this.jogador.usuario;
    }else{
      this.txtJogador = "Pontuação não disponível | Nível não disponível";

      this.txtUsuario = "UserAnonimo"
    }
  },

  methods: {
    Sair(){
      this.$session.destroy();
      this.$router.push('/login');
    },

    Criar(){
      this.$router.push('/telaCriar');
    }
  }
}
</script>

<style>
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
  width: 600px;
  height: 500px;
  background-color: rgba(191, 255, 62, 0.459);
  margin-right: 20px;
  border: none;
  font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}

#txtJogador{
  background-color: yellow;
  height: 50px;
  width: 622px;
  padding-bottom: 10px;
  position: absolute;
  margin-left: -10px;
  margin-top: -5px;
  font-size: 20px;
}

#txtUsuario{
  margin-top: 200px;
  font-size: 40px;
  margin-left: 180px;
}

p{
  font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  margin-left: 20px;
}

#imgConfig{
  margin-left: 530px;
  margin-top: -40px;
  margin-bottom: 16px;
}

#imgUser{
  position: absolute;
  margin-left: -100px;
  margin-top: -10px;
}

#buttonSair{
  position: absolute;
  border: none;
  background: rgba(191, 255, 62, 0.459);;
}

.jogar{
    margin-top: -60px;
    position: absolute;
    margin-left: 450px;
}

#botaoCriar{
    padding: 2px;
    height: 40px;
    width: 100px;
    border-radius: 5px;
    border-style: none;
    background-color:  red;
    color: white;
    font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    font-size: 18px;
}

#botaoEntrar{
    padding: 2px;
    height: 40px;
    width: 100px;
    border-radius: 5px;
    border-style: none;
    background-color:  red;
    color: white;
    font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    font-size: 18px;
    margin-top: -15px;
}
</style>