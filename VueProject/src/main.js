import Vue from "vue";
import App from "./App.vue";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;
var infiniteScroll = require("vue-infinite-scroll");
Vue.use(infiniteScroll);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
