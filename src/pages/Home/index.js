import { Select, Input, Button } from 'antd';
import { useEffect, useState } from 'react';
import { TagService } from '../../services/tagservice';
import { Card } from 'antd';
import { companyService } from '../../services/cpService';
import "./Home.scss";
import SearchForm from '../../components/SearchForm';
import ListTag from '../../components/ListTag';
import ListCompany from '../../components/ListCompany';
function Home() {
    const [tag, setTag] = useState([]);
    const [company, setCompany] = useState([]);
    useEffect(() => {
        const dataCompany = async () => {
            const result = await companyService();
            setCompany(result)
        }
        dataCompany();
    }, [])
    return (
        <>
            <div className="home">
                <div className="container">
                    <div className="home__wrap">
                        <SearchForm />
                        <ListTag />
                        <ListCompany />
                    </div>
                </div>
            </div>
        </>
    )
}
export default Home;