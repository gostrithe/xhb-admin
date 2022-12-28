import { doGet } from "./service/crud";

export const getStudents = async () => {
  const res = await doGet("/students");
  return res;
};
export default { getStudents };