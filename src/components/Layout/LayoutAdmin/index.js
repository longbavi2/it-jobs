import { Button, Layout } from "antd";
import { useState } from "react";
import { MenuUnfoldOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";
import "./style.scss"
import { Link, Outlet } from "react-router-dom";
import { getCookie } from "../../../helpers/cookie";
import { useSelector } from "react-redux";
import SiderMenu from "../../SiderMenu";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
function LayoutAdmin() {
    const authen = useSelector(state => state.changeToken);
    const token = getCookie("token");
    const [collapsed, setCollapsed] = useState(false)
    return (
        <>
            <Layout className="layout">
                <header className="layout__header">
                    <div className={"layout__logo" + (collapsed ? " layout__close" : "")}>
                        IT ADMIN
                    </div>
                    <div className="layout__nav">
                        <span className="layout__icon--oc" onClick={() => setCollapsed(!collapsed)}>
                            <MenuUnfoldOutlined />
                        </span>
                    </div>
                    {token ? (
                        <div className="layout__link">
                            <Link className="layout__link--log" to="/">
                                <Button icon={<UserOutlined />} >
                                    Trang chủ
                                </Button>
                            </Link>
                            <Link className="layout__link--log" to="/logout">
                                <Button icon={<LogoutOutlined />} >
                                    Đăng xuất
                                </Button>
                            </Link>
                        </div>
                    ) : (<></>)}
                </header>
                <Layout>
                    <Sider breakpoint="lg" onBreakpoint={(broken) => {
                        setCollapsed(broken)
                    }} className="layout__sider" collapsed={collapsed} theme="light">
                        <SiderMenu />
                    </Sider>
                    <Content className={"layout__content" + (collapsed ? " layout__content--full" : "")}>
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </>
    )
}
export default LayoutAdmin;