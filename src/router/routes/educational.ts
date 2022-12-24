export default {
  path: "/educational",
  // component: () => import("views/HomePage.vue"),
  children: [
    {
      path: "studentMgr",
      component: () => import("@/views/educational/studentMgr/IndexPage.vue"),
    },
    {
      path: "classMgr",
      component: () => import("@/views/educational/classMgr/IndexPage.vue"),
    },
    {
      path: "timetableMgr",
      component: () => import("views/educational/TimetableMgr.vue"),
    },
    {
      path: "courseMgr",
      component: () => import("views/educational/CourseMgr.vue"),
    },
    {
      path: "teacherMgr",
      component: () => import("views/educational/TeacherMgr.vue"),
    },
    {
      path: "classRecord",
      component: () => import("@/views/educational/ClassRecord.vue"),
    },
    {
      path: "clockMgr",
      component: () => import("@/views/educational/ClockMgr.vue"),
    },
  ],
};
