<template>
    <div class="container-sm">
        <p class="login-register">
            Already have an account?
            <router-link class="router-link" :to="{ name: 'Login' }">Login</router-link>
        </p>
        <h2>Create Your Beach Avengers Account</h2>
        <form>
          <div class="form-group">
            <label for="exampleFormControlInput1">Email address</label>
            <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" v-model="email">
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">First Name</label>
            <input type="text" class="form-control" id="exampleFormControlInput1" v-model="firstName">
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Last Name</label>
            <input type="text" class="form-control" id="exampleFormControlInput1" v-model="lastName">
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">User Name</label>
            <input type="text" class="form-control" id="exampleFormControlInput1" v-model="username">
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Password</label>
            <input type="password" class="form-control" id="exampleFormControlInput1" v-model="password">
          </div>
          <div v-show="error" class="error">{{ this.errorMsg }}</div>
          <div class="form-group">
            <button type="button" class="btn btn-primary" @click="register">Sign up</button>
          </div>
        </form>
        <div class="angle"></div>

        <div class="background"></div>
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
      firstName: "",
      lastName: "",
      username: "",
      errorMsg: null,
    };
  },
  methods: {
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
            username: this.username,
            firstname: this.firstName,
            lastName: this.lastName
             
        });

        return;
    }
    return;
  },

  }

};
</script>
<style scoped>
  .container-sm {
    width: 50%;
  }
  button {
    margin-top: 1.5em;
  }
</style>
