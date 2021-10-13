<template>
    <div class="form-wrap">
        <form class="register">
        <p class="login-register">
            Already have an account?
            <router-link class="router-link" :to="{ name: 'Login' }">Login</router-link>
        </p>
        <h2>Create Your Beach Avengers Account</h2>
        <div class="inputs">
            <div class="input">
            <input type="text" placeholder="First Name" v-model="firstName" />
            <user class="icon" />
            </div>
            <div class="input">
            <input type="text" placeholder="Last Name" v-model="lastName" />
            <user class="icon" />
            </div>
            <div class="input">
            <input type="text" placeholder="Username" v-model="username" />
            <user class="icon" />
            </div>
            <div class="input">
            <input type="text" placeholder="Email" v-model="email" />
            <email class="icon" />
            </div>
            <div class="input">
            <input type="password" placeholder="Password" v-model="password" />
            <password class="icon" />
            </div>
            <div v-show="error" class="error">{{ this.errorMsg }}</div>
        </div>
        <button @click.prevent="register">Sign Up</button>
        <div class="angle"></div>
        </form>
        <div class="background"></div>
    </div>
</template>

<script>

import firebase from "firebase/app"
import "firebase/auth"
import db from "../firebase/firebaseInit"



export default {
  name: "Register",
  components: {}, 
  
  data(){
    return {
      email: "",
      password: ""
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
