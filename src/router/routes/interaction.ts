export default {
  path: "/interaction",
  // component: () => import("views/HomePage.vue"),
  children: [
    {
      path: "classEvaluate",
      component: () => import("views/interaction/ClassEvaluate.vue"),
    },
    {
      path: "commentLib",
      component: () => import("views/interaction/CommentLib.vue"),
    },
    {
      path: "homeworkMgr",
      component: () => import("views/interaction/HomeworkMgr.vue"),
    },
    {
      path: "reportCard",
      component: () => import("views/interaction/ReportCard.vue"),
    },
    {
      path: "noticeMgr",
      component: () => import("views/interaction/NoticeMgr.vue"),
    },
  ],
};
