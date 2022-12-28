import { doGet } from "./service/crud";

const getEmployeeData = async () => {
 const res = await doGet("/employee-information");
 console.log(res);
 
};
