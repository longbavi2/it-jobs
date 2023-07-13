import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetCompanyById, GetJobById } from "../../services/cpService";
import { Col, Row } from "antd";
import GoBack from "../../components/GoBack";
import JobItem from "../../components/JobItem";

function CompanyDetail() {
    const { id } = useParams();
    const [infoCompany, setInfoCompany] = useState([])
    const [jobs, setJobs] = useState([])
    useEffect(() => {
        const CompanyById = async () => {
            const dataCompanyById = await GetCompanyById(id);
            setInfoCompany(dataCompanyById)
        }
        CompanyById();
    }, [])
    useEffect(() => {
        const JobById = async () => {
            const dataJobById = await GetJobById(id);
            setJobs(dataJobById)
        }
        JobById();
    }, [])
    return (
        <>
            <GoBack />

            {infoCompany.length > 0 ? (<>
                <h1>{infoCompany[0].companyName}</h1>

                <div className="mb-20">
                    Địa chỉ: <strong>{infoCompany[0].address}</strong>
                </div>

                <div className="mb-20">
                    Số lượng nhân sự: <strong>{infoCompany[0].quantityPeople}</strong>
                </div>

                <div className="mb-20">
                    Thời gian làm việc: <strong>{infoCompany[0].workingTime}</strong>
                </div>

                <div className="mb-20">
                    Link website: <strong>{infoCompany[0].website}</strong>
                </div>

                <div className="mb-10">Mô tả ngắn:</div>
                <div className="mb-20">{infoCompany[0].description}</div>

                <div className="mb-10">Mô tả chi tiết:</div>
                <div className="mb-20">{infoCompany[0].detail}</div>

                <div className="mb-10">Danh sách các job:</div>
                <div className="mb-20">
                    <Row gutter={[20, 20]}>
                        {jobs.length > 0 ? (<>
                            {jobs.map(item => (
                                <Col span={8} key={item.id}>
                                    <JobItem item={item} />
                                </Col>
                            ))}
                        </>) : (<>Không có công việc nào</>)}
                    </Row>
                </div>
            </>

            ) : (<></>)
            }
        </>
    )
}
export default CompanyDetail;