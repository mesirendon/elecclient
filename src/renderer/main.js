import Vue from 'vue';
import axios from 'axios';
import path from 'path';
import { sync } from 'vuex-router-sync';

import App from './App';
import router from './router';
import store from './store';
import { db } from './repositories';
import { web3 } from './handlers';
import { MAIN_FOLDER, FILE_FOLDER } from './store/constants';

const { remote } = window.require('electron');
const fs = remote.require('fs');

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.http = Vue.prototype.$http = axios;
Vue.db = Vue.prototype.$db = db;
Vue.web3 = Vue.prototype.$web3 = web3;
Vue.config.productionTip = false;

const mainFolder = path.join(remote.app.getPath('userData'), MAIN_FOLDER);
if (!fs.existsSync(mainFolder)) {
  fs.mkdirSync(mainFolder);
}

const fileFolder = path.join(remote.app.getPath('userData'), FILE_FOLDER);
if (!fs.existsSync(fileFolder)) {
  fs.mkdirSync(fileFolder);
}

sync(store, router);

/* eslint-disable no-form */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>',
}).$mount('#app');
