import Vue from 'vue';
import axios from 'axios';
import Web3 from 'web3';
import { sync } from 'vuex-router-sync';

import App from './App';
import router from './router';
import store from './store';

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.http = Vue.prototype.$http = axios;
Vue.web3 = Vue.prototype.$web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
Vue.config.productionTip = false;

sync(store, router);

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>',
}).$mount('#app');
