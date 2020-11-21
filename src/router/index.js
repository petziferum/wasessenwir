import Vue from "vue";
import VueRouter from "vue-router";
import Hello from "@/components/HelloWorld";
import Home from "../views/Home.vue";
import UploadImage from "@/views/UploadImage";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/Hello",
    name: "Hello",
    component: Hello
  },
  {
    path: "/upload",
    name: "Upload",
    component: UploadImage
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/saveRecipe",
    name: "newRecipe",
    component: () => import("@/views/SaveRecipe")
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/LoginPage")
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
