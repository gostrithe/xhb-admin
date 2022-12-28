import { doGet } from "./service/crud";

 const getreferrer = async () => {
  const res = await doGet("/referrer");
  return res;
};
export default { getreferrer };
