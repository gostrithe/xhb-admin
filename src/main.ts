import { createApp } from "vue";
import ElementPlus from "element-plus";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "element-plus/dist/index.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";

import "./assets/main.css";

const app = createApp(App);

app.use(router);
app.use(store);
app.use(ElementPlus, {
  locale: zhCn,
});

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.mount("#app");
