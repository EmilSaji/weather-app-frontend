import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

export default createStore({
  plugins: [createPersistedState()],
  state: {
    user: {
      id: "",
      username: "",
    },
    location: {
      latitude: "",
      longitude: "",
      apiKey: "",
    },
  },
  mutations: {
    updateUser(state, userData) {
      state.user = userData;
    },
    updateLocation(state, locationData) {
      state.location = locationData;
    },
  },
  actions: {},
  getters: {},
});
