import { post } from "../utils/request"

export const postCv = async (options) => {
    const cv = await post("cvs", options);
    return cv;
}