import Vue from "vue";
import VueRouter from "vue-router";
import AuthLogin from "../views/AuthUser/AuthLogin.vue";
import AuthSignup from "../views/AuthUser/AuthSignup.vue";
import UserProfil from "../views/GestionUser/UserProfil.vue";
import UserUpdate from "../views/GestionUser/UserUpdate.vue";
import AllPosts from "../views/GestionPost/AllPosts.vue";

import CreatePost from "../views/GestionPost/CreatePost.vue";
import UserArticle from "../views/UserArticle.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "AuthLogin",
    component: AuthLogin,
  },
  {
    path: "/signup",
    name: "AuthSignup",
    component: AuthSignup,
  },
  {
    path: "/profil" ,
    name: "UserProfil",
    component: UserProfil,
  },
  {
    path: "/profil/update" ,
    name: "UserUpdate",
    component: UserUpdate,
  },
  {
    path: "/feed",
    name: "AllPosts",
    component: AllPosts,
  },
  {
    path: "/feed/add",
    name: "CreatePost",
    component: CreatePost,
  },


  {
    path: "/feed/article/:id",
    name: "UserArticle",
    component: UserArticle,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
