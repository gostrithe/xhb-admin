import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import { useStore } from "vuex";
import LayoutFrame from "components/layout/LayoutFrame.vue";
import frameIn from "./frameIn";
import frameOut from "./frameOut";

const store = useStore();

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/login",
    component: LayoutFrame,
    children: [...frameIn],
  },
  ...frameOut,
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
