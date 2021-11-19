import Vue from 'vue'
import Vuex from 'vuex'
import { createStore } from "vuex";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import db from "../firebase/firebaseInit";
import jwt_decode from "jwt-decode";

export default createStore({
  "state": {
    //These are global states, such as if the user is logged in, etc.
    user: null,
    profileId: null,
    profileFirstName: null,
    profileLastName: null,
    token: null,
    events: [],
    userEvents: [],
    likedEvents: [],
    profileImage: null,
  },
  "mutations": {
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
      let index = payload.usersLiked.findIndex((it) => it == state.profileId);
      if (index != -1)
        state.likedEvents.push(payload);
    },
    editEvent(state, payload) {
      let index = state.events.findIndex((it) => it.id == payload.id);
      state.events[index] = payload;
      index = state.userEvents.findIndex((it) => it.id == payload.id);
      if (index != -1) {
        state.userEvents[index] = payload;
      }
      index = state.likedEvents.findIndex((it) => it.id == payload.id);
      if (index != -1) {
        state.likedEvents[index] = payload;
      }
    },
    deleteEvent(state, payload) {
      let index = state.events.findIndex((it) => it.id == payload);
      state.events.splice(index, 1);
      index = state.userEvents.findIndex((it) => it.id == payload);
      if (index != -1) {
        state.userEvents.splice(index, 1);
      }
      index = state.likedEvents.findIndex((it) => it.id == payload);
      if (index != -1) {
        state.likedEvents.splice(index, 1);
      }
    },

    addToLikedEvents(state, payload) {
      state.likedEvents.push(payload);

    },

    removeFromLikedEvents(state, payload) {
      let index = state.likedEvents.findIndex((it) => it.id == payload.id);
      if (index != -1)
        state.likedEvents.splice(index, 1);

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
    setProfileInfo(state, payload) {
      state.profileId = payload.id;
      state.profileFirstName = payload.firstName;
      state.profileLastName = payload.lastName;
      if (payload.profileImage) {
        state.profileImage = payload.profileImage;
      }
    },
    
    changeProfileImage(state, payload) {
      state.profileImage = payload;
    },

  },
  "actions": {
    //Grab the current userID from the database if they are authorized.
    async getCurrentUser( {commit}, user) {
      console.log(firebase.auth().currentUser.uid);
      const dataBase = await db.collection("users").doc(firebase.auth().currentUser.uid);
      const dbResults = await dataBase.get();
      console.log(dbResults);
      var userToSave = dbResults.data();
      userToSave.id = dbResults.id;
      commit("setProfileInfo", userToSave);
      const token = await user.getIdTokenResult();
      commit("setIdToken", token.token);
      this.dispatch("verifyUser", token.token);
      
    },
    async createExternalUser({commit}, user) {
      const userRef = await db.collection("users").doc(user.uid);
      var userToSave = {
        firstName: user.displayName.split(' ')[0],
        lastName: user.displayName.split(' ')[1],
        email: user.email,
        profileImage: user.photoURL,
      }
      await userRef.set(userToSave);
      userToSave.id = user.uid
      commit("setProfileInfo", userToSave);
    },
    async updateUserSettings({ state }) {
      this.dispatch("verifyUser", state.token);
      const dataBase = await db.collection("users").doc(state.profileId);
      await dataBase.update({
        firstName: state.profileFirstName,
        lastName: state.profileLastName,
        profileImage: state.profileImage,
      });
    },
    async getEvents({commit}) {
      const eventsRef = await db.collection("events");
      var querry = eventsRef.get()
      .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              var eventToSave = doc.data();
              eventToSave.id = doc.id;
              // doc.data() is never undefined for query doc snapshots
              commit("addEvent", eventToSave);
          });
      })
      .catch((error) => {
          console.log("Error getting documents: ", error);
      });
    },
    async getImageUrl({commit}, image) {
      var name = new Date().getTime();
      const storageRef = await firebase.storage().ref(`event-images/${name}`).put(image);
      const s = await firebase.storage().ref(`event-images/${name}`).getDownloadURL();
      return s;
    },
    async saveEventToDB({commit}, event) {
      event.date = event.date.getTime();
      const userRef = await db.collection("users").doc(this.state.profileId);
      var eventToSave = {
        creator: userRef,
        date: event.date,
        title: event.title,
        zipcode: parseInt(event.zipcode),
        locationName: event.locationName,
        creatorName: this.state.profileFirstName,
        likeCount: 0,
        usersLiked: []
      }
      if (event.description) {
        eventToSave.description = event.description;
      }
      if (event.locationLink) {
        eventToSave.locationLink = event.locationLink;
      }
      if (event.imageUrl) {
        eventToSave.imageUrl = event.imageUrl;
      }
      const eventsRef = db.collection("events").doc();
      await eventsRef.set(eventToSave);
      eventToSave.id = eventsRef.id;
      commit("addEvent", eventToSave);
    },
    async editEvent({commit}, event) {
      event.date = event.date.getTime();
      event.zipcode = parseInt(event.zipcode);
      let id = event.id;
      delete event.id;
      try {
        await db.collection("events").doc(id).update(event);
      }
      catch (error) {
        console.log(error);
      }
      event.id = id;
      commit("editEvent", event);
    },
    async addLike({commit}, event) {
      let id = event.id;
      delete event.id;
      event.usersLiked.push(this.state.profileId);
      event.likeCount+=1;
      try {
        await db.collection("events").doc(id).update(event);
      }
      catch (error) {
        console.log(error);
      }
      event.id = id;
      commit("editEvent", event);
      commit("addToLikedEvents", event);
    },

    async removeLike({commit}, event) {
      let id = event.id;
      delete event.id;
      let index = event.usersLiked.findIndex((it) => it == this.state.profileId);
      event.usersLiked.splice(index, 1);
      if (event.likeCount <= 0) {
        console.log("error");
        return;
      }
      event.likeCount -= 1;
      try {
        await db.collection("events").doc(id).update(event);
      }
      catch (error) {
        console.log(error);
      }
      event.id = id;
      commit("editEvent", event);
      commit("removeFromLikedEvents", event);
    },
  
    async deleteEvent({commit}, event) {
      let id = event.id;
      try {
        await db.collection("events").doc(id).delete();
      }
      catch(error) {
        console.log(error);
      }
      commit("deleteEvent", id);
    },
    verifyUser({commit}, token) { //call this function before any changes to db 
      var decoded = jwt_decode(token);
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
  "modules": {},
});
