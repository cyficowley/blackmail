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
    uploadStatus: 0,
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
          const docData = { id: doc.id, ...doc.data() };
          docData.dueStamp = docData.dueStamp.toDate();
          deadlines.push(docData);
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

    async createDeadline({ commit, state }, deadline) {
      const { file } = deadline;
      const submittedDeadline = { ...deadline };
      delete submittedDeadline.file;
      try {
        const { id } = await fb.users.doc(state.currentUser.uid).collection('deadlines').add(submittedDeadline);
        submittedDeadline.id = id;
        const uploadPath = [state.currentUser.uid, id, 'blackmail', file.name].join('/');
        const fileRef = fb.storage.child(uploadPath);
        await fileRef.put(file);
        commit('addDeadlines', [submittedDeadline]);
        commit('updateUploadStatus', 1);
      } catch (error) {
        console.log(error);
        commit('updateUploadStatus', -1);
      }
    },

    updateUploadStatus({ commit }, payload) {
      console.log(payload.delay);
      if (payload.delay) {
        console.log('we delayed');
        setTimeout(() => commit('updateUploadStatus', payload.val), 3100);
      } else {
        commit('updateUploadStatus', payload.val);
      }
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
    updateUploadStatus(state, val) {
      state.uploadStatus = val;
      console.log('store');
      console.log(state.uploadStatus);
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
