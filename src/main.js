import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import { fireAuth } from "@/plugins/firebase";
Vue.config.productionTip = false;

Vue.use(Toast, {
  timeout: 3000,
  draggable: true,
  position: "bottom-center"
});
let app;
fireAuth.onAuthStateChanged((user) => {

  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: h => h(App),
      created() {
        this.$store.commit("SET_USER", user);
      }
    }).$mount("#app");
  }
});
