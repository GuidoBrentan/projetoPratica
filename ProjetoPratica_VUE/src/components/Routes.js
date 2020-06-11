import login from "./login/Login.vue";
import telaPrincipal from "./telaPrincipal/TelaPrincipal.vue";
import cadastro from "./cadatsro/Cadastro.vue";
import telaInicial from "./telaInicial/TelaInicial.vue";
import telaCrirar from "./telaCriar/TelaCriar.vue";
import telaEntrar from "./telaEntrar/TelaEntrar.vue";
import telaJogar from "./telaJogar/TelaJogar.vue";

export const routes = [{path: "/login", component: login, name: "login"},
                       {path: "/cadastro", component: cadastro, name: "cadastro"},
                       {path: "/telaPrincipal", component: telaPrincipal, name: "telaPrincipal"},
                       {path: "/telaInicial", component: telaInicial, name:"telaInicial"},
                       {path: "/telaCriar", component: telaCrirar, name:"telaCriar"},
                       {path: "/telaEntrar", component: telaEntrar, name:"telaEntrar"},
                       {path: "/telaJogar", component: telaJogar, name: "telaJogar"}];