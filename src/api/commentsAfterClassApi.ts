import { doGet, doPost } from "./service/crud";

export const fetchTableData = async (url: string) => {
  // @ts-ignore
  const res = await doGet(url);
  return res;
};

export const getStudentTableData = async (classRecordId) => {
  const res = await doPost(
    "https://apipxb.yunvip123.com/api/interaction/teacherClassRecordEvaluateStudent",
    {
      classRecordId: classRecordId,
    },
    {
      headers: {
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJldG1zX3VzZXIiOiIxMTI5OSwxNTM3OCwxNjcxNDg2ODc5IiwiZXhwIjoxNjc5MjM0MDc5LCJpc3MiOiJ3d3cuNjF2aXAuY24iLCJhdWQiOiJldG1zX3VzZXIifQ.4Ke0AB8owG2KQY4hFfhRsNTpxBD2DW4bf1On-2XjRGY",
      },
    }
  );
  return res;
};

export default {
  fetchTableData,
  getStudentTableData,
};
