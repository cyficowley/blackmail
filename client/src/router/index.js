import Vue from 'vue';
import VueRouter from 'vue-router';
import Firebase from '../plugins/firebase';

import Landing from '../views/public/Landing.vue';

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
    component: () => import('../views/public/Reset.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/public/About.vue'),
  },
  {
    path: '/action',
    name: 'Action',
    component: () => import('../views/public/Action.vue'),
  },
  {
    path: '/verificationWaiting',
    name: 'VerificationWaiting',
    meta: {
      requiresUnverified: true,
    },
    component: () => import('../views/user/VerificationWaiting.vue'),
  },
  {
    path: '/home',
    name: 'Home',
    meta: {
      requiresAuth: true,
    },
    component: () => import('../views/user/Home.vue'),
  },
  {
    path: '/approval',
    name: 'Approval',
    meta: {
      requiresAdmin: true,
    },
    component: () => import('../views/admin/Approval.vue'),
  },
];

Firebase.auth().onAuthStateChanged(() => {
  isAdmin = false;
  if (Firebase.currentUser()) {
    Firebase.currentUser().getIdTokenResult()
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
  const requiresUnverified = to.matched.some((x) => x.meta.requiresUnverified);
  const currentUser = Firebase.currentUser();

  console.log(currentUser);

  if (requiresAdmin && !isAdmin) {
    next('/');
  } else if (requiresAuth && (!currentUser || !currentUser.emailVerified)) {
    next('/');
  } else if (requiresUnverified && (currentUser && currentUser.emailVerified)) {
    next('/home?snackbar=emailVerified');
  } else {
    next();
  }
});

export default router;
