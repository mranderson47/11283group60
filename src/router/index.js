import { createRouter, createWebHistory } from "vue-router";

//Here is where we import the views for the router to use
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Profile from "../views/Profile.vue";
import Event from "../views/Event.vue";
import store from "../store/index";


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

  {
    path: "/event",
    name: "Event",
    component: Event,
    
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

],

router = createRouter({
  history: createWebHistory("beach-avengers"),
  routes,
});

export default router;
