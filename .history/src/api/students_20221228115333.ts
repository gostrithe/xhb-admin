import { doPost } from "./service/crud";

interface mystudents {
  name: string;
  phone: string
  phoneUser: string;
  sex: "";
  birthday: "";
  school: "";
  grade: "";
  source: "";
  referrer: "";
  altPhone: "";
  Reserve: "";
  address: "";
  level: "";
  follow: "";
  followMan: "";
  info: "";
  tag: "";
  remark: "";
  user: "";
  type: "";
}
export const postStudents = async (data: mystudents) => {
  const res = await doPost("/students", data);
  return res;
};
export default { postStudents };
