import { get } from "../utils/request"

export const getAllCity = async () => {
    const data = await get("citys");
    return data;
}