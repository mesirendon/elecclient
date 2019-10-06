import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

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
    },
    {
      path: '/bids/:address',
      name: 'bid',
      component: require('@/views/Bid').default,
      props: true,
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
