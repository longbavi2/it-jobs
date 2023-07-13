import { get } from "../utils/request"

export const getAllCity =async()=>{
    const data = await get("city");
    return data;
}