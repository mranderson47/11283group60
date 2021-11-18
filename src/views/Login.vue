<template>

 
  <form class="login">
      <p class="login-register">
        Don't have an account?
        <br><button1> <router-link class="googlebutton" :to="{ name: 'Register' }">Register here! </router-link></button1>
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
      <p><button @click.prevent="signIn">Sign In</button> </p>
    
    

      <p><button1 class="googlebutton" @click="signInGoogle()">Log in with Google</button1></p>
      <p><button1 class="facebookbutton" @click="signInFacebook()">Log in with Facebook</button1></p>
       <div>
    </div>
    </form>
</template>
<script>

import firebase from "firebase/app"
import "firebase/auth"
import React, { Component } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


export default {
  name: "Login",
  components: {}, 
  
  data(){
    return {
      email: "",
      password: "",
      clientId: 'cliend-id'
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
   
    signInGoogle() {
      const googleAuth = new firebase.auth.GoogleAuthProvider();
       
            
    firebase.auth().signInWithPopup(googleAuth).then((result)=>{
       console.log(firebase.auth().currentUser.uid);
      this.$router.push({name:"Home"});
      
    }) 
    
    
    
},

    //.catch((err) => {
      //alert('Oops.' + err.message)
    //});
    
    signInFacebook() {
      const FacebookAuth = new firebase.auth.FacebookAuthProvider();              
           firebase.auth().signInWithPopup(FacebookAuth);
    },



}

};
</script>
<style >
.googlebutton {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #3c82f7;
  color: #fff;
  box-shadow: 0 3px 0 #0f69ff;
  cursor: pointer;
  
}
.facebookbutton {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #3cc8f7;
  color: #fff;
  box-shadow: 0 3px 0 #3cc8f7;
  cursor: pointer;
  
}
  </style>


