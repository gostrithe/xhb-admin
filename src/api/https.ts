import $api from "./";

// 以下编写请求，按模块划分请新建文件进行编写
export const doLogin = (data: { name: string; password: string }) =>
  $api.post("/authentication", { ...data, strategy: "local" });
