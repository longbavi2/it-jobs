import { get } from "../utils/request"

export const LoginService = async (path) => {
    const admin = await get(`companys?${path}`);
    return admin;
}