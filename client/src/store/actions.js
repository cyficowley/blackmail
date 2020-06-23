import router from '../router';

const Firebase = require('../plugins/firebase').default;

// User Actions

/**
 * Update Login Register Dialog
 * Opens or Closes Login/Register Dialog
 * @param {Object} context Vuex context
 * @param {Number} status 0: Close, 1: Login, 2: REgister
 */
const updateLoginRegisterDialogue = ({ commit }, status) => {
  commit('setloginRegisterDialogue', status);
};

/**
 * Sign User Out
 * @param {Object} context Vuex context
 */
const signOut = async ({ commit }) => {
  try {
    await Firebase.auth().signOut();
    commit('resetState');
    router.push('/');
  } catch (err) {
    console.error(err);
  }
};

// Deadline Actions

/*
  Deadline
    dueStamp: Date
    id: String
    name: String
    proofDescription: String
    proofItems: Array
      name: String
      url: String
    recipient: String
    sender: String
    status: ?
*/

/**
 * Create Deadline
 * Saves new deadline and uploads blackmail.
 * @param {Object} context Vuex context
 * @param {Object} deadline New deadline Object
 */
const createDeadline = async ({ commit, state }, deadline) => {
  // Converting deadline to valid type
  const { blackmail } = deadline;
  const submittedDeadline = {
    ...deadline,
    proofItems: [],
    status: 'Incomplete',
  };
  delete submittedDeadline.blackmail;

  try {
    const { uid } = state.currentUser;
    const { id } = await Firebase.users().doc(uid).collection('deadlines').add(submittedDeadline);

    const diff = Math.abs(submittedDeadline.dueStamp.getTime() - ((new Date()).getTime()));
    const MILLISEC_IN_DAY = 86400000;
    let needsReminderEmail = false;
    if (diff / MILLISEC_IN_DAY >= 2) {
      needsReminderEmail = true;
    }

    await Firebase.db().collection('expiring').add({
      uid,
      did: id,
      date: submittedDeadline.dueStamp,
      needsReminderEmail,
    });

    submittedDeadline.id = id;

    for (let i = 0; i < blackmail.files.length; i += 1) {
      const uploadPath = [uid, id, 'blackmail', blackmail.files[i].name].join('/');
      const fileRef = Firebase.storage().child(uploadPath);

      // eslint-disable-next-line no-await-in-loop
      await fileRef.put(blackmail.files[i]);
    }

    commit('addDeadlines', [submittedDeadline]);

    commit('setUploadStatus', 1);
  } catch (error) {
    console.error(error);
    commit('setUploadStatus', -1);
  }
};

/**
 * Get All Deadlines
 * @param {Object} context Vuex context
 */
const getAllDeadlines = async ({ commit, dispatch, state }) => {
  commit('setLoadingDeadlines', true);

  const { uid } = state.currentUser;
  if (!uid) {
    return;
  }

  const getDeadlines = Firebase.users().doc(uid).collection('deadlines');

  try {
    const deadlines = [];
    const snapshot = await getDeadlines.get();

    snapshot.forEach((doc) => {
      const docData = {
        id: doc.id,
        ...doc.data(),
      };
      docData.dueStamp = docData.dueStamp.toDate();
      docData.proofItems = [];

      deadlines.push(docData);
    });

    commit('addDeadlines', deadlines);

    commit('setLoadingDeadlines', false);

    deadlines.forEach((deadline) => {
      if (deadline.status === 'Pending' || deadline.status === 'Rejected') {
        dispatch('getDeadlineProofImage', deadline);
      }
    });
  } catch (err) {
    console.error(err);
  }
};

const getDeadlineProofImage = async ({ commit, state }, deadline) => {
  const { uid } = state.currentUser;
  const proofPath = [uid, deadline.id, 'proof'].join('/');

  const proofFiles = await Firebase.storage().child(proofPath).listAll();
  const fileURLs = [];
  const fileNames = [];
  proofFiles.items.forEach((file) => {
    fileURLs.push(file.getDownloadURL());
    fileNames.push(file.name);
  });

  await Promise.all(fileURLs);

  for (let i = 0; i < fileURLs.length; i += 1) {
    deadline.proofItems.push({ name: fileNames[i], url: fileURLs[i] });
  }

  commit('updateDeadline', deadline);
};

const uploadDeadlineProof = async ({ state, dispatch, commit }, {
  id, file, date, proofItems,
}) => {
  const { uid } = state.currentUser;
  const uploadPath = [uid, id, 'proof', file.name].join('/');

  const fileRef = Firebase.storage().child(uploadPath);
  try {
    // making sure that deadline is not already sent
    const deadline = (await Firebase.users().doc(uid).collection('deadlines').doc(id)
      .get()).data();
    if (deadline.status === 'Blackmailed') {
      commit('updateDeadline', { id, status: deadline.status });
      return;
    }

    // upload status to firebase
    dispatch('updateDeadline', { id, status: 'Pending' });

    await fileRef.put(file);
    const url = await fileRef.getDownloadURL();

    proofItems.push({ name: file.name, url: { i: url } });

    // keep proof items local
    commit('updateDeadline', { id, proofItems });

    if (deadline.status === 'Incomplete') {
      await Firebase.db().collection('approvals').add({
        uid, did: id, date,
      });
    }

    const expiringRef = Firebase.db().collection('expiring');
    const snapshot = await expiringRef.where('uid', '==', uid).where('did', '==', id).get();
    snapshot.forEach((doc) => {
      doc.ref.delete();
    });
  } catch (error) {
    console.error(error);
  }
};

