import Vue from 'vue';
import moment from 'moment';

Vue.filter('date', date => moment.unix(date)
  .format('YYYY-MM-DD'));
Vue.filter('idx', idx => idx + 1);
Vue.filter('price', price => price.toFixed(2)
  .replace(/\d(?=(\d{3})+\.)/g, '$&,'));
