import { doGet } from "./service/crud";

export const getEmployeeData = async (url: string) => {
  const res = await doGet("/employee-information");
  return res;
};
export default { getEmployeeData };
