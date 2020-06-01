import Vue from 'vue';
import App from './App.vue';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import { routes } from './components/Routes.js';
import  bootstrap from 'bootstrap-vue';
import VueSession from 'vue-session';

Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(bootstrap);
Vue.use(VueSession, options)

var options = {
    persist: true
}

const router = new VueRouter({
  routes : routes
 }); 

 new Vue({
  el: '#app',
  router,
  render: h => h(App)
 })
