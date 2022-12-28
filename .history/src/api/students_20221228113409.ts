import { doPost } from "./service/crud";

export const getreferrer = async (data) => {
  const res = await doPost("/students",data);
  return res;
};
export default { getreferrer };
