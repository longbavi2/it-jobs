import { Tag } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TagService } from "../../services/tagservice";
function ListTag() {
  const [tags, setTags] = useState([]);
  useEffect(() => {
    const dataTag = async () => {
      const result = await TagService();
      setTags(result)
    }
    dataTag();
  }, [])
  return (
    <>
      <div className="mb-20">
        {tags.map((item) => (
          <Link to={`/search?keyword=${item.value || ""}`} key={item.key}>
            <Tag color="blue" className="mb-5">
              {item.value}
            </Tag>
          </Link>
        ))}
      </div>
    </>
  )
}
export default ListTag;