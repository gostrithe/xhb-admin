import { doGet } from "./service/crud";

export const fetchTableData = async (url: string) => {
  // @ts-ignore
  const res = await doGet(url);
  return res;
};

export default { fetchTableData };
