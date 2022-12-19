import business from "./routes/business";
import educational from "./routes/educational";
import interaction from "./routes/interaction";

export default [
  {
    name: "index",
    path: "/index",
    component: () => import("views/HomePage.vue"),
  },
  { ...business },
  { ...educational },
  { ...interaction },
];
