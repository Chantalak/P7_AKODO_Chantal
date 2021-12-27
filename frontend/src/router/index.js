import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Profil from "../views/Profil.vue";
import Feed from "../views/Feed.vue";
import AddPost from "../views/AddPost.vue";
import UserArticle from "../views/UserArticle.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/user/:id" ,
    name: "Profil",
    props: true,
    component: Profil,
  },
  {
    path: "/post",
    name: "Feed",
    component: Feed,
  },
  {
    path: "/article",
    name: "UserArticle",
    component: UserArticle,
  },
  {
    path: "/add",
    name: "AddPost",
    component: AddPost,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
