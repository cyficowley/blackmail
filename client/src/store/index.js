import Vue from 'vue';
import Vuex from 'vuex';


import mutations from './mutations';
import actions from './actions';


const Firebase = require('../plugins/firebase');

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    currentUser: null,
    deadlines: [],
    approvals: [],
    loadingDeadlines: true,
    uploadStatus: 0,
    loginRegisterDialogue: 0,
  },
  mutations,
  actions,
});

Firebase.default.auth().onAuthStateChanged((user) => {
  if (user) {
    store.commit('setCurrentUser', user);
  }
});

export default store;
