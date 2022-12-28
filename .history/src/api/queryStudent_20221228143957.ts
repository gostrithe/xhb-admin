import { doGet } from "./service/crud";

export const getstudents = async () => {
  const res = await doGet("/students");
  return res;
};
export default { getreferrer };