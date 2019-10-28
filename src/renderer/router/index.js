import store from '@/store';
import { SESSION_IS_LOGGED } from '@/store/constants';
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const requireAuth = (to, from, next) => {
  if (!store.getters[SESSION_IS_LOGGED]) {
    next({ name: 'home' });
  } else {
    next();
  }
};

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: require('@/views/Home').default,
    },
    {
      path: '/configuration',
      name: 'configuration',
      component: require('@/views/Configuration').default,
      beforeEnter: requireAuth,
    },
    {
      path: '/login',
      name: 'login',
      component: require('@/views/Login').default,
    },
    {
      path: '/tenders/:address',
      name: 'tender',
      component: require('@/views/Tender').default,
      props: true,
      beforeEnter: requireAuth,
    },
    {
      path: '/tenders',
      name: 'newTender',
      component: require('@/views/Tender').default,
      beforeEnter: requireAuth,
    },
    {
      path: '/tenders/:address',
      name: 'editTender',
      component: require('@/views/Tender').default,
      props: true,
      beforeEnter: requireAuth,
    },
    {
      path: '/bids/:address',
      name: 'bid',
      component: require('@/views/Bid').default,
      props: true,
      beforeEnter: requireAuth,
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
