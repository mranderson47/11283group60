import Vue from 'vue'
import Vuex from 'vuex'
import "firebase/auth";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //This is where the UserID will go. just a temp value here to test credentials
    user: null,
  
  },
  mutations: {

  },
  actions: {
    action1() {
      console.log("Hi from the store");
    }, 
  
  },
  modules: {

  }
})
