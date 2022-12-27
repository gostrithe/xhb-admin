import { doGet } from "./service/crud";

const getEmployeeData = async () => {
  const res = await doGet("/employee-information");
        re console.log("res", res);
};
