<template>
  <div class="corpoExterno">
    <div class="corpoInterno" id="primaria">
      <img src="https://uploaddeimagens.com.br/images/002/682/932/full/12.png?1590961632" id="imagemTitulo"><br>
      <fieldset id="fieldEntrar">
        <button v-on:click="Anonimo()" id="botaoAnonimo">Anonimo</button><br>
        <button v-on:click="Login()" id="botaoLogin">Entrar</button><br>
        <button v-on:click="Cadastrar()" id="botaoCadastrar">Cadastrar</button>
      </fieldset>
    </div>
    <div class="corpoInterno" id="secundaria">
      <div id="tituloSecundario">
        <h1>Saiba Como Jogar!</h1>
      </div>
      <fieldset class="fieldSecundario" id="field1">
        <img src="https://imagensemoldes.com.br/wp-content/uploads/2018/06/Emoji-Sorrindo-Muito-PNG-1200x1200.png" width="100" height="100">
        <p class="textoSecundario">Localize as salas para entrar no jogo!</p>
      </fieldset>
      <fieldset class="fieldSecundario" id="field2">
        <img src="https://cdn.shopify.com/s/files/1/1061/1924/files/Thinking_Face_Emoji.png?6135488989279264585" width="100" height="100">
        <p class="textoSecundario">Pense muito para preencher as colunas!</p>
      </fieldset>
      <fieldset class="fieldSecundario" id="field3">
        <img src="https://i.pinimg.com/originals/7b/4f/be/7b4fbe0a2ed7a58a6c2200566f845000.png" width="110" height="100">
        <p class="textoSecundario">Se divirta vendo e validando as respostas do seus amigos!</p>
      </fieldset>
    </div>
    <div class="corpoInterno" id="terciaria">
      <div id="divMensagem">
        <h1 id="tituloMensagem">Mande sua Sugestão!</h1>
        <p id="pMensagem">Mande sua mensagem para gente! Pode ser uma sugestão, um elogio, uma critica... Fique a vontade!</p>
        <input type="text" v-model="nome" placeholder="Digite seu nome aqui..." id="nome"><br>
        <input type="text" v-model="email" placeholder="Digite seu email aqui..." id="email"><br>
        <textarea v-model="mensagem" placeholder="Digite sua mensagem aqui..." id="mensagem"></textarea>
        <button v-on:click="Enviar()" id="botaoEnviar">Enviar</button>
      </div>
      <div id="divTexto">
        <h1 id="tituloTexto">O Stop É!</h1>
        <p class="pTexto">Adedonha!, Adedanha! ou Stop! é um jogo de conhecimentos gerais. Ele é muito comum entre as crianças e até mesmo entre adultos, que consiste em desenhar-se uma tabela em tópicos em um papel para cada jogador. E como deixar ele ainda mais divertido? Digitalizando é claro!</p>
        <p class="pTexto">Baseado no famoso jogo de papel e no também popular jogo da Web 'Stopots', o nosso jogo de Stop muda tudo, com uma interação ainda mais consistente, um jogo mais personalizado e com uma disputa ainda mais acirrada.</p>
        <p class="pTexto">Com uma maneira fácil de jogar, O Stop! baseia-se em uma pessoa criar uma sala com tema, número de rodadas, tempo e se divertir com os amigos. No final de cada rodada, cada jogador avalia todas as palavras da rodada. Se o número de Confirmações for maior que o de Desqualificações, 10 pontos para a pessoa! Caso contrário, o número de Desqualificações for igual ou maior que o de Confirmações, o jogador não ganha nenhum ponto!</p>
        <p class="pTexto">Bem-vindos ao Stop!! Entre, chame seus amigos e divirta-se!</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      nome: null,
      email: null,
      mensagem: null
    }
  },

  methods: {
    Enviar(){
      if(this.mensagem == null || this.mensagem == " ")
        alert("Escreva sua mensagem!");
      else{
        if(this.nome == null || this.email == null)
          alert("Inditifique-se!");
        else{
            var mensagemJson = JSON.parse('{"nome": "' + this.mensagem + 
                                          '", "email": "' + this.email + 
                                          '", "mensagem": "' + this.mensagem + '"}');

            var linkAsp = "https://localhost:5001/api/mensagens"

            this.$http
            .post(linkAsp, mensagemJson)
            .then(alert("Mensagem enviada!"))
        }
      }
    },

    Login(){
      this.$router.push('/login');
    },

    Cadastrar(){
      this.$router.push('/cadastro');
    },

    Anonimo(){
      this.$router.push('/telaPrincipal');
    }
  }
}
</script>

<style scoped>
.corpoExterno{
    width: 1355px;
    height: 1282px;
}
.corpoInterno{
    width: 1355px;
    height: 641px;
    margin-left: -10px;
}

#primaria{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-image: url("0001.jpg");
}

#secundaria{
    background: rgba(61, 148, 44, 0.534);
    background-image: url("0002.jpg");
    margin-top: -2px;
}

#terciaria{
    background: rgba(0, 0, 0, 0.534);
    color: azure;
    font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}

input{
  background: rgba(0, 0, 0, 0.534);
  color: white;
  border-style: solid;
  border: 1px;
  border-color: black;
  width: 300px;
  height: 20px;
  margin: 25px;
  margin-left: 35px;
  padding: 7px;
  font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}

#pMensagem{
  width: 350px;
  margin-left: 35px;
  font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}

#mensagem{
  height: 150px;
  width: 300px;
  margin: 25px;
  margin-left: 35px;
  background: rgba(0, 0, 0, 0.534);    
  font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  color: white;
  border-style: solid;
  border: 1px;
  border-color: black;
  resize: none;
  padding: 7px;
}
#tituloMensgem{
  margin-left: 25px;
}

#divMensagem{
  position: absolute;
  margin-left: 140px;
  margin-top: 50px;
}

#divTexto{
  position: absolute;
  margin-left: 760px;
  margin-top: 50px;
  width: 450px;
}

#botaoEnviar{
    margin-top: 205px;
    margin-left: -340px;
    padding: 2px;
    height: 40px;
    width: 80px;
    border-radius: 5px;
    border-style: none;
    background-color: black;
    color: aliceblue;
    font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    font-size: 18px;
    position: absolute;
}

#botaoLogin{
    margin-top: 40px;
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

#botaoCadastrar{
    margin-top: 40px;
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

#botaoAnonimo{
    margin-top: 100px;
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

#fieldEntrar{
    text-align: center;
    padding: 40px;
    padding-top: 100px;
    margin-top: 100px;
    height: 350px;
    width: 220px;
    position: relative;
    border-radius: 10px;
    font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    font-size: 15px;
    background-color: rgb(191, 255, 62);
    border-style: hidden;
}

#imagemTitulo{
  position: absolute;
  margin-top: -250px;
  margin-left: 6px;
}

.fieldSecundario{
  text-align: center;
  padding: 40px;
  height: 350px;
  width: 220px;
  border-radius: 10px;
  font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  font-size: 15px;
  background-color: rgb(191, 255, 62);
  border-style: hidden;
  position: absolute;
  margin-top: 160px;
}

#field1{
  margin-left: 120px;
}

#field2{
  margin-left: 500px;
}

#field3{
  margin-left: 870px;
}

#tituloSecundario{
  position: absolute;
  font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  margin-left: 515px;
}

.textoSecundario{
  font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  font-size: 25px;
  
}
</style>