<template>
<div class="body">
<router-view></router-view>
</div>
</template>

<script>
import VueRouter from 'vue-router';
import router from "./components/Routes";
import {routes} from "./components/Routes.js";

export default {
    mounted(){
      if(this.$router.currentRoute.name != 'telaInicial')
        this.$router.push('/telaInicial');
    }
}
</script>

<style>

</style>
