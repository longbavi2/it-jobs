import { Card, Col, Row } from "antd";
import { useEffect, useState } from "react";
import { companyService } from "../../services/cpService";
import { Link } from "react-router-dom";
import GoBack from "../GoBack";

function Company() {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchApi = async () => {
            const response = await companyService();
            if (response) {
                setData(response);
            }
        };
        fetchApi();
    }, []);
    return (
        <>
            <div className="mb-10">
                <GoBack />
            </div>
            <h1>Danh sách công ty</h1>

            <Row gutter={[20, 20]}>
                {data.map((item) => (
                    <Col span={8} key={item._id}>
                        <Link to={`/company/${item._id}`}>
                            <Card>
                                <div className="mb-10">
                                    Công ty: <strong>{item.companyName}</strong>
                                </div>
                                <div className="mb-10">
                                    Số điện thoại: <strong>{item.phone}</strong>
                                </div>
                                <div className="mb-10">
                                    Số nhân sự: <strong>{item.quantityPeople}</strong>
                                </div>
                                <div className="mb-10">
                                    Website: <strong>{item.website}</strong>
                                </div>
                                <div className="mb-10">
                                    Địa chỉ: <strong>{item.address}</strong>
                                </div>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </>
    )
}
export default Company;