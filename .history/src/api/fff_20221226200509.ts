import { doGet } from "./service/crud";

export default const getEmployeeData = async () => {
  const res = await doGet("/employee-information");
  console.log("res", res);
  return res;
};
export default { getEmployeeData };
