import { get, post } from "../utils/request"

export const RegisterEmail = async (email) => {
    const path = `companys?email=${email}`
    const admin = await get(path);
    return admin;
}
export const RegisterPhone = async (phone) => {
    const path = `companys?phone=${phone}`
    const admin = await get(path);
    return admin;
}
export const createAdmin = async (options) => {
    const admin = await post("companys", options);
    return admin;
}