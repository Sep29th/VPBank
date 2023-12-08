import React, {useContext, useState} from "react";
import {Button, Col, Form, Input, Row} from "antd";
import {FaLock, FaUser} from "react-icons/fa";
import {Link, NavigateFunction, useNavigate} from "react-router-dom";
import {messageContext} from "../../components/ui-components/message-context";
import {propMessage} from "../../interfaces";
import {userLogin} from "../../services/api/auth";
import {useDispatch} from "react-redux";
import {Dispatch} from "redux";
import {login} from "../../redux/actions/auth";

const Login: React.FC = () => {
  const messageFunction: propMessage = useContext(messageContext);
  const dispatch: Dispatch<any> = useDispatch();
  const navigate: NavigateFunction = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const onInput = (e: any): void => {
    if (!/^-?[0-9]*(\.[0-9]*)?$/.test(e.target.value)) e.target.value = e.target.value.slice(0, -1);
  }
  const onFinish = async (values: { phone_number: string, password: string }): Promise<void> => {
    setLoading(true);
    if (values.phone_number == null || values.password == null) messageFunction.error("Thông tin bị trống");
    else if (values.phone_number.length !== 10 || values.phone_number.slice(0, -9) != '0') messageFunction.error("Số điện thoại không hợp lệ");
    else {
      const data = await userLogin(values);
      if (data.message) messageFunction.error(data.message);
      else {
        await dispatch(login(data.user, data.token));
        navigate("/");
      }
    }
    setLoading(false);
  }
  return (
    <Form onFinish={onFinish}>
      <Row gutter={[15, 15]} className={"animate__animated animate__backInUp"}>
        <Col span={24}>
          <h3 style={{margin: "0"}}>Đăng nhập</h3>
        </Col>
        <Col span={24}>
          <Form.Item name={"phone_number"} style={{marginBottom: "0px"}}>
            <Input onInput={onInput} placeholder={"Số điện thoại"} addonBefore={<FaUser/>}/>
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item name={"password"} style={{marginBottom: "0px"}}>
            <Input.Password placeholder={"Mật khẩu"} addonBefore={<FaLock/>}/>
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item>
            <Button loading={loading} type={"primary"} htmlType={"submit"}
                    style={{width: "100%", backgroundColor: "#318E5A"}}>Đăng nhập</Button>
          </Form.Item>
        </Col>
        <Col span={24}
             style={{
               textAlign: "center",
               marginTop: "80px",
               backgroundColor: "#EEEEEE",
               borderRadius: "5px",
               padding: "7px"
             }}>
                    <span>Bạn không có tài khoản?
                        <Link to={"/register"}
                              style={{
                                textDecoration: "underline",
                                color: "#318E5A",
                                fontSize: "15px"
                              }}> Đăng ký ngay!</Link>
                    </span>
        </Col>
      </Row>
    </Form>
  );
}

export default Login;