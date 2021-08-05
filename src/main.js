import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueWait from 'vue-wait';
import axios from 'axios'

const moment = require('moment')
require('moment/locale/hr')
 
Vue.use(VueWait);

Vue.use(require('vue-moment'), {
    moment
})

axios.defaults.baseURL = "https://6103057679ed680017482413.mockapi.io/"

Vue.config.productionTip = false;

new Vue({
  wait: new VueWait({
    useVuex: true
  }),
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
