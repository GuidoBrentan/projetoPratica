<template>
  <div id="corpo">
    <fieldset id="jogo">
      <div id="txtJogador">
        <p>{{txtJogador}} <img id="imgConfig" src="https://image.flaticon.com/icons/png/512/45/45712.png" width="30" height="30"> <img id="imgInfo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Info_Simple_bw.svg/1200px-Info_Simple_bw.svg.png" width="30" height="30"></p>
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
      txtNivel: null
    }
  },

  mounted(){
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

    this.txtJogador = "Usuario: " + this.jogador.usuario + 
                      " | Pontuação: " + this.jogador.pontos + 
                      " | Nível: " + this.txtNivel;
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
  font-size: 15px;
}

#txtJogador{
  background-color: yellow;
  height: 50px;
  width: 611px;
  padding: 5px;
  position: absolute;
  margin-left: -10px;
  margin-top: -5px;
}

p{
  font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  font-size: 15px;
  margin-left: 20px;
}

#imgConfig{
  margin-left: 470px;
  margin-top: -30px;
  margin-bottom: 5px;
}

#imgInfo{
  margin-left: 520px;
  margin-top: -38px;
  margin-bottom: 30px;
}
</style>