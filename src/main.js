import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import store from "./store";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),

  created() {
    const firebaseConfig = {
      apiKey: "AIzaSyAtB-i3xkNxQubNy6oKam0t9UuOLcpYapE",
      authDomain: "expense-management-7b4c9.firebaseapp.com",
      projectId: "expense-management-7b4c9",
      storageBucket: "expense-management-7b4c9.appspot.com",
      messagingSenderId: "714022233756",
      appId: "1:714022233756:web:e1f3602d7802824d82af59",
    };

    const app = initializeApp(firebaseConfig);
    console.log(app);

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.$store.dispatch("autoSignIn", user);
      }
    });
  },
}).$mount("#app");
