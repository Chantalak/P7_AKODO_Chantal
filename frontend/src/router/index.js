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
    path: "/user",
    name: "Profil",
    component: Profil,
  },
  {
    path: "/feed",
    name: "Feed",
    component: Feed,
  },
  {
    path: "/post",
    name: "UserArticle",
    component: UserArticle,
  },
  {
    path: "/post",
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
