<template>
  <div>
      <input type="text" v-model="nomeDaSala">
      <input type="number" v-model="numeroDeRodadas">
      <input type="number" v-model="numeroMaxJogadores">
      <td><tr>Adicione as colunas para o jogo</tr></td>
      <button>+</button> <button>-</button>

  </div>
</template>

<script>
export default {
    data(){
        return{
            nomeDaSala: null,
            numeroDeRodadas: null,
            numeroMaxJogadores: null
        }
    }
}
</script>

<style>

</style>