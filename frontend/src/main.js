import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import App from "./App.vue";
import router from "./router";
import store from "./store";
import 'w3-css/3/w3.css';

Vue.use (BootstrapVue);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
