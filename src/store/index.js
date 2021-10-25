import Vue from 'vue'
import Vuex from 'vuex'
import firebase from "firebase/app";
import "firebase/auth";
import db from "../firebase/firebaseInit";
import jwt_decode from "jwt-decode";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //These are global states, such as if the user is logged in, etc.
    user: null,
    profileId: null,
    profileFirstName: null,
    profileLastName: null,
    token: null,
  },
  mutations: {
    //Mutations change states to the payload, called using commit

    //Updates our user state if we log in.
    updateUser(state, payload) {
      state.user = payload;
    },
    setIdToken(state, playload) {
      state.token = playload;
    },

    //Request to change the first name of the profile
    changeFirstName(state, payload) {
      state.profileFirstName = payload;
    },

    //Request to change the last name of the profile
    changeLastName(state, payload) {
      state.profileLastName = payload;
    },
    clearUser(state) {
      state.user = null;
      state.profileId = null;
      state.profileFirstName = null;
      state.profileLastName = null;
      state.token = null;
    },

    //Set the information from the database to be available to the store based on the user (grabbing data basically)
    setProfileInfo(state, doc) {
      state.profileId = doc.id;
      state.profileFirstName = doc.data().firstName;
      state.profileLastName = doc.data().lastName;
    },

  },
  actions: {
    //Grab the current userID from the database if they are authorized.
    async getCurrentUser( {commit}, user) {
      const dataBase = await db.collection("users").doc(firebase.auth().currentUser.uid);
      const dbResults = await dataBase.get();
      commit("setProfileInfo", dbResults);
      const token = await user.getIdTokenResult();
      commit("setIdToken", token.token);
      this.dispatch("verifyUser", token.token);
      
    },
    async updateUserSettings({ state }) {
      this.dispatch("verifyUser", state.token);
      const dataBase = await db.collection("users").doc(state.profileId);
      await dataBase.update({
        firstName: state.profileFirstName,
        lastName: state.profileLastName,
      });
    },
    verifyUser({commit}, token) { //call this function before any changes to db 
      var decoded = jwt_decode(token);
      //console.log(decoded);
      var now = parseInt(new Date().getTime().toString().substring(0,10));
      if (decoded.aud != "beach-avengers" ||
        decoded.auth_time > now ||
        decoded.exp < now) {
          if (this.state.user) {
            firebase.auth().signOut();
            window.location.reload();
            alert("Timed out. Log in again");
          }
          commit("clearUser");
      }
    },
  },
  modules: {},
});
