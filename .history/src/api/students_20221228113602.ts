import { doPost } from "./service/crud";

export const postStudents = async (data: any) => {
  const res = await doPost("/students", data);
  return res;
};
export default { poststudents };