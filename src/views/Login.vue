<template>
  <form class="login">
      <p class="login-register">
        Don't have an account?
        <router-link class="router-link" :to="{ name: 'Register' }">Register</router-link>
      </p>
      <h2>Login to Beach Avengers</h2>
      <div class="inputs">
        <div class="input">
          <input type="text" placeholder="Email" v-model="email" />
        </div>
        <div class="input">
          <input type="password" placeholder="Password" v-model="password" />
        </div>
        <!--<div v-show="error" class="error">{{ this.errorMsg }}</div> -->
      </div>
      <!--<router-link class="forgot-password" :to="{ name: 'ForgotPassword' }"
        >Forgot your password?</router-link> -->
      <button @click.prevent="signIn">Sign In</button>
    </form>
</template>

<script>

import firebase from "firebase/app"
import "firebase/auth"


export default {
  name: "Login",
  components: {}, 
  
  data(){
    return {
      email: "",
      password: "",
    };
  },
methods: {
  signIn() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.push({ name: "Home" });
          //this.error = false;
          //this.errorMsg = "";
          console.log(firebase.auth().currentUser.uid);
        })
        //.catch((err) => {
         // this.error = true;
       //   this.errorMsg = err.message;
       // });
    },


}

};
</script>
