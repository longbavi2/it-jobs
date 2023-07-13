import { Button, Card, Tag } from "antd";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getJobById } from "../../services/jobService";
import GoBack from "../GoBack";

function ViewJob(props) {
    const { id } = useParams();
    const [data, setData] = useState();
    console.log(id)
    useEffect(() => {
        const getData = async () => {
            const data = await getJobById(id);
            setData(data[0])
        }
        getData();
    }, [])
    console.log(data)
    return (
        <>
            <GoBack />
            {data && (
                <Card
                >   
                    <div className="mb-10">
                        <span>Ngôn ngữ: </span>
                        {data.tags.map((item, index) => (
                            <Tag color="blue" className="mb-5" key={index}>
                                {item}
                            </Tag>
                        ))}
                    </div>
                    <div className="mb-10">
                        <span>Thành phố: </span>
                        {data.city = data.city ? (<>{data.city.map((item, index) => (
                            <Tag color="orange" className="mb-5" key={index}>
                                {item}
                            </Tag>
                        ))}</>) : (<></>)}
                    </div>
                    <div className="mb-10">
                        Lương: <strong>{data.salary}$</strong>
                    </div>
                    <div className="mb-10">
                        Ngày tạo: <strong>{data.createAt}</strong>
                    </div>
                    <div className="mb-10">
                        Ngày tạo: <strong>{data.description}</strong>
                    </div>
                </Card>
            )}
        </>
    )
}
export default ViewJob;