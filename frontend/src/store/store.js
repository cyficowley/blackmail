import Vue from 'vue';
import Vuex from 'vuex';
import router from '../router';

const fb = require('../plugins/firebase');

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    currentUser: null,
    deadlines: [],
    loadingDeadlines: true,
  },

  actions: {
    async getAllDeadlines({ commit, state }) {
      commit('setLoadingDeadlines', true);
      const { uid } = state.currentUser;
      if (!uid) {
        return;
      }

      const getDeadlines = fb.users.doc(uid).collection('deadlines');

      try {
        const deadlines = [];
        const snapshot = await getDeadlines.get();
        snapshot.forEach((doc) => {
          deadlines.push({ id: doc.id, ...doc.data() });
        });
        this.loading = false;
        this.deadlines = deadlines;

        commit('addDeadlines', deadlines);
        commit('setLoadingDeadlines', false);
      } catch (err) {
        console.log(err);
      }
    },

    async uploadDeadlineProof({ state, dispatch }, { id, file }) {
      const uploadPath = [state.currentUser.uid, id, 'proof', file.name].join('/');

      const fileRef = fb.storage.child(uploadPath);
      try {
        await fileRef.put(file);
        dispatch('updateDeadline', { id, status: 'approving' });
      } catch (error) {
        console.log(error);
      }
    },
    // commit mutation dispatch action
    async createDeadline({ commit, state }, deadline) {
      commit('addDeadlines', [deadline]);
      fb.users.doc(state.currentUser.uid).collection('deadlines').add(deadline);
    },


    async updateDeadline({ commit, state }, deadline) {
      console.log(state.currentUser.uid);
      console.log(deadline);
      const ref = fb.users.doc(state.currentUser.uid).collection('deadlines').doc(deadline.id);
      try {
        await ref.update(deadline);
        commit('updateDeadline', deadline);
      } catch (error) {
        console.log(error);
      }
    },

    async signOut({ commit }) {
      try {
        await fb.auth.signOut();
        commit('setCurrentUser', undefined);
        router.push('/');
      } catch (err) {
        console.log(err);
      }
    },

  },
  mutations: {
    setCurrentUser(state, val) {
      state.currentUser = val;
    },

    setLoadingDeadlines(state, val) {
      state.loadingDeadlines = val;
    },

    updateDeadline(state, newDeadline) {
      // Will break if new properties are added (https://vuejs.org/v2/guide/reactivity.html#Change-Detection-Caveats)
      const objIndex = state.deadlines.findIndex(((obj) => obj.id === newDeadline.id));
      Object.assign(state.deadlines[objIndex], newDeadline);
    },

    addDeadlines(state, newDeadlines) {
      newDeadlines.forEach((deadline) => {
        state.deadlines.push(deadline);
      });
    },
  },
});

fb.auth.onAuthStateChanged((user) => {
  if (user) {
    store.commit('setCurrentUser', user);
  }
});

export default store;
