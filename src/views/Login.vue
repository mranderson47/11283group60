<template>
  <div class="logIn">
    <form >
        <p>
            Don't have an account?
            <router-link class="router-link" :to="{ name: 'Register' }">Register</router-link>
        </p>
        <br/>
        <h2>Login to Beach Avengers</h2>
        <br/>
        <div class="form-group">
            <label for="exampleFormControlInput1">Email address <span class="requierd-span">*</span></label>
            <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" v-model="email">
        </div>
        <br/>
        <div class="form-group">
            <label for="exampleFormControlInput1">Password <span class="requierd-span">*</span></label>
            <input type="email" class="form-control" id="exampleFormControlInput1" v-model="password">
        </div>
        <br/>
        <div class="form-group">
            <p><button type="submit" class="btn btn-primary" @click="signIn()">Log In</button> </p>
        </div>
        <br/>
        <hr/>
        <h3><center> OR </center></h3>
        <div class="row">
          <p class="col-md-6"><center><button1 class="googlebutton" @click="signInGoogle()">Log in with Google</button1></center></p>
          <p class="col-md-6"><center><button1 class="facebookbutton" @click="signInFacebook()">Log in with Facebook</button1></center></p>
        </div>
        <div>
      </div>
    </form>
  </div>
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
        console.log(firebase.auth().currentUser.uid);
      })
  },
  
  signInGoogle() {
    const googleAuth = new firebase.auth.GoogleAuthProvider();     
    firebase.auth().signInWithPopup(googleAuth).then((result)=>{
      if ( result.additionalUserInfo.isNewUser) {
        this.$store.dispatch("createExternalUser", result.user);
      }
      this.$router.push({name:"Home"});
    }) 
  },
  
  signInFacebook() {
    const FacebookAuth = new firebase.auth.FacebookAuthProvider();              
    firebase.auth().signInWithPopup(FacebookAuth).then((result)=>{
      console.log(result);
      let userToSave = {
        photoURL: result.additionalUserInfo.profile.picture.data.url,
        email: result.user.email,
        displayName: result.user.displayName,
        uid: result.user.uid
      }
      console.log(userToSave);
      if ( result.additionalUserInfo.isNewUser) {
        this.$store.dispatch("createExternalUser", userToSave);
      }
      this.$router.push({name:"Home"});
    });
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
 .requierd-span {
    color: red;
  }
  .logIn {
    width: 25%;
    padding-bottom: 100px;
    margin-left: 37.25%;
  }
</style>


