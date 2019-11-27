import Vue from 'vue';
import moment from 'moment';

Vue.filter('date', date => moment.unix(date).format('YYYY-MM-DD'));
