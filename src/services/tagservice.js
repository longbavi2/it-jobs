import { get } from "../utils/request"

export const TagService = async()=>{
    const dataTag = await get("tags");
    return dataTag;
}