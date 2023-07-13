import { useEffect, useState } from "react";
import { getCookie } from "../../helpers/cookie";
import { getJob } from "../../services/jobService";
import { Button, Card, Table, Tag, Tooltip } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import ViewJob from "../../components/CRUDJob/ViewJob";
import EyeJob from "../../components/CRUDJob/EyeJob";
import EditJob from "../../components/CRUDJob/EditJob";
import DelJob from "../../components/CRUDJob/DelJob";
function JobManage() {
  const [data, setData] = useState();
  const id = getCookie("id");
  const getJobByid = async () => {
    const dataJob = await getJob(id);
    setData(dataJob)
  }
  useEffect(() => {
    getJobByid();
  }, [])
  const handleReload = () => {
    getJobByid();
  }
  const columns = [
    {
      title: 'Tên Job',
      key: 'name',
      dataIndex: 'name',
      render: (text) => (
        <p>{text}</p>
      ),
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            return (
              <Tag color="blue" key={tag}>
                {tag}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Mức Lương',
      key: 'salary',
      dataIndex: 'salary',
      render: (_, record) => (
        <p>{record.salary}$</p>
      ),
    },
    {
      title: 'Thời gian',
      key: 'updateAt',
      dataIndex: 'updateAt',
      render: (_, item) => (
        <><p>Ngày tạo : {item.createAt}</p>
          <p>Cập nhật : {item.updateAt}</p></>
      ),
    },
    {
      title: 'Trạng thái',
      key: 'status',
      dataIndex: 'status',
      render: (_, item) => {
        return (
          <Tag color={item.status ? "green" : "red"} key={item.id}>
            {item.status ? (<>Đang bật</>) : (<>Đang tắt</>)}
          </Tag>
        )
      },
    },
    {
      title: 'Hành động',
      render: (_, item) => (
        <>
          <Tooltip title="">
            <Link to={`/viewjob/${item.id}`} >
              <EyeJob icon={<EyeOutlined />} />
            </Link>
          </Tooltip>
          <EditJob item={item} handleReload={handleReload} />
          <DelJob item={item} handleReload={handleReload} />
        </>
      ),
    },
  ];
  return (
    <>
      <Link to={`/create-job`}>
        <Button className="mb-10" icon={<PlusOutlined />}>Thêm Job</Button>
      </Link>
      <Table rowKey="id" columns={columns} dataSource={data} />
    </>
  )
}
export default JobManage;