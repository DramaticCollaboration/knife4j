const headers = {
  namespaced: true,
  state: {
    userCurrent: {}
  },
  mutations: {
    SetCurrentUser: (state) => {
      state.userCurrent = {
        name: 'John Doe',
        avatar: ''
      }
    }
  },
  actions: {
    getCurrentUser({
      commit
    }) {
      commit("SetCurrentUser")
    }
  }

};

export default headers;
