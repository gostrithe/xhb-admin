import { doPost } from "./service/crud";

export const getreferrer = async (this.$data) => {
  const res = await doPost("/students");
  return res;
};
export default { getreferrer };
