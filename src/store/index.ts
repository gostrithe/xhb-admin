import { createStore } from "vuex";
import flatMenu from "@/menu/flatMenu";

export default createStore({
  state: {
    isCollapse: false,
    currentPage: "首页",
  },
  getters: {},
  mutations: {
    setCollapse(state) {
      state.isCollapse = !state.isCollapse;
    },
    setCurrentPage(state, payload) {
      const current = flatMenu.find((item) => item.path === payload)!;
      state.currentPage = current.label;
    },
  },
  actions: {},
  modules: {},
});
