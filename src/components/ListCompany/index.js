import { useEffect, useState } from "react";
import { companyService } from "../../services/cpService";
import { Button, Card, Col, Row } from "antd";
import { Link } from "react-router-dom";
import GoBack from "../GoBack";

function ListCompany() {
    const [data, setData] = useState([]);
    useEffect(() => {
        const dataCompany = async () => {
            const result = await companyService();
            setData(result)
        }
        dataCompany();
    }, [])
    return (
        <>
            <h2>Danh sách một số công ty</h2>
            <Row gutter={[20, 20]}>
                {data.map((item) => (
                    <Col span={8} key={item._id}>
                        <Link to={`/company/${item._id}`}>
                            <Card>
                                <div className="mb-10">
                                    Công ty: <strong>{item.companyName}</strong>
                                </div>
                                <div className="mb-10">
                                    Số nhân sự: <strong>{item.quantityPeople}</strong>
                                </div>
                                <div className="mb-10">
                                    Địa chỉ: <strong>{item.address}</strong>
                                </div>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
            <Link to="/company">
                <Button className="mt-20">Xem thêm</Button>
            </Link>
        </>
    )
}
export default ListCompany;