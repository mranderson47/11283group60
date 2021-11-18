<template>
  <div class="app-wrapper">
    <nav-bar class="nav-bar"/>
    <div class="app">
      <router-view />
      <Footer />
    </div>
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import Footer from "./components/Footer";
import firebase from "firebase/app";
import "firebase/auth";
export default {
  name: "app",
  components: {
    //Add the NavBar and Footer to be visible at all times throughout the app.
    NavBar, Footer
  },
  data() {
    return {};
  },
  created() {
    //On app creation we need to get the current user state since they could have already been logged in from a previous session.
    //Update the user state.
    firebase.auth().onAuthStateChanged((user) => {
      this.$store.commit("updateUser", user);
      if (user) {
        this.$store.dispatch("getCurrentUser", user);
        this.$store.dispatch("getEvents");
      }
    });
    
  },
  mounted() {},
  methods: {},
  watch: {},
};
</script>

<style lang="scss">
//Using quicksand for the font, this can be changed but I just liked it.
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Quicksand", sans-serif;
}

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.container {
  max-width: 1440px;
  margin: 0 auto;
}

.link {
  cursor: pointer;
  text-decoration: none;
  text-transform: uppercase;
  color: black;
}

.link-light {
  color: #fff;
}
</style>
