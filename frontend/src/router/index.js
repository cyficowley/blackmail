import Vue from 'vue';
import VueRouter from 'vue-router';
import firebase from 'firebase';
import Landing from '../views/Landing.vue';


Vue.use(VueRouter);

let isAdmin = false;

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: Landing,
  },
  {
    path: '/reset',
    name: 'Reset',
    component: () => import('../views/Reset.vue'),
  },
  {
    path: '/action',
    name: 'Action',
    component: () => import('../views/Action.vue'),
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
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/approval',
    name: 'Approval',
    meta: {
      requiresAdmin: true,
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Approval.vue'),
  },
];


firebase.auth().onAuthStateChanged(() => {
  isAdmin = false;
  if (firebase.auth().currentUser) {
    firebase.auth().currentUser.getIdTokenResult()
      .then((idTokenResult) => {
        if (idTokenResult.claims.admin) {
          isAdmin = true;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
});

const router = new VueRouter({
  routes,
});
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((x) => x.meta.requiresAuth);
  const requiresAdmin = to.matched.some((x) => x.meta.requiresAdmin);
  const { currentUser } = firebase.auth();


  if (requiresAdmin && !isAdmin) {
    next('/');
  } else if (requiresAuth && !currentUser) {
    next('/');
  } else if (to.name === 'Landing' && currentUser) {
    next('/home');
  } else {
    next();
  }
});


export default router;
