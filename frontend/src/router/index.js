import Vue from 'vue';
import VueRouter from 'vue-router';
import firebase from 'firebase';
import Landing from '../views/Landing.vue';

Vue.use(VueRouter);


const routes = [
  {
    path: '/',
    name: 'Landing',
    component: Landing,
  },
  {
    path: '/home',
    name: 'Home',
    meta: {
      requiresAuth: true,
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
  },
];

const router = new VueRouter({
  routes,
});
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((x) => x.meta.requiresAuth);
  const { currentUser } = firebase.auth();

  if (requiresAuth && !currentUser) {
    next('/');
  } else if (to.name === 'Landing' && currentUser) {
    next('/home');
  } else {
    next();
  }
});


export default router;
