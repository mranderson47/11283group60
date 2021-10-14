import Vue from "vue";
import VueRouter from "vue-router";

//Here is where we import the views for the router to use
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Profile from "../views/Profile.vue";

Vue.use(VueRouter);

const routes = [
  //Route for Home View
  {
    path: "/",
    name: "Home",
    component: Home,
  },

    //Route for Login View
  
  {
    path: "/login",
    name: "Login",
    component: Login,
  },

    //Route for Register view
  {
    path: "/register",
    name: "Register",
    component: Register,
  },

  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  }

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
