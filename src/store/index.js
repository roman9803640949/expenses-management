import Vue from "vue";
import Vuex from "vuex";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import {
  collection,
  getDocs,
  addDoc,
  where,
  query,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "../firebase";

Vue.use(Vuex);

function getDefaultState() {
  return {
    user: null,
    categories: [],
    sub_categories: [],
  };
}

export default new Vuex.Store({
  state: getDefaultState(),

  mutations: {
    resetState(state) {
      Object.assign(state, getDefaultState());
    },

    setUser(state, payload) {
      state.user = payload;
    },

    setCategory(state, payload) {
      state.categories.push({
        title: payload.data().title,
        description: payload.data().description,
        id: payload.id,
        user_id: state.user.uid,
      });
    },

    setSubCategory(state, payload) {
      state.sub_categories.push({
        title: payload.data().title,
        description: payload.data().description,
        id: payload.id,
        user_id: state.user.uid,
        price: payload.data().price,
        category_id: payload.data().category_id,
      });
    },

    addCategory(state, payload) {
      state.categories.push(payload);
    },

    addSubCategory(state, payload) {
      state.sub_categories.push(payload);
    },

    deleteSubCategory(state, payload) {
      let item = state.sub_categories.find((item) => {
        return item.id === payload.id;
      });

      let index = state.sub_categories.indexOf(item);
      state.sub_categories.splice(index, 1);
    },
  },

  getters: {
    user(state) {
      return state.user;
    },

    categories(state) {
      return state.categories;
    },

    sub_categories(state) {
      return state.sub_categories;
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
          commit("resetState");
        })
        .catch((error) => {
          console.log(error);
        });
    },

    async getCategory({ commit, state }) {
      const categories = collection(db, "category");
      const q = query(categories, where("user_id", "==", state.user.uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        commit("setCategory", doc);
      });
    },

    async getSubCategory({ commit, state }) {
      const categories = collection(db, "sub_category");
      const q = query(categories, where("user_id", "==", state.user.uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        commit("setSubCategory", doc);
      });
    },

    async addCategory({ commit }, payload) {
      await addDoc(collection(db, "category"), {
        title: payload.title,
        description: payload.description,
        user_id: payload.user_id,
      });

      commit("addCategory", payload);
    },

    async addSubCategory({ commit }, payload) {
      const data = await addDoc(collection(db, "sub_category"), {
        title: payload.title,
        description: payload.description,
        price: payload.price,
        date: payload.date,
        user_id: payload.user_id,
        category_id: payload.category_id,
      });

      console.log(data);

      commit("addSubCategory", { ...payload, id: data.id });
    },

    async addBudget({ commit }, payload) {
      await addDoc(collection(db, "budget"), {
        title: payload.title,
        amount: payload.amount,
        date: payload.date,
        user_id: payload.user_id,
        rem_amount: payload.amount,
      });

      commit();
    },

    async deleteSubCategory({ commit }, payload) {
      await deleteDoc(doc(db, "sub_category", payload.id));
      commit("deleteSubCategory", payload);
    },
  },
});
