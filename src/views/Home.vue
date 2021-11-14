<template>
  <div class="home">
    <h1>Welcome to Beach Avengers!</h1>
    <!-- SHOW THIS IF WE ARE NOT A USER AKA NOT SIGNED IN-->
    <div v-if="!user" class="updates">
      <h2 >Get started by logging in today.</h2>
    <router-link class="router-button" to="login">Login Here.</router-link>
    </div>

    <!-- SHOW THIS IF WE ARE A USER AKA SIGNED IN-->
    <div v-if="user">
      <h2>Welcome back, {{$store.state.profileFirstName}}!</h2>
      <button @click="signOut">Sign Out</button>
    </div>
  </div>
</template>

<script>

import "firebase/auth";
import firebase from "firebase/app";


export default {
  name: "Home",
  components: {},
  computed:{

    firstName:{
      get(){
        return this.$store.state.firstName;
      },
    },
    //Returns if we are logged in and authenticated
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
      signOut() {
      firebase.auth().signOut();
      window.location.reload();
    },
  },
}
  
 
</script>
