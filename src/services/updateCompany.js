import { patch, put } from "../utils/request"

export const updateCompany = async (options) => {
    const path = `companys`;
    const respon = await put(path, options);
    return respon;
}
