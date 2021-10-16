import Vue from 'vue'
import Vuex from 'vuex'
import firebase from "firebase/app";
import "firebase/auth";
import db from "../firebase/firebaseInit";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //These are global states, such as if the user is logged in, etc.
    user: null,
  
  },
  mutations: {
    //Mutations change states to the payload, called using commit

    //Updates our user state if we log in.
    updateUser(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    //Actions are functions and are called with dispatch.

    //Grab the current userID from the database if they are authorized.
    async getCurrentUser(user) {
      const dataBase = await db.collection("users").doc(firebase.auth().currentUser.uid);
    },

    //Test action.
    action1() {
      console.log("Hi from the store");
    }, 

  },
  modules: {},
});
