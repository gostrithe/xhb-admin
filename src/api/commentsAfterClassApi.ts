import { doGet, doPost, doDelete, doPut } from "./service/crud";

export const fetchTableData = async (url: string) => {
  // @ts-ignore
  const res = await doGet(url);
  return res;
};

export const searchTableData = async (condition) => {
  let params = "";
  for (const key in condition) {
    if (condition[key] !== "") {
      params += `${key}=${condition[key]}&`;
    }
  }
  params = params.slice(0, -1);
  // console.log(params);

  const res = await doGet(`/evaluate-student?${params}`);
  return res;
};

export const getStudentTableData = async (classRecordId) => {
  const res = await doGet(
    `/teacher-evalute-student?classRecordId=${classRecordId}`
  );
  return res!.data;
};

export const fetchClassData = async () => {
  const res = await doGet("/classes");
  return res;
};

export const fetchTeacherData = async () => {
  const res = await doGet("/teachers");
  return res;
};

export const getClaseByCondition = async (condition, value) => {
  const res = await doGet(`/classes?${condition}=${value}`);
  return res;
};
export const getTeacherByCondition = async (condition, value) => {
  const res = await doGet(`/teachers?${condition}=${value}`);
  return res;
};

export const submitEvalute = async (data) => {
  const res = await doPost("/evalute-detail", data);
  return res;
};

export const getEvaluteDetail = async (id) => {
  const res = await doGet(`/evalute-detail?classRecordStudentId=${id}`);
  return res;
};

export const deleteEvaluteItem = async (id) => {
  const res = await doDelete(`/evalute-detail/${id}`);
  return res;
};

export const getCommentSentence = async () => {
  const res = await doGet("/comment-sentence");
  return res;
};

export const addCommentSentence = async (data) => {
  const res = await doPost("/comment-sentence", data);
  return res;
};

export const delCommentSentence = async (id) => {
  const res = await doDelete(`/comment-sentence/${id}`);
  return res;
};

// 更改评价数
export const updateEvaluateCount = async (id, data) => {
  const res = await doPut(`/teacher-evalute-student/${id}`, data);
  return res;
};

export default {
  updateEvaluateCount,
  delCommentSentence,
  addCommentSentence,
  getCommentSentence,
  submitEvalute,
  fetchTableData,
  getStudentTableData,
  fetchClassData,
  fetchTeacherData,
  getClaseByCondition,
  searchTableData,
  getEvaluteDetail,
  deleteEvaluteItem,
};
