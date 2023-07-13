import { Button, Card, Col, Form, Input, Row } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { rules } from "../../constant";
import { getCookie } from "../../helpers/cookie";
import { GetCompanyById } from "../../services/cpService";
import { updateCompany } from "../../services/updateCompany";
import useMessage from "antd/es/message/useMessage";
const { TextArea } = Input;
function InCompany() {
    const id = getCookie("id");
    const [messageApi, contextHolder] = useMessage();
    const [isEdit, setIsEdit] = useState(false);
    const [data, setData] = useState();
    const [form] = Form.useForm();
    useEffect(() => {
        const getDataCompany = async () => {
            const data = await GetCompanyById(id);
            setData(data[0]);
        }
        getDataCompany();
    }, [])
    const onFinish = async(value) => {
        const respon = await updateCompany(id,value)
        if(respon){
            form.resetFields();
            setIsEdit(false);
            messageApi.success("Bạn đã cập nhật thành công");
        }
    }
    const handleEdit = () => {
        setIsEdit(true);
    }
    const handleCancel = () => {
        setIsEdit(false);
    }
    return (
        <>
        {contextHolder}
            {data && (<Card title="Thông tin công ty" extra={isEdit ? (<Button onClick={handleCancel}>Hủy</Button>)
                :
                (<Button onClick={handleEdit}>Chỉnh sửa</Button>)} >
                <Form onFinish={onFinish}
                    layout="vertical"
                    disabled={!isEdit}
                    initialValues={data}
                    form={form}
                >
                    <Row gutter={[20, 20]}>
                        <Col span={24}>
                            <Form.Item  name="companyName" label="Tên công ty" rules={rules}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="email" label="Email" rules={rules}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="phone" label="Phone" rules={rules}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="address" label="Địa chỉ" rules={rules}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="quantityPeople" label="Số lượng nhân sự" rules={rules}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="workingTime" label="Thời gian làm việc" rules={rules}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="website" label="Link website" rules={rules}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item name="description" label="Mô tả" rules={rules}>
                                <TextArea rows={4} />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item name="detail" label="Mô tả chi tiết" rules={rules}>
                                <TextArea rows={16} />
                            </Form.Item>
                        </Col>
                        {isEdit ? (<Button htmlType="submit" type="primary">Cập nhật</Button>):(<Button>Hủy</Button>)}
                </Row>
            </Form>
        </Card >)}
        </>
    )
}
export default InCompany;