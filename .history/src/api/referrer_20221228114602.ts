import { doGet } from "./service/crud";

export const getreferrer = async () => {
  const res = await doGet("/referrer");
  return res;
};
export default { getreferrer };
