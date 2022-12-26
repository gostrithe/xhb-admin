import { doGet } from "./service/crud";

const getEmployeeData = async () => {
 const= await doGet("/employee-information");
};
