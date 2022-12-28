import { doPost } from "./service/crud";

export const posttstudents = async (data: any) => {
  const res = await doPost("/students", data);
  return res;
};
export default { getreferrer };
