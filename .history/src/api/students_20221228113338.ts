import { doPost } from "./service/crud";

export const getreferrer = async (dt) => {
  const res = await doPost("/students");
  return res;
};
export default { getreferrer };
