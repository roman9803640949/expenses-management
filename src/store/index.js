import Vue from "vue";
import Vuex from "vuex";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
  },

  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
  },

  getters: {
    user(state) {
      return state.user;
    },
  },

  actions: {
    signUp({ commit }, payload) {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, payload.email, payload.password)
        .then((userCredential) => {
          const user = userCredential.user;
          commit("setUser", user);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    signIn({ commit }, payload) {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, payload.email, payload.password)
        .then((userCredential) => {
          const user = userCredential.user;
          commit("setUser", user);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    autoSignIn({ commit }, payload) {
      commit("setUser", payload);
    },

    logout({ commit }) {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          commit("setUser", null);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
