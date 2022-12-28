import { doGet } from "./service/crud";

export const getreferrer = async () => {
  const res = await doGet("/students");
  return res;
};
export default { getreferrer };