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
    events: [],
    userEvents: [],
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

    addEvent(state, payload) {
      state.events.push(payload);
      if (payload.creator.id == state.profileId)
        state.userEvents.push(payload);
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
    async getEvents({commit}) {
      const eventsRef = await db.collection("events");
      var querry = eventsRef.get()
      .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
              commit("addEvent", doc.data());
          });
      })
      .catch((error) => {
          console.log("Error getting documents: ", error);
      });
    },
    async saveEventToDB({commit}, event) {
      const userRef = await db.collection("users").doc(this.state.profileId);
      var eventToSave = {
        creator: userRef,
        date: event.date.getTime(),
        title: event.name,
        zipcode: parseInt(event.zipCode),
        locationName: event.locationName,
        creatorName: this.state.profileFirstName
      }
      if (event.purpose) {
        eventToSave.description = event.purpose;
      }
      if (event.locationLink) {
        eventToSave.locationLink = event.locationLink;
      }
      const eventsRef = db.collection("events").doc();
      await eventsRef.set(eventToSave);
      commit("addEvent", eventToSave);
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
