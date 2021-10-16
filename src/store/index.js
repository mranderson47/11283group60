import Vue from 'vue'
import Vuex from 'vuex'
import firebase from "firebase/app";
import "firebase/auth";
import db from "../firebase/firebaseInit";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //This is where the UserID will go. just a temp value here to test credentials
    user: null,
  
  },
  mutations: {

    updateUser(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    async getCurrentUser(user) {
      const dataBase = await db.collection("users").doc(firebase.auth().currentUser.uid);
      const dbResults = await dataBase.get();
      const token = await user.getIdTokenResult();
      console.log(dbResults);
      console.log(token);

    },
    action1() {
      console.log("Hi from the store");
    }, 

  },
  modules: {

  }
})
