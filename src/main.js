import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import * as firebase from "firebase"
import Toast from "vue-toastification"
import "vue-toastification/dist/index.css"
Vue.config.productionTip = false;

Vue.use(Toast, {
  timeout: 3000,
  draggable:true,
  position: "bottom-center"
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch("autoLogin", user)
      } else {
        console.log("Not Signed in.")
      }
    })
  }
}).$mount("#app");
