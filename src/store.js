import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

export default createStore({
  plugins: [createPersistedState()],
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
