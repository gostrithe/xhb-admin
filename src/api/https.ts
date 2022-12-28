import $api from "./";

const dataToParam = (data: Object) =>
  Object.entries(data)
    .map((i) => i.join("="))
    .join("&");

// 以下编写请求，按模块划分请新建文件进行编写
export const doLogin = (data: { name: string; password: string }) =>
  $api.post("/authentication", { ...data, strategy: "local" });

export const getAllClass = () => $api.get("/classes");
export const getAllTeacher = () => $api.get("/employee-information");
export const addActiveStudent = (data) => $api.post("/actives", data);
export const editActiveStudent = (id, data) =>
  $api.patch("/actives/" + id, data);
export const getActiveStudent = (data) =>
  $api.get("/actives?" + dataToParam(data));
export const deleteActiveStudent = (id: string) =>
  $api.delete("/actives/" + id);
