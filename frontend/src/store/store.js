import Vue from 'vue';
import Vuex from 'vuex';

const fb = require('../plugins/firebase');

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    currentUser: null,
  },
  actions: {
  },
  mutations: {
    setCurrentUser(state, val) {
      state.currentUser = val;
    },
  },
});


fb.auth.onAuthStateChanged((user) => {
  if (user) {
    store.commit('setCurrentUser', user);
  }
});

export default store;
