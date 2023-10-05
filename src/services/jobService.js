import { del, get, post } from "../utils/request"

export const ListJob = async () => {
    const dataJob = await get("jobs");
    return dataJob;
}
export const getJobById = async (id) => {
    const path = `jobs?_id=${id}`;
    const dataJob = await get(path);
    return dataJob;
}
export const getJob = async (id) => {
    const path = `jobs?idCompany=${id}`;
    const dataJob = await get(path);
    return dataJob;
}
export const postJob = async (options) => {
    const respon = await post(`jobs`, options);
    return respon;
}
export const delJob = async (id, options) => {
    const path = `jobs`
    const respon = await del(path, options);
    return respon;
}