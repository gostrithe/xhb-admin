export default {
  path: "/business",
  // component: () => import("views/HomePage.vue"),
  children: [
    {
      path: "studentRecord",
      component: () => import("views/business/StudentRecord.vue"),
    },
    {
      path: "trackLog",
      component: () => import("views/business/TrackLog.vue"),
    },
    {
      path: "tryClassLog",
      component: () => import("views/business/TryClassLog.vue"),
    },
    {
      path: "warningMgr",
      component: () => import("views/business/WarningMgr.vue"),
    },
  ],
};
