import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Profil from "../views/Profil.vue";
import Feed from "../views/Feed.vue";
import AddPost from "../views/AddPost.vue";
import UserArticle from "../views/UserArticle.vue";
import EditProfil from "../views/EditProfil.vue";
import DeleteUser from "../components/DeleteUser.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },

  {
    path: "/profil" ,
    name: "Profil",
    component: Profil,
  },
  {
    path: "/profil/update" ,
    name: "EditProfil",
    component: EditProfil,
  },
  {
    path: "/profil/delete" ,
    name: "DeleteUser",
    component: DeleteUser,
  },
  {
    path: "/feed",
    name: "Feed",
    component: Feed,
  },
  {
    path: "/feed/add",
    name: "AddPost",
    component: AddPost,
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
