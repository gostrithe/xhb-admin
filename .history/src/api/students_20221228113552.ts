import { doPost } from "./service/crud";

export const poststudents = async (data: any) => {
  const res = await doPost("/students", data);
  return res;
};
export default { posttstudents };
