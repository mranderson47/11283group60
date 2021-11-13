import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vue2Editor from "vue2-editor";
import "bootstrap";
import "bootstrap/scss/bootstrap.scss";
import {library} from "@fortawesome/fontawesome-svg-core";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

//Import icons
import {faUserCircle, faRecycle, faWater, faUmbrellaBeach, faComments, faSave, faCalendar, faHeart as fasHeart, faEdit, faTrash, faBookmark as fasBookmark} from "@fortawesome/free-solid-svg-icons";
import {faHeart as farHeart, faBookmark as farBookmark} from "@fortawesome/free-regular-svg-icons";

//Add icons to library
library.add(faUserCircle,faRecycle,faWater, faUmbrellaBeach, faComments, faSave, faCalendar, fasHeart, farHeart, farBookmark, fasBookmark,faEdit, faTrash);

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(Vue2Editor);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  //components: {"font-awesome-icon": FontAwesomeIcon},
  render: (h) => h(App),
}).$mount("#app");
