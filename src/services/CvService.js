import { del, get, patch } from "../utils/request"

export const getCvById = async (id) => {
    const path = `cv?idCompany=${id}`
    const data = await get(path);
    return data;
}
export const getCvByIdTrue = async (id) => {
    const path = `cv?id=${id}`
    const data = await get(path);
    return data;
}
export const delCv = async (id) => {
    const path = `cv/${id}`
    const respon = await del(path);
    return respon;
}
export const pathCv = async (id, options) => {
    const path = `cv/${id}`
    const respon = await patch(path, options)
    return respon;
}