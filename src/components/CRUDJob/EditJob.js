import { useEffect, useState } from "react";
import { getTimeCurrent } from "../../helpers/getTime";
import { EditOutlined } from "@ant-design/icons";
import { getAllCity } from "../../services/cityService";
import { TagService } from "../../services/tagservice";
import { Button, Col, Form, Input, Modal, Row, Select, Switch, Tooltip, message } from "antd";
import { updateJob } from "./UpdateJob";
import { rules } from "../../constant";
const { TextArea } = Input;

function EditJob(props) {
    const { item, handleReload } = props;
    const [form] = Form.useForm();
    const [tags, setTags] = useState([]);
    const [city, setCity] = useState([]);
    const [mess, contextHolder] = message.useMessage();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        form.resetFields();
        setIsModalOpen(false);
    };

    useEffect(() => {
        const fetchApi = async () => {
            const response = await TagService();
            if (response) {
                setTags(response);
            }
            const response1 = await getAllCity();
            if (response1) {
                setCity(response);
            }
        };
        fetchApi();
    }, []);
    const handleFinish = async (values) => {
        // console.log(item._id, values)
        const response = await updateJob(item._id, values);
        if (response) {
            setIsModalOpen(false);
            handleReload();
            mess.open({
                type: "success",
                content: "Cập nhật thành công!",
                duration: 5,
            });
        } else {
            mess.open({
                type: "error",
                content: "Cập nhật không thành công!",
                duration: 3,
            });
        }
    };

    return (
        <>
            {contextHolder}
            <Tooltip title="Chỉnh sửa">
                <Button
                    onClick={showModal}
                    className="ml-5"
                    icon={<EditOutlined />}
                    type="primary"
                    ghost
                ></Button>
            </Tooltip>

            <Modal
                title="Chỉnh sửa"
                open={isModalOpen}
                onCancel={handleCancel}
                width={1000}
                footer={null}
            >
                <Form
                    onFinish={handleFinish}
                    initialValues={item}
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
                                <Select mode="multiple" options={tags} />
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
                                    Cập nhật
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    );
}

export default EditJob;
