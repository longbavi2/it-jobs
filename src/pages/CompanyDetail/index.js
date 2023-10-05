import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetCompanyById, GetJobById } from "../../services/cpService";
import { Col, Row } from "antd";
import GoBack from "../../components/GoBack";
import JobItem from "../../components/JobItem";

function CompanyDetail() {
    const { id } = useParams();
    const [infoCompany, setInfoCompany] = useState({})
    const [jobs, setJobs] = useState([])
    useEffect(() => {
        const CompanyById = async () => {
            const dataCompanyById = await GetCompanyById(id);
            const dataJobById = await GetJobById(id);
            setJobs(dataJobById)
            setInfoCompany(...dataCompanyById)
        }
        CompanyById();
    }, [])

    return (
        <>
            <GoBack />

            {infoCompany && (<>
                <h1>{infoCompany.companyName}</h1>

                <div className="mb-20">
                    Địa chỉ: <strong>{infoCompany.address}</strong>
                </div>

                <div className="mb-20">
                    Số lượng nhân sự: <strong>{infoCompany.quantityPeople}</strong>
                </div>

                <div className="mb-20">
                    Thời gian làm việc: <strong>{infoCompany.workingTime}</strong>
                </div>

                <div className="mb-20">
                    Link website: <strong>{infoCompany.website}</strong>
                </div>

                <div className="mb-10">Mô tả ngắn:</div>
                <div className="mb-20">{infoCompany.description}</div>

                <div className="mb-10">Mô tả chi tiết:</div>
                <div className="mb-20">{infoCompany.detail}</div>

                <div className="mb-10">Danh sách các job:</div>
                <div className="mb-20">
                    <Row gutter={[20, 20]}>
                        {jobs.length > 0 ? (<>
                            {jobs.map(item => (
                                <Col span={8} key={item._id}>
                                    <JobItem item={item} />
                                </Col>
                            ))}
                        </>) : (<>Không có công việc nào</>)}
                    </Row>
                </div>
            </>
            )
            }
        </>
    )
}
export default CompanyDetail;