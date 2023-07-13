import { post } from "../utils/request"

export const postCv =async(options)=>{
    const cv = await post("cv",options);
    return cv;
}