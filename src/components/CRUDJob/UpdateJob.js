import { patch } from "../../utils/request"

export const updateJob = async(id,options)=>{
    const path = `jobs/${id}`;
    const respon = await patch(path,options);
    return respon;
}