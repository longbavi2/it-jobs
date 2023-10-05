import { Button, message } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons"
import { delJob } from "../../services/jobService";
function DelJob(props) {
    const { item, handleReload } = props;
    const [mess, contextHolder] = message.useMessage();
    let id = item._id
    const handleClick = async () => {
        const respon = await delJob(item._id, { id });
        if (respon) {
            handleReload();
            mess.open({
                type: "success",
                content: "Xóa thành công!",
                duration: 5,
            });
        }
        else {
            mess.open({
                type: "error",
                content: "Xóa không thành công!",
                duration: 3,
            });
        }
    }
    return (
        <>
            <Button onClick={handleClick} ghost danger icon={<DeleteOutlined />} />
        </>
    )
}
export default DelJob;