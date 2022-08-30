import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Signin from "../views/Signin.vue";
import Signup from "../views/Signup.vue";
import Authguard from "./auth-guard";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },

  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
    beforeEnter: Authguard,
  },

  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },

  {
    path: "/signin",
    name: "Signin",
    component: Signin,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
