import Vue from "vue";
import VueRouter from "vue-router";
import Recipe from "@/components/RecipeView";
import Home from "../views/Home.vue";
import UploadImage from "@/views/UploadImage";
import Inventar from "@/views/Inventar";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },

  {
    path: "/recipe/:recipe_id",
    name: "Recipe",
    component: Recipe
  },
  {
    path: "/saveRecipe",
    name: "newRecipe",
    component: () => import("@/views/SaveRecipe")
  },
  {
    path: "/edit/:id",
    name: "Edit",
    props: true,
    component: () => import("@/views/EditRecipe")
  },
  {
    path: "/upload",
    name: "Upload",
    component: UploadImage
  },
  {
    path: "/inventar",
    name: "Inventar",
    component: Inventar
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
    path: "/login",
    name: "login",
    component: () => import("@/views/LoginPage")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
