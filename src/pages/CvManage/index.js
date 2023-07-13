import { useEffect, useState } from "react";
import { getCookie } from "../../helpers/cookie";
import { get } from "../../utils/request";
import { getCvById } from "../../services/CvService";
import { Table, Tag, Tooltip } from "antd";
import { Link } from "react-router-dom";
import EyeJob from "../../components/CRUDJob/EyeJob";
import { EyeOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { getJob } from "../../services/jobService";
import DelCv from "../../components/VDCv/DelCv";
function CvManage() {
    const idCompany = getCookie("id");
    const [data, setData] = useState([]);
    const getDataCv = async () => {
        const options = [];
        const dataCv = await getCvById(idCompany);
        const dataJob = await getJob(idCompany);
        for (let i = 0; i < dataCv.length; i++) {
            let nameJob = dataJob.find(item => {
                return dataCv[i].idJob === item.id
            })
            const option = {
                ...dataCv[i],
                jobName: nameJob.name,
                id: dataCv[i].id
            }
            options.push(option);
        }
        setData(options);
    }
    const handleReload = () => {
        getDataCv();
    }
    useEffect(() => {
        getDataCv();
    }, [])
    const columns = [
        {
            title: 'Tên Cv',
            key: 'jobName',
            dataIndex: 'jobName',
            render: (_, item) => (
                <p>{item.jobName}</p>
            ),
        },
        {
            title: 'Họ tên',
            key: 'name',
            dataIndex: 'tags',
            render: (_, item) => (
                <p>{item.name}</p>
            ),
        },
        {
            title: 'Số điện thoại',
            key: 'phone',
            dataIndex: 'phone',
            render: (_, item) => (
                <p>{item.phone}</p>
            ),
        },
        {
            title: 'Email',
            key: 'email',
            dataIndex: 'email',
            render: (_, item) => (
                <><p>{item.email}</p></>
            ),
        },
        {
            title: 'Ngày gửi',
            key: 'createAt',
            dataIndex: 'createAt',
            render: (_, item) => (
                <>{item.createAt}</>
            )
        },
        {
            title: 'Trạng thái',
            render: (_, item) => (
                <>
                    <Tag color={item.statusRead ? "blue" : "black"}>
                        {item.statusRead ? (<>Đang bật</>) : (<>Đang tắt</>)}
                    </Tag>
                </>
            ),
        },
        {
            title: 'Hành động',
            render: (_, item) => (
                <>
                    <Tooltip title="">
                        <Link to={`/viewcv/${item.id}`} >
                            <EyeJob icon={<EyeOutlined />} />
                        </Link>
                    </Tooltip>
                    <DelCv item={item} handleReload={handleReload} />
                </>
            ),
        },
    ];
    return (
        <>
            <h4>
                Danh sách CV
            </h4>
            <Table rowKey="id" columns={columns} dataSource={data} />
        </>
    )
}
export default CvManage;