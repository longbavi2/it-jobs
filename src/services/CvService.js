import { del, get, patch, put } from "../utils/request"

export const getCvById = async (id) => {
    const path = `cvs?idCompany=${id}`
    const data = await get(path);
    return data;
}
export const getCvByIdTrue = async (id) => {
    const path = `cvs?_id=${id}`
    const data = await get(path);
    return data;
}
export const delCv = async (options) => {
    const path = `cvs`
    const respon = await del(path, options);
    return respon;
}
export const pathCv = async (id, options) => {
    const path = `cvs`
    options.id = id
    const respon = await put(path, options)
    return respon;
}