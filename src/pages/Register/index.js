import { Button, Card, Col, Input, Row, message, Form } from "antd";
import { rules } from "../../constant";
import { RegisterEmail, RegisterPhone, createAdmin } from "../../services/registerService";
import useMessage from "antd/es/message/useMessage";
import { useNavigate } from "react-router-dom";
function Register() {
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const onFinish = async (value) => {
        const checkEmail = await RegisterEmail(value.email)
        if (checkEmail.length > 0) {
            messageApi.error("Đã tồn tại Email")
        }
        else {
            const admin = await createAdmin(value);
            if (admin) {
                alert("Bạn đã đăng kí thành công")
                navigate("/login")
            }
        }
    }
    return (
        <>
            {contextHolder}
            <Row justify="center">
                <Col span={12}>
                    <Card title="Đăng kí tài khoản">
                        <Form onFinish={onFinish} layout="vertical">
                            <Form.Item label="Tên công ty" name="companyName" rules={rules}>
                                <Input />
                            </Form.Item>
                            <Form.Item label="Email" name="email" rules={rules}>
                                <Input />
                            </Form.Item>
                            <Form.Item label="Password" name="password" rules={rules}>
                                <Input />
                            </Form.Item>
                            <Form.Item label="Số điện thoại" name="phone" rules={rules}>
                                <Input />
                            </Form.Item>
                            <Button htmlType="submit" type="primary" >
                                Đăng kí
                            </Button>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </>
    )
}
export default Register;