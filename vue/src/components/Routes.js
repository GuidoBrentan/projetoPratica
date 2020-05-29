import login from "./login/Login.vue";
import telaPrincipal from "./telaPrincipal/TelaPrincipal.vue";
import cadastro from "./cadatsro/Cadastro.vue"

export const routes = [{path: "/login", component: login, name: "login"},{path: "/cadastro", component: cadastro, name: "cadastro"},{path: "/telaPrincipal", component: telaPrincipal, name: "telaPrincipal"}];