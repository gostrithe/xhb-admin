import { doGet } from "./service/crud";

export const getEmployeeData = async () => {
  const res = await doGet("/employee-information");
  return res.dataa;
};
export default { getEmployeeData };
