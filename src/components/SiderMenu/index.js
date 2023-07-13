import { Menu } from "antd";
import { DashboardOutlined, AppstoreOutlined,UnorderedListOutlined,UserOutlined } from "@ant-design/icons"
import { Link, useLocation } from "react-router-dom";
function SiderMenu() {
    var location = useLocation();
    const items = [
        {
            key: "dashboard",
            label: <Link to="/dashboard">Tổng quan</Link>,
            icon: <DashboardOutlined />,
        },
        {
            key: "infocompany",
            label: <Link to="/infocompany">Thông tin công ty</Link>,
            icon: <UserOutlined />, 
        },
        {
            key: "jobmanage",
            label: <Link to="/jobmanage">Quản lí công việc</Link>,
            icon: <UnorderedListOutlined />, 
        },
        {
            key: "cvmanage",
            label: <Link to="/cvmanage">Quản lí CV</Link>,
            icon: <AppstoreOutlined />,
        },
    ]
    return (
        <>
            <Menu defaultOpenKeys={["Dashboard"]}
                defaultSelectedKeys={location.pathname}
                mode="inline" items={items} />
        </>
    )
}
export default SiderMenu;