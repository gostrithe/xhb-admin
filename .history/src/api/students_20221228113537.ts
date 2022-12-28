import { doPost } from "./service/crud";

export const getstudents = async (data: any) => {
  const res = await doPost("/students", data);
  return res;
};
export default { getreferrer };
