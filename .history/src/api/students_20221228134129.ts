import { doPost } from "./service/crud";

interface mystudents {
  name: string;
  phone: string;
  phoneUser: string;
  sex: string;
  birthday: string;
  school: string;
  grade: string;
  source: string;
  referrer: string;
  altPhone: string;
  Reserve: string;
  address: string;
  level: string;
  follow: string;
  followMan: string;
  info: string;
  tag: Array<ANY>;
  remark: string;
  user: string;
  type: string;
}
export const postStudents = async (data: mystudents) => {
  const res = await doPost("/students", data);
  return res;
};
export default { postStudents };
