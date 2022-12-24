import { createStore } from "vuex";

export default createStore({
  state: {
    isCollapse: false,
  },
  getters: {},
  mutations: {
    setCollapse(state) {
      state.isCollapse = !state.isCollapse;
    },
  },
  actions: {},
  modules: {},
});
