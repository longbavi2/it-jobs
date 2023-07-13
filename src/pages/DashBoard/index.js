import { Card, Col, Row } from "antd";
import { useEffect, useState } from "react";
import { getCookie } from "../../helpers/cookie";
import { GetCompanyById } from "../../services/cpService";
import { getJob } from "../../services/jobService";
import { getCvById } from "../../services/CvService";

function DashBoard() {
    const [data, setData] = useState();
    const id = getCookie("id");
    const countArrJob = (arr) => {
        let count = 0;
        arr.forEach(item => {
            if (item.status === true) {
                count++;
            }
        });
        return count;
    }
    const countArrCv = (arr) => {
        let count = 0;
        arr.forEach(item => {
            if (item.statusRead === true) {
               count =  count++;
            }
        });
        return count;
    }
    useEffect(() => {
        const getData = async () => {
            const dataCompany = await GetCompanyById(id);
            const dataJob = await getJob(id);
            const dataCv = await getCvById(id);
            const obj = {
                ...dataCompany[0],
                quanTityJob :dataJob.length, 
                quanTityCv :dataCv.length, 
                openJob : countArrJob(dataJob),
                closeJob : dataJob.length - countArrJob(dataJob),
                cvTrue : countArrCv(dataCv),
                cvFalse : dataCv.length - countArrCv(dataCv),
            }
            setData(obj)
        }
        getData();
    }, [])
    return (
        <>
           {data && (
            <>
             <h2>
                Tổng quan
            </h2>
            <Row gutter={[12, 12]}>
                <Col span={8}>
                    <Card>
                        <div className="mb-20">
                            <strong>Job</strong>
                        </div>
                        <div className="mb-20">
                            <p>
                                Số lượng job : <strong>{data.quanTityJob}</strong>
                            </p>
                            <p>
                                Job đang bật : <strong>{data.openJob}</strong>
                            </p>
                            <p>
                                Job đang tắt: <strong>{data.closeJob}</strong>
                            </p>
                        </div>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <div className="mb-20">
                            <strong>CV</strong>
                        </div>
                        <div className="mb-20">
                            <p>
                                Số lượng CV : <strong>{data.quanTityCv}</strong>
                            </p>
                            <p>
                                Cv đã đọc : <strong>{data.cvTrue}</strong>
                            </p>
                            <p>
                                Cv chưa đọc : <strong>{data.cvFalse}</strong>
                            </p>
                        </div>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <div className="mb-20">
                            <strong>Thông tin công ty</strong>
                        </div>
                        <div className="mb-20">
                            <p>
                                Tên công ty : <strong>{data.companyName}</strong>
                            </p>
                            <p>
                                Email : <strong>{data.email}</strong>
                            </p>
                            <p>
                                Số điện thoại : <strong>{data.phone}</strong>
                            </p>
                            <p>
                                Số nhân viên  : <strong>{data.quantityPeople}</strong>
                            </p>
                        </div>
                    </Card>
                </Col>
            </Row>
            </>
           )}
        </>
    )
}
export default DashBoard;