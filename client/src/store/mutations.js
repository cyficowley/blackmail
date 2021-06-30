// User Mutations

const setloginRegisterDialogue = (state, status) => {
  state.loginRegisterDialogue = status;
};

const setCurrentUser = (state, user) => {
  state.currentUser = user;
  if (state.loginRegisterDialogue) {
    state.loginRegisterDialogue = 0;
  }
};

const getDefaultState = () => ({
  currentUser: null,
  deadlines: [],
  approvals: [],
  loadingDeadlines: true,
  uploadStatus: 0,
  loginRegisterDialogue: false,
});

const resetState = (state) => {
  Object.assign(state, getDefaultState());
};

// Deadline Mutations

const setLoadingDeadlines = (state, status) => {
  state.loadingDeadlines = status;
};

// Will break if new properties are added (https://vuejs.org/v2/guide/reactivity.html#Change-Detection-Caveats)
const updateDeadline = (state, newDeadline) => {
  const objIndex = state.deadlines.findIndex(((obj) => obj.id === newDeadline.id));
  Object.assign(state.deadlines[objIndex], newDeadline);
};

const deleteDeadline = (state, deadline) => {
  const objIndex = state.deadlines.findIndex(((obj) => obj.id === deadline.id));
  state.deadlines.splice(objIndex, 1);
};

const addDeadlines = (state, newDeadlines) => {
  newDeadlines.forEach((deadline) => {
    state.deadlines.push(deadline);
  });
};

// Approval Mutations

const addApprovals = (state, newApprovals) => {
  newApprovals.forEach((approval) => {
    state.approvals.push(approval);
  });
};

// Will break if new properties are added (https://vuejs.org/v2/guide/reactivity.html#Change-Detection-Caveats)
const updateApproval = (state, newApproval) => {
  const objIndex = state.approvals.findIndex(((obj) => obj.id === newApproval.id));
  Object.assign(state.approvals[objIndex], newApproval);
};

const deleteApproval = (state, { id }) => {
  const objIndex = state.approvals.findIndex(((obj) => obj.id === id));
  state.approvals.splice(objIndex);
};

// Upload Status Mutations

const setUploadStatus = (state, status) => {
  state.uploadStatus = status;
};

module.exports = {
  setCurrentUser,
  resetState,
  setLoadingDeadlines,
  setUploadStatus,
  updateDeadline,
  deleteDeadline,
  addDeadlines,
  addApprovals,
  updateApproval,
  deleteApproval,
  setloginRegisterDialogue,
};
