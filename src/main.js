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
import {faUserCircle, faRecycle, faWater, faUmbrellaBeach, faComments, faSave} from "@fortawesome/free-solid-svg-icons";

//Add icons to library
library.add(faUserCircle,faRecycle,faWater, faUmbrellaBeach, faComments, faSave);

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(Vue2Editor);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  //components: {"font-awesome-icon": FontAwesomeIcon},
  render: (h) => h(App),
}).$mount("#app");
