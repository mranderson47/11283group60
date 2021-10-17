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
    profileId: null,
    profileFirstName: null,
  
  },
  mutations: {
    //Mutations change states to the payload, called using commit

    //Updates our user state if we log in.
    updateUser(state, payload) {
      state.user = payload;
    },

    //Set the information from the database to be available to the store based on the user (grabbing data basically)
    setProfileInfo(state, doc) {
      state.profileId = doc.id;
      state.profileFirstName = doc.data().firstname;
    },

  },
  actions: {
    //Actions are functions and are called with dispatch.

    //Grab the current userID from the database if they are authorized.
    async getCurrentUser( {commit}, user) {
      const dataBase = await db.collection("users").doc(firebase.auth().currentUser.uid);
      const dbResults = await dataBase.get();
      commit("setProfileInfo", dbResults);
      
    },

    //Test action.
    action1() {
      console.log("Hi from the store");
    }, 

  },
  modules: {},
});
