import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import locale from "element-plus/lib/locale/lang/zh-cn";
import "./assets/main.css";

const app = createApp(App);

app.use(router);
app.use(store);
app.use(ElementPlus);
app.use(ElementPlus, { locale });

app.mount("#app");
