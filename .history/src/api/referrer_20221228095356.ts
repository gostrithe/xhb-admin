import { doGet } from "./service/crud";

export const getEmployeeData = async () => {
  const res = await doGet("/referrer");
  return res;
};
export default { getEmployeeData };
