<template>
<div>
   <div class="corpo">
    <router-view></router-view>
  </div>
</div>
</template>

<script>
import VueRouter from 'vue-router';
import router from "./components/Routes";
import {routes} from "./components/Routes.js";

export default {
  created(){
    this.$router.push('/login');
  }
}
</script>

<style>

</style>
