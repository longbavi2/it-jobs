import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ListJob } from "../../services/jobService";
import { Tag } from "antd";
import ListSearch from "../../components/SearchForm/ListSearch";

function Search() {
    const FirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    const [searchParams, setSearchParams] = useSearchParams();
    const [data, setData] = useState([]);
    const citySearch = searchParams.get("city") || "";
    const keywordSearch = searchParams.get("keyword") || "";
    const keywordSearchFinal = FirstLetter(keywordSearch);
    useEffect(() => {
        const getAllJob = async () => {
            const data = await ListJob();
            const filterJob = data.filter(job => {
                const city = citySearch ? job.city?.includes(citySearch) : true;
                const keyword = keywordSearchFinal ? job.tags?.includes(keywordSearchFinal) : true;
                const status = job.status;
                return city && keyword && status;
            })
            setData(filterJob)
        }
        getAllJob();
    }, [])
    return (
        <>
            <div>
                <strong className="ml-10">
                    Kết quả tìm kiếm :
                </strong>
                {citySearch && (<Tag color="blue">{citySearch}</Tag>)}
                {keywordSearchFinal && (<Tag color="blue">{keywordSearchFinal}</Tag>)}
            </div>
            {data && (<ListSearch data={data} />)}
        </>
    )
}
export default Search;