import { Card, Table } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ListJob, getJob } from "../../services/jobService";
import { getCvByIdTrue, pathCv } from "../../services/CvService";
import GoBack from "../GoBack";

function ViewCv() {
    const { id } = useParams();
    const [data, setData] = useState([]);
    useEffect(() => {
        const getDataCv = async () => {
            const dataCv = await getCvByIdTrue(id);
            const dataJob = await ListJob();
            const dataCvNew = {
                ...dataCv[0],
                statusRead: true
            }
            const respon = await pathCv(id, dataCvNew);
            const nameJob = dataJob.find(item => item.id === dataCv[0].idJob)
            const option = {
                ...dataCvNew[0],
                nameJob: nameJob.name
            }
            setData(option);
        }
        getDataCv();
    }, [])
    return (
        <> <GoBack />
            {data && (
                <Card title="Chi tiết Cv">
                    <div className="mb-10">
                        <strong>Tên : <span>{data.name}</span></strong>
                    </div>
                    <div className="mb-10">
                        <strong>Vị trí ứng tuyển : <span>{data.nameJob}</span></strong>
                    </div>
                    <div className="mb-10">
                        <strong>Thành phố : <span>{data.city}</span></strong>
                    </div>
                    <div className="mb-10">
                        <strong>Email : <span>{data.email}</span></strong>
                    </div>
                    <div className="mb-10">
                        <strong>Link Project : <span>{data.linkProject}</span></strong>
                    </div>
                    <div className="mb-10">
                        <strong>Ngày gửi : <span>{data.createAt}</span></strong>
                    </div>
                    <div className="mb-10">
                        <strong>Mô tả : <span>{data.description}</span></strong>
                    </div>
                </Card>
            )}
        </>
    )
}
export default ViewCv;
