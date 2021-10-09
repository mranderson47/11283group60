<template>
  <div class="home">
    <h1>Register</h1>
    <input type="text" placeholder="Email" v-model="email">
    <input type="password" placeholder="Password" v-model="password">
    <button @click.prevent="register">Sign Up/In</button>
  </div>
</template>

<script>

import firebase from "firebase/app"
import "firebase/auth"
import db from "../firebase/firebaseInit"



export default {
  name: "Home",
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
        await dataBase.set({email: this.email, password: this.password});

        return;
    }
    return;
  },


}

};
</script>
