import { doPost } from "./service/crud";

export const getreferrer = async (dat) => {
  const res = await doPost("/students");
  return res;
};
export default { getreferrer };
