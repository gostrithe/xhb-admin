import { doGet } from "./service/crud";

const getEmployeeData = async () => {
  await doGet(/employee-information);
};
