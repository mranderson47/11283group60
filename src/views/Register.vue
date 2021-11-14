<template>
    <div class="container-sm">
        <p class="login-register">
            Already have an account?
            <router-link class="router-link" :to="{ name: 'Login' }">Login</router-link>
        </p>
        <h2>Create Your Beach Avengers Account</h2>
        <div
          ref="messages"
          v-if="errorMessages.length"
          class="alert alert-danger fade show"
        >
          <span
            v-for="(msg, index) in errorMessages"
            :key="index"
            id="message"
            v-html="msg"
          ></span>
          <button
            type="button"
            class="btn-close"
            @click="errorMessages = []"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
        <form novalidate @submit.prevent="onSave">
          <div class="form-group">
            <label for="exampleFormControlInput1">Email address <span class="requierd-span">*</span></label>
            <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" v-model="email">
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">First Name <span class="requierd-span">*</span></label>
            <input type="text" class="form-control" id="exampleFormControlInput1" v-model="firstName" >
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Last Name <span class="requierd-span">*</span></label>
            <input type="text" class="form-control" id="exampleFormControlInput1" v-model="lastName">
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Password <span class="requierd-span">*</span></label>
            <input type="password" class="form-control" id="exampleFormControlInput1" v-model="password">
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Confirm Password <span class="requierd-span">*</span></label>
            <input type="password" class="form-control" id="exampleFormControlInput1" v-model="confirmPW">
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-primary" >Sign up</button>
          </div>
        </form>
    </div>
</template>

<script>

import "firebase/auth";
import firebase from "firebase/app"
import db from "../firebase/firebaseInit"

export default {
  name: "Register",
  components: {}, 
  
  data(){
    return {
      email: "",
      password: "",
      confirmPW: "",
      firstName: "",
      lastName: "",
      errorMessages: [],

    };
  },
  methods: {
    onSave() { //function for input validation
      const nameRegex = /^[a-zA-Z\\-]+$/;
     // const usernameRegex = /^[a-zA-Z0-9]+$/;
      const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const passwordRegex = /^(?=.*\d)(?=.*[a-z])[!@#\\$%\\^&\\*0-9a-zA-Z]{8,}$/;
      this.errorMessages = [];

      if (!nameRegex.test(this.firstName))
        this.errorMessages.push("<b>First Name</b> is invalid.");
      if (!emailRegex.test(this.email)) 
        this.errorMessages.push("<b>Email</b> is invalid.");
      if (!nameRegex.test(this.firstName)) 
        this.errorMessages.push("<b>Last Name</b> is invalid.");
      if (!passwordRegex.test(this.password)) 
        this.errorMessages.push("<b>Password</b> is invalid.");
      if (this.password != this.confirmPW)
        this.errorMessages.push("Passwords don't match.");

      if (this.errorMessages.length === 0) {
        this.register();
      }
    },
    async register(){
      if(this.email !== "" && this.password !== "")
      {
          const firebaseAuth = await firebase.auth();
          const createUser = await firebaseAuth.createUserWithEmailAndPassword(this.email,this.password);
          const result = await createUser;
          const dataBase = db.collection("users").doc(result.user.uid);
          await dataBase.set({
              email: this.email,
              password: this.password,
              firstName: this.firstName,
              lastName: this.lastName
              
          });
          //Push the user to the homepage on signup
          this.$router.push({name: "Home"});

          return;
      }
      return;
  },

  }

};
</script>
<style scoped>
  .requierd-span {
    color: red;
  }
  #message {
    display: block;
  }
  .container-sm {
    width: 50%;
    padding-bottom: 100px;
  }
  .alert.alert-danger {
    font-size: 12.5px;
  }

  .alert.alert-danger .btn-close {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 2;
    padding: 1.25rem 1rem;
  }

  button {
    margin-top: 1.5em;
  }
</style>
