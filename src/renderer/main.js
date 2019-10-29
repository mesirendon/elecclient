import Vue from 'vue';
import axios from 'axios';
import { sync } from 'vuex-router-sync';

import App from './App';
import router from './router';
import store from './store';
import { db } from './repositories';
import { web3 } from './handlers';

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.http = Vue.prototype.$http = axios;
Vue.db = Vue.prototype.$db = db;
Vue.web3 = Vue.prototype.$web3 = web3;
Vue.config.productionTip = false;

sync(store, router);

/* eslint-disable no-form */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>',
}).$mount('#app');
