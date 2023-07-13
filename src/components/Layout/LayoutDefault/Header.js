import { Link } from "react-router-dom";
import { Button } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { getCookie } from "../../../helpers/cookie";
function Header() {
    const token = getCookie("token");
    return (
        <>
            <div className="layout-default__header">
                <div className="container">
                    <div className="layout-default__wrap">
                        <div className="layout-default__logo">
                            <Link to="/">
                                IT JOBS
                            </Link>
                        </div>
                        <div className="layout-default__account">
                        {token ? (
                                <>
                                    <Link to="/dashboard">
                                        <Button icon={<UserOutlined />}>Quản lý</Button>
                                    </Link>
                                    <Link to="/logout" className="ml-10">
                                        <Button icon={<LogoutOutlined />}>Đăng xuất</Button>
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link to="/login">
                                        <Button >Đăng nhập</Button>
                                    </Link>
                                    <Link to="/register">
                                        <Button type="primary" className="ml-10">
                                            Đăng ký
                                        </Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Header;