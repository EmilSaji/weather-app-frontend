import { createStore } from "vuex";

export default createStore({
  state: {
    user: {
      id: "",
      username: "",
    },
  },
  mutations: {
    updateUser(state, userData) {
      state.user = userData;
    },
  },
  actions: {},
  getters: {},
});
