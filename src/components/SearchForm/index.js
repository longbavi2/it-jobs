import { Button, Col, Form, Input, Row, Select } from "antd";
import { useEffect, useState } from "react";
import { getAllCity } from "../../services/cityService";
import { useNavigate } from "react-router-dom";

function SearchForm() {
    const [city, setCity] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const dataCity = async () => {
            const result = await getAllCity();
            setCity(result)
        }
        dataCity();
    }, [])
    const onFinish = (value) => {
        const city = value.city || "";
        const keyword = value.keyword || "";
        if (city.length > 0 || keyword.length > 0) {
            navigate(
                `/search?city=${city}&&keyword=${keyword}`
            )
        }
    }
    return (
        <>
            <h2 className="home__title">
                1000+ IT Jobs For Developers
            </h2>
            {city && (
                <Form onFinish={onFinish}>
                    <Row gutter={[12, 12]}>
                        <Col xxl={6} xl={6} lg={6}>
                            <Form.Item name="city">
                                <Select
                                    options={city}
                                    placeholder="Chọn thành phố"

                                />
                            </Form.Item>
                        </Col>
                        <Col xxl={6} xl={6} lg={6}>
                            <Form.Item name="keyword">
                                <Input
                                    placeholder="Nhập từ khóa..." />

                            </Form.Item>
                        </Col>
                        <Col xxl={6} xl={6} lg={6}>
                            <Form.Item>
                                <Button htmlType="submit" type='primary'
                                >
                                    Tìm kiếm
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            )}
        </>
    )
}
export default SearchForm;