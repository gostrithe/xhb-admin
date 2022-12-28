import { doPost } from "./service/crud";

export const getreferrer = async (data() {
    return {
        
    }
},) => {
  const res = await doPost("/students");
  return res;
};
export default { getreferrer };
