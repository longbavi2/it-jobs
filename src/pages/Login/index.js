import { Button, Checkbox, Form, Input, message } from 'antd';
import { LoginService } from '../../services/loginAdminService';
import { setCookie } from '../../helpers/cookie';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { actionAuthen } from '../../actions/authenToken';
import "./style.scss"
function Login() {
    const [mes, contextHolder] = message.useMessage();
    const navigater = useNavigate();
    const dispath = useDispatch();
    const onFinish = (values) => {
        const path = `email=${values.email}&password=${values.password}`;
        const checkAdmin = async () => {
            const admin = await LoginService(path);
            if (admin.length > 0) {
                mes.success({
                    type: 'success',
                    content: 'Bạn đã đăng nhập thành công',
                    duration: 5,
                });
                setCookie("email", admin[0].email, 1);
                setCookie("token", admin[0].token, 1);
                setCookie("id", admin[0]._id, 1);
                setCookie("companyName", admin[0].companyName, 1);
                navigater("/");
                dispath(actionAuthen(true));
            }
            else {
                mes.error({
                    type: 'error',
                    content: 'Đăng nhập không thành công',
                    duration: 5,
                });
            }
        }
        checkAdmin();
    };
    return (
        <>
            {contextHolder}
            <div className='form__text-align'>
                <Form className='form__login'
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập đúng email !',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập đúng mật khẩu!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="remember"
                        valuePropName="checked"
                    >
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item
                    >
                        <Button type="primary" htmlType="submit">
                            Đăng nhâp
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    )
}
export default Login;