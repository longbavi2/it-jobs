import { get } from "../utils/request"

export const companyService =async ()=>{
    const dataCompany = await get("company");
    return dataCompany;
}
export const GetCompanyById=async(id)=>{
    const path = `company?id=${id}`;
    const dataCompany = await get(path);
    return dataCompany;
}
export const GetJobById=async(id)=>{
    const path = `jobs?idCompany=${id}`;
    const dataJobs = await get(path);
    return dataJobs;
}