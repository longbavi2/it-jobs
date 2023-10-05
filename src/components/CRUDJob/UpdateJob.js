import { patch, put } from "../../utils/request"

export const updateJob = async (id, options) => {
    options.id = id
    const path = `jobs`;
    const respon = await put(path, options);
    return respon;
}