import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import store from "./store";
import { app } from "./firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),

  created() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      console.log(app);
      if (user) {
        this.$store.dispatch("autoSignIn", user);
        this.$store.dispatch("getCategory");
        this.$store.dispatch("getSubCategory");
      }
    });
  },
}).$mount("#app");
