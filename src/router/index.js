import Vue from "vue";
import VueRouter from "vue-router";
import RecipeView from "@/components/RecipeView";
import Home from "../views/Home.vue";
import UploadImage from "@/views/UploadImage";
import Inventar from "@/views/Inventar";
import { fireAuth } from "@/plugins/firebase";
import DevTestView from "@/views/DevTestView"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/dev/test",
    name: "devtest",
    component: DevTestView
  },
  {
    path: "/airfry",
    name: "Airfry",
    component: () => import("@/views/AirFryRecipesView")
  },
  {
    path: "/recipe/:recipe_id",
    name: "Recipe",
    component: RecipeView
  },
  {
    path: "/saverecipe",
    name: "saverecipe",
    component: () => import("@/views/SaveRecipe"),
    meta: { requiresAuth: true, frompath: "/saverecipe" }
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
  },

  {
    path: "/register",
    name: "register",
    component: () => import("@/components/RegisterComponent")
  },

  {
    path: "/userdashboard",
    name: "userdashboard",
    component: () => import("@/components/authentication/UserDashboard"),
    meta: { requiresAuth: true, frompath: "/userdashboard" }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = fireAuth.currentUser;
  if (requiresAuth && !isAuthenticated) {
    const querypath = to.meta.frompath;
    next({ name: "login", query: { from: querypath } });
  } else next();
});

export default router;
