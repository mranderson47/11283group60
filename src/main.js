import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vue2Editor from "vue2-editor";
import "bootstrap";
import "bootstrap/scss/bootstrap.scss";
import {library} from "@fortawesome/fontawesome-svg-core";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import VueResource from 'vue-resource'
import Vue from 'vue'
//Import icons
import {faUserCircle, faRecycle, faWater, faUmbrellaBeach, faComments, faSave, faCalendar, faHeart as fasHeart, faEdit, faTrash, faBookmark as fasBookmark} from "@fortawesome/free-solid-svg-icons";
import {faHeart as farHeart, faBookmark as farBookmark} from "@fortawesome/free-regular-svg-icons";
import {createApp} from "vue";
//Add icons to library
library.add(faUserCircle,faRecycle,faWater, faUmbrellaBeach, faComments, faSave, faCalendar, fasHeart, farHeart, farBookmark, fasBookmark,faEdit, faTrash);



// send the request as application/x-www-form-urlencoded


createApp(App).
    component("font-awesome-icon", FontAwesomeIcon).
    use(store).
    use(router).
    mount("#app");

/*
new Vue({
  router,
  store,
  //components: {"font-awesome-icon": FontAwesomeIcon},
  render: (h) => h(App),
}).$mount("#app");*/

