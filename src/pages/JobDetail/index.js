import { useEffect, useState } from "react";
import { getJobById } from "../../services/jobService";
import { useParams } from "react-router-dom";
import { Button, Form, Card, Col, Input, Row, Select, Tag } from "antd";
import GoBack from "../../components/GoBack";
import { rules } from "../../constant";
import { GetCompanyById } from "../../services/cpService";
import useNotification from "antd/es/notification/useNotification";
import { getAllCity } from "../../services/cityService";
import { getTimeCurrent } from "../../helpers/getTime";
import { postCv } from "../../services/postCvService";
const { TextArea } = Input;
const { Option } = Select;


function JobDetail() {
    const { id } = useParams();
    const [job, setJob] = useState([]);
    const [company, setcompany] = useState([]);
    const [form] = Form.useForm();   
    // Dùng để reset khi thêm thành công cv 
    const [noti, contextHolder] = useNotification(); 
    // Khai báo để sử dụng Notifi 
    useEffect(() => {
        const JobById = async () => {
            const dataJobs = await getJobById(id);
            const dataCompany = await GetCompanyById(dataJobs[0].idCompany);
            const option = [
                {
                    ...dataJobs[0],
                    infoCompany: dataCompany[0],
                    id: dataJobs[0].id
                }
            ]
            setJob(option)
        }
        JobById();
    }, [])
    useEffect(() => {
        const cityList = async () => {
            const dataCity = await getAllCity();
            setcompany(dataCity)
        }
        cityList();
    }, [])

    const onFinish = async (value) => {
        const time = getTimeCurrent();
        const valueForm = {
            ...value,
            createAt: time,
            idCompany: `${job[0].idCompany}`,
            idJob: id
        }
        const createCv = await postCv(valueForm);
        if(createCv){
            form.resetFields();
            noti.success({
                message: "Gửi yêu cầu thành công"
            })
        } else{
            noti.error({
                message:"Gủi yêu cầu không thành công"
            })
        }
    }
    return (
        <>
            {contextHolder} 
            {/* Cái này dùng để thông báo đã thêm cv thành công */}
            <GoBack />
            {job.length > 0 ? (
                <>
                    <h1>{job[0].name}</h1>
                    <div className="mb-20">
                        <span>Tags: </span>
                        {(job[0].tags || []).map((item, index) => (
                            <Tag color="blue" key={index}>
                                {item}
                            </Tag>
                        ))}
                    </div>

                    <div className="mb-20">
                        <span>Thành phố: </span>
                        {(job[0].city || []).map((item, index) => (
                            <Tag color="orange" key={index}>
                                {item}
                            </Tag>
                        ))}
                    </div>

                    <div className="mb-20">
                        Mức lương: <strong>{job[0].salary}$</strong>
                    </div>

                    <div className="mb-20">
                        Địa chỉ công ty: <strong>{job[0].infoCompany.address}</strong>
                    </div>

                    <div className="mb-20">
                        Thời gian đăng bài: <strong>{job[0].createAt}</strong>
                    </div>

                    <div className="mb-20">
                        <div className="mb-10">Mô tả công việc:</div>
                        <div>{job[0].description}</div>
                    </div>

                    <div className="mb-20">
                        <div className="mb-10">Giới thiệu công ty:</div>
                        <div>{job[0].infoCompany.description}</div>
                    </div>
                    <Card title="Ứng tuyển ngay" id="formApply">
                        <Form
                            name="form_apply"
                            form={form}
                            layout="vertical"
                            onFinish={onFinish}
                        >
                            <Row gutter={20}>
                                <Col span={6}>
                                    <Form.Item label="Họ tên" name="name" rules={rules}>
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="Số điện thoại" name="phone" rules={rules}>
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="Email" name="email" rules={rules}>
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="Thành phố" name="city" rules={rules}>
                                        <Select>
                                            {company.map((item, index) => (
                                                <Option value={item.value} label={item} key={index}></Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item
                                        label="Giới thiệu bản thân"
                                        name="description"
                                        rules={rules}
                                    >
                                        <TextArea rows={6} />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item
                                        label="Danh sách link project đã làm"
                                        name="linkProject"
                                        rules={rules}
                                    >
                                        <TextArea rows={6} />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit">
                                            GỬI YÊU CẦU
                                        </Button>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </Card>
                </>
            ) : (<></>)}
        </>
    )
}
export default JobDetail;