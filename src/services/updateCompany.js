import { patch } from "../utils/request"

export const updateCompany=async(id,option)=>{
    const path =`company/${id}`;
    const respon = await patch(path,option);
    return respon;
}
// get thi se la ? con path put hay del thi / 