import type { MenuItem } from "./";

const flatMenu: Array<MenuItem> = [
  { path: "/index", label: "首页", icon: "", parent: "" },
  { path: "/business", label: "业务中心", icon: "", parent: "" },
  {
    path: "/business/studentRecord",
    label: "学生档案",
    icon: "",
    parent: "/business",
  },
  {
    path: "/business/trackLog",
    label: "跟进记录",
    icon: "",
    parent: "/business",
  },
  {
    path: "/business/tryClassLog",
    label: "试听纪录",
    icon: "",
    parent: "/business",
  },
  {
    path: "/business/warningMgr",
    label: "预警提示",
    icon: "",
    parent: "/business",
  },
  { path: "/educational", label: "教务中心", icon: "", parent: "" },
  {
    path: "/educational/studentMgr",
    label: "学生管理",
    icon: "",
    parent: "/educational",
  },
  {
    path: "/educational/classMgr",
    label: "班级管理",
    icon: "",
    parent: "/educational",
  },
  {
    path: "/educational/timetableMgr",
    label: "课表管理",
    icon: "",
    parent: "/educational",
  },
  {
    path: "/educational/courseMgr",
    label: "课程管理",
    icon: "",
    parent: "/educational",
  },
  {
    path: "/educational/teacherMgr",
    label: "老师管理",
    icon: "",
    parent: "/educational",
  },
  {
    path: "/educational/classRecord",
    label: "上课记录",
    icon: "",
    parent: "/educational",
  },
  {
    path: "/educational/clockMgr",
    label: "学员考勤",
    icon: "",
    parent: "/educational",
  },
  { path: "/interaction", label: "家校互动", icon: "", parent: "" },
  {
    path: "/interaction/classEvaluate",
    label: "课后点评",
    icon: "",
    parent: "/interaction",
  },
  {
    path: "/interaction/homeworkMgr",
    label: "课后作业",
    icon: "",
    parent: "/interaction",
  },
  {
    path: "/interaction/reportCard",
    label: "成绩单",
    icon: "",
    parent: "/interaction",
  },
  {
    path: "/interaction/noticeMgr",
    label: "通知管理",
    icon: "",
    parent: "/interaction",
  },
];

export default flatMenu;
