import { Card } from "antd";
import { useEffect, useState } from "react";
import { companyService } from "../../services/cpService";
import { Link } from "react-router-dom";

function ListSearch(props) {
    const { data = [] } = props;
    const [company, setCompany] = useState([]);
    useEffect(() => {
        const getCompany = async () => {
            const dataCompany = await companyService();
            const NewArray = [];
            if (data.length > 0) {
                data.forEach(element => {
                    const findCompany = dataCompany.find(item => item.id == element.idCompany);
                    const option = {
                        nameCompany: findCompany.companyName,
                        ...element,
                        id: element.id
                    }
                    NewArray.push(option);
                })
            }
            setCompany(NewArray);
        }
        getCompany();
    }, [data])
    console.log(company)
    return (
        <>
            {company && (
                <>
                    {company.map(item => (
                        <Link key={item.id} to={`/company/${item.idCompany}`}>
                            <Card key={item.id}>
                                <div>
                                    <p><strong> Tên công ty : </strong> {item.nameCompany}</p>
                                </div>
                                <div>
                                    <p>
                                        <strong>
                                            Thành phố :
                                        </strong>
                                        {(item.city || []).map((city, index) => (
                                            <span className="ml-10" key={index}>{city}</span>
                                        ))}
                                    </p>
                                </div>
                                <div>
                                    <p>
                                        <strong>
                                            Công việc :
                                        </strong>
                                        {item.name}
                                    </p>
                                </div>
                                <div>
                                    <p>
                                        <strong>
                                            Lương :
                                        </strong>
                                        {item.salary}$
                                    </p>
                                </div>
                            </Card>
                        </Link>
                    ))}
                </>
            )}
        </>
    )
}
export default ListSearch;