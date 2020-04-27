import Vue from 'vue';
import Vuex from 'vuex';
import router from '../router';

const fb = require('../plugins/firebase');

Vue.use(Vuex);

const getDefaultState = () => ({
  currentUser: null,
  deadlines: [],
  approvals: [],
  loadingDeadlines: true,
  uploadStatus: 0,
});

const store = new Vuex.Store({
  state: getDefaultState(),

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
        console.error(err);
      }
    },

    async getAllApprovals({ commit }) {
      const snapshot = await fb.db.collection('approvals').get();
      const approvals = [];
      snapshot.forEach((doc) => {
        const docData = {
          id: doc.id,
          ...doc.data(),
          proofDescription: '',
          name: '',
          fileDetails: [],
        };
        docData.dueStamp = docData.date.toDate();
        approvals.push(docData);
      });
      commit('addApprovals', approvals);
    },

    async getApprovalDetails({ commit }, { id, did, uid }) {
      const approvalDetails = { id, fileDetails: [] };

      const deadline = (await fb.users.doc(uid).collection('deadlines').doc(did).get()).data();

      approvalDetails.proofDescription = deadline.proofDescription;
      approvalDetails.name = deadline.name;


      const path = [uid, did, 'proof'].join('/');
      const files = await fb.storage.child(path).listAll();

      const fileURLs = [];
      const fileNames = [];
      files.items.forEach((file) => {
        fileURLs.push(file.getDownloadURL());
        fileNames.push(file.name);
      });

      await Promise.all(fileURLs);

      for (let i = 0; i < fileURLs.length; i += 1) {
        approvalDetails.fileDetails.push({ name: fileNames[i], url: fileURLs[i] });
      }


      commit('updateApproval', approvalDetails);
    },

    async uploadDeadlineProof({ state, dispatch }, { id, file, date }) {
      const { uid } = state.currentUser;
      const uploadPath = [uid, id, 'proof', file.name].join('/');

      const fileRef = fb.storage.child(uploadPath);
      try {
        await fileRef.put(file);
        dispatch('updateDeadline', { id, status: 'Pending' });

        await fb.db.collection('approvals').add({ uid, did: id, date });

        const expiringRef = fb.db.collection('expiring');
        const snapshot = await expiringRef.where('uid', '==', uid).where('did', '==', id).get();
        snapshot.forEach((doc) => {
          doc.ref.delete();
        });
      } catch (error) {
        console.error(error);
      }
    },

    async createDeadline({ commit, state }, deadline) {
      const { file } = deadline;
      const submittedDeadline = { ...deadline };
      delete submittedDeadline.file;
      try {
        const { uid } = state.currentUser;
        const { id } = await fb.users.doc(uid).collection('deadlines').add(submittedDeadline);
        await fb.db.collection('expiring').add({ uid, did: id, date: submittedDeadline.dueStamp });
        submittedDeadline.id = id;
        const uploadPath = [uid, id, 'blackmail', file.name].join('/');
        const fileRef = fb.storage.child(uploadPath);
        await fileRef.put(file);
        commit('addDeadlines', [submittedDeadline]);
        commit('updateUploadStatus', 1);
      } catch (error) {
        console.error(error);
        commit('updateUploadStatus', -1);
      }
    },

    updateUploadStatus({ commit }, payload) {
      if (payload.delay) {
        setTimeout(() => commit('updateUploadStatus', payload.val), 3100);
      } else {
        commit('updateUploadStatus', payload.val);
      }
    },

    async updateDeadline({ commit, state }, deadline) {
      const ref = fb.users.doc(state.currentUser.uid).collection('deadlines').doc(deadline.id);
      try {
        await ref.update(deadline);
        commit('updateDeadline', deadline);
      } catch (error) {
        console.error(error);
      }
    },

    async signOut({ commit }) {
      try {
        await fb.auth.signOut();
        commit('resetState');
        router.push('/');
      } catch (err) {
        console.error(err);
      }
    },

  },
  mutations: {
    setCurrentUser(state, val) {
      state.currentUser = val;
    },

    resetState(state) {
      Object.assign(state, getDefaultState());
    },

    setLoadingDeadlines(state, val) {
      state.loadingDeadlines = val;
    },
    updateUploadStatus(state, val) {
      state.uploadStatus = val;
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

    addApprovals(state, newApprovals) {
      newApprovals.forEach((approval) => {
        state.approvals.push(approval);
      });
    },

    updateApproval(state, newApproval) {
      // Will break if new properties are added (https://vuejs.org/v2/guide/reactivity.html#Change-Detection-Caveats)
      const objIndex = state.approvals.findIndex(((obj) => obj.id === newApproval.id));
      Object.assign(state.approvals[objIndex], newApproval);
    },
  },
});

fb.auth.onAuthStateChanged((user) => {
  if (user) {
    store.commit('setCurrentUser', user);
  }
});

export default store;
