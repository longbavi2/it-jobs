import { Button, Card, Col, Form, Input, Row, Select, Switch, message } from "antd";
import GoBack from "../GoBack";
import { rules } from "../../constant";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import { getAllCity } from "../../services/cityService";
import { TagService } from "../../services/tagservice";
import { getCookie } from "../../helpers/cookie";
import { postJob } from "../../services/jobService";
import { getTimeCurrent } from "../../helpers/getTime";
import { useNavigate } from "react-router-dom";

function CreateJob() {
    const navigate = useNavigate();
    const id = getCookie("id");
    const [form] = Form.useForm();
    const [city, setCity] = useState([]);
    const [tag, setTag] = useState([]);
    const [mess, contextHolder] = message.useMessage();
    useEffect(() => {
        const getData = async () => {
            const dataCitys = await getAllCity();
            setCity(dataCitys)
        }
        getData();
    }, [])
    useEffect(() => {
        const getData = async () => {
            const datatags = await TagService();
            setTag(datatags)
        }
        getData();
    }, [])
    const handleFinish = async(values) => {
        values.idCompany = id;
        values.createAt = getTimeCurrent();
        const respon = await postJob(values);
        if(respon){
            form.resetFields();
            navigate("/jobmanage");
            mess.open({
                type: "success",
                content: "Tạo thành công!",
                duration: 5,
            });
        }
        else{
            mess.open({
                type: "error",
                content: "Tạo không thành công!",
                duration: 3,
            });
        }
    }
    return (
        <>
            {contextHolder}
            <div className="mb-10">
                <GoBack />
            </div>
            <Card>
                <Form
                    onFinish={handleFinish}
                    layout="vertical"
                    form={form}
                >
                    <Row gutter={20}>
                        <Col span={24}>
                            <Form.Item label="Tên job" name="name" rules={rules}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={16}>
                            <Form.Item label="Tags" name="tags" rules={rules}>
                                <Select mode="multiple" options={tag} />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Mức lương" name="salary" rules={rules}>
                                <Input addonAfter="$" />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item label="Thành phố" name="city" rules={rules}>
                                <Select mode="multiple" options={city} />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item label="Mô tả" name="description">
                                <TextArea rows={16} />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                valuePropName="checked"
                                label="Trạng thái"
                                name="status"
                            >
                                <Switch checkedChildren="Bật" unCheckedChildren="Tắt" />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Tạo
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </>
    )
}
export default CreateJob;