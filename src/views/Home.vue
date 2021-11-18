<template>
  <div class="home">
    <h1><center>Welcome to Beach Avengers!</center></h1>
    <div style="background-image: url(https://www.signupgenius.com/cms/images/groups/beach-clean-up-tips-ideas-article-600x400.jpg);"></div>
    <h3><center>Our mission is to encourage people to participate in beach cleanups and bring awareness to the dangers of beach pollution.
     Here's why it matters:</center></h3>
    
    <div class="row">
  <div class="col-lg-3 d-flex align-items-stretch">
  <div class="card">
    <img class="card-img-top" src="https://datatopics.worldbank.org/what-a-waste/img/v3_waste_disposal_site.jpg" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">Global Waste</h5>
      <p class="card-text">In 2016, the world generated 242 million tonnes of plastic waste—12 percent of all municipal solid waste..</p>
       <a href="https://datatopics.worldbank.org/what-a-waste/tackling_increasing_plastic_waste.html" class="btn btn-primary">Read more</a>
    </div>
  </div>
  </div>

  <div class="col-lg-3 d-flex align-items-stretch">
  
  <div class="card">
    <img class="card-img-top" src="https://assets.rebelmouse.io/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbWFnZSI6Imh0dHBzOi8vYXNzZXRzLnJibC5tcy8yNzIyMjg3OC9vcmlnaW4uanBnIiwiZXhwaXJlc19hdCI6MTYzODU1MjkzNH0.JHNQfOJP5cauWvl18KmqXdLg8YYO5_bEX7fatf7ebJk/img.jpg?width=1245&quality=85&coordinates=0%2C0%2C0%2C0&height=700" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">Danger to Wildlife</h5>
      <p class="card-text">Over 1 million marine animals (including mammals, fish, sharks, turtles, and birds) are killed each year due to plastic debris in the ocean.</p>
      <a href="https://conserveturtles.org/information-sea-turtles-threats-marine-debris/#:~:text=The%20Problem%3A%20Over%201%20million,in%20oceans%20around%20the%20world." class="btn btn-primary">Read more</a>
    </div>
  </div>
  </div>
  <div class="col-lg-3 d-flex align-items-stretch">
  <div class="card">
    <img class="card-img-top" src="https://2rdnmg1qbg403gumla1v9i2h-wpengine.netdna-ssl.com/wp-content/uploads/sites/3/2018/10/908884674-should-your-child-stay-650x428.jpg" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">Health Consequences</h5>
      <p class="card-text"> Illnesses associated with polluted beach water include stomach flu, skin rashes, pinkeye, respiratory infections, meningitis, and hepatitis. </p>
      <a href="https://www.nrdc.org/sites/default/files/ttw2014_Impacts_of_Beach_Pollution.pdf" class="btn btn-primary">Read more</a>
    </div>
  </div>
</div>
<div class="col-lg-3 d-flex align-items-stretch">
  <div class="card">
    <img class="card-img-top" src="https://media.istockphoto.com/vectors/lost-vector-id1090317584?k=20&m=1090317584&s=612x612&w=0&h=G0UnUBeCqK9X9YMYLUjBZT1waoHFrJb3RryjVUkbVlY=" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">Financial Consequences</h5>
      <p class="card-text">A study published in the Marine Pollution Bulletin recently reported that plastic pollution in the world's oceans costs society up to $2.5 trillion a year. </p>
       <a href="https://amp.theguardian.com/global-development/2019/apr/04/marine-plastic-pollution-costs-the-world-up-to-25bn-a-year-researchers-find" class="btn btn-primary">Read more</a>
    </div>
  </div>
  </div>
</div>
 <!-- SHOW THIS IF WE ARE NOT A USER AKA NOT SIGNED IN-->
<div v-if="!user" class="updates">
       <br><h2 ><an>Get started by logging in today. <br> </an>
    <router-link class="router-button" to="login"><button type="button" class="btn btn-primary">Log In</button></router-link>
    
    </h2>
  
    </div>


    <!-- SHOW THIS IF WE ARE A USER AKA SIGNED IN-->
    <div v-if="user">
      <br><h2>Welcome back, {{$store.state.profileFirstName}}! <br>
      <button type="button" class="btn btn-primary" @click="signOut">Sign Out</button>
      </h2>
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
<style lang="scss">
body {
  background-image: url("https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/beach-quotes-1559667853.jpg");

 
  background-size: cover;
}
header {

  text-align: center;
  background: #1abc9c;
  color: white;
  font-size: 30px;
  z-index: -1;
}
h1 { 
    text-align: center; 
    background-image: url("https://s3.amazonaws.com/ghost-cms-woi/2021/06/BlueRecovery.jpg"); 
}
h3 {
  border-style: solid;

}
h2{
   display: inline-block;
 border-style: solid;
  color: black;
  background-image: url("https://media.cntraveler.com/photos/59ef91dd8d4f736d51415c2e/master/w_2667,h_2000,c_limit/7MileBeach-2013-HiRes.jpg")
  
  
}


</style>