const deleteDeadline = async ({ commit, state }, { id }) => {
  const { uid } = state.currentUser;
  const pointer = await Firebase.users().doc(uid).collection('deadlines').doc(id)
    .get();
  const deadline = pointer.data();
  deadline.id = id;
  if (deadline.status === 'Blackmailed' || deadline.status === 'Approved') {
    pointer.ref.delete();
    commit('deleteDeadline', { id });
  }
};

const updateDeadline = async ({ commit, state }, deadline) => {
  const ref = Firebase.users().doc(state.currentUser.uid).collection('deadlines').doc(deadline.id);
  try {
    await ref.update(deadline);
    commit('updateDeadline', deadline);
  } catch (error) {
    console.error(error);
  }
};

// Approval Actions

const getAllApprovals = async ({ commit }) => {
  const snapshot = await Firebase.db().collection('approvals').get();
  const approvals = [];
  snapshot.forEach((doc) => {
    const docData = {
      id: doc.id,
      ...doc.data(),
      proofDescription: '',
      name: '',
      fileDetails: [],
    };
    docData.date = docData.date.toDate();
    approvals.push(docData);
  });
  commit('addApprovals', approvals);
};

const getApprovalDetails = async ({ commit }, { id, did, uid }) => {
  const approvalDetails = { id, fileDetails: [] };

  const deadline = (await Firebase.users().doc(uid).collection('deadlines').doc(did)
    .get()).data();

  approvalDetails.proofDescription = deadline.proofDescription;
  approvalDetails.name = deadline.name;


  const path = [uid, did, 'proof'].join('/');
  const files = await Firebase.storage().child(path).listAll();

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
};

const approveApproval = async ({ dispatch }, { id, did, uid }) => {
  const ref = Firebase.users().doc(uid).collection('deadlines').doc(did);
  try {
    await ref.update({ status: 'Approved' });
    dispatch('removeApproval', { id });
    dispatch('deleteStorage', { did, uid });
  } catch (error) {
    console.error(error);
  }
};

const denyApproval = async ({ dispatch }, {
  id, did, uid, date,
}) => {
  const updatedDate = new Date();
  updatedDate.setDate(updatedDate.getDate() + 1);
  if (date.getTime() > updatedDate.getTime()) {
    updatedDate.setTime(date);
  }
  const ref = Firebase.users().doc(uid).collection('deadlines').doc(did);
  try {
    let needsReminderEmail = true;

    const diff = Math.abs(updatedDate.getTime() - (new Date()).getTime());
    if (diff / (1000 * 60 * 60 * 24) < 2) {
      needsReminderEmail = false;
    }

    await Firebase.db().collection('expiring').add({
      uid, did, date: updatedDate, needsReminderEmail,
    });
    await ref.update({ status: 'Rejected', dueStamp: updatedDate });
    dispatch('removeApproval', { id });
  } catch (error) {
    console.error(error);
  }
};

const removeApproval = async ({ commit }, { id }) => {
  const ref = Firebase.db().collection('approvals').doc(id);
  try {
    await ref.delete();
    commit('deleteApproval', { id });
  } catch (error) {
    console.error(error);
  }
};

// Misc Actions

const deleteStorage = async (_, { did, uid }) => {
  const blackmailPath = [uid, did, 'blackmail'].join('/');
  const proofPath = [uid, did, 'proof'].join('/');

  const blackmailFiles = await Firebase.storage().child(blackmailPath).listAll();
  const proofFiles = await Firebase.storage().child(proofPath).listAll();

  const deletionPromises = [];
  [...blackmailFiles.items, ...proofFiles.items].forEach((file) => {
    deletionPromises.push(file.delete());
  });

  await Promise.all(deletionPromises);
};

const updateUploadStatus = ({ commit }, payload) => {
  if (payload.delay) {
    setTimeout(() => commit('setUploadStatus', payload.val), 3100);
  } else {
    commit('setUploadStatus', payload.val);
  }
};

export default {
  getAllDeadlines,
  getDeadlineProofImage,
  denyApproval,
  approveApproval,
  deleteStorage,
  removeApproval,
  getAllApprovals,
  getApprovalDetails,
  uploadDeadlineProof,
  createDeadline,
  deleteDeadline,
  updateUploadStatus,
  updateDeadline,
  signOut,
  updateLoginRegisterDialogue,
};
