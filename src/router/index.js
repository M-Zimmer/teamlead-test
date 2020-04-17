import Vue from "vue";
import VueRouter from "vue-router";
import Posts from "../views/Posts.vue";
import Login from "../views/Login.vue";
import CreateEditPost from "../views/CreateEditPost";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Posts",
    alias: "/posts",
    component: Posts
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/create",
    name: "CreateEditPost",
    alias: "/update",
    component: CreateEditPost
  }
];

const router = new VueRouter({
  routes
});

export default router;
