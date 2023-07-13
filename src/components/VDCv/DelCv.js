import { Button, message } from "antd";
import {
    DeleteOutlined,
} from "@ant-design/icons";
import { delJob } from "../../services/jobService";
import { delCv } from "../../services/CvService";
function DelCv(props) {
    const { item, handleReload } = props;
    const [mess, contextHolder] = message.useMessage();
    const handleClick = async () => {
        const respon = await delCv(item.id);
        if (respon) {
            handleReload();
            mess.open({
                type: "success",
                content: "Xóa thành công!",
                duration: 5,
            });
        } else {
            mess.open({
                type: "error",
                content: "Xóa không thành công!",
                duration: 3,
            });
        }
    };
    return (
        <>
            {contextHolder}
            <Button onClick={handleClick} ghost danger icon={<DeleteOutlined />} />
        </>
    );
}
export default DelCv;
