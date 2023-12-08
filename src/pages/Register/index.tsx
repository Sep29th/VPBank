import React, {useContext, useState} from "react";
import {Button, Col, Form, Input, Row} from "antd";
import {FaLock, FaUnlock, FaUser} from "react-icons/fa";
import {Link, NavigateFunction, useNavigate} from "react-router-dom";
import {messageContext} from "../../components/ui-components/message-context";
import {propMessage} from "../../interfaces";
import {userRegister} from "../../services/api/auth";
import {useDispatch} from "react-redux";
import {Dispatch} from "redux";
import {login} from "../../redux/actions/auth";

const Register: React.FC = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const navigate: NavigateFunction = useNavigate();
  const messageFunction: propMessage = useContext(messageContext);
  const [loading, setLoading] = useState<boolean>(false);
  const onInput = (e: any): void => {
    if (!/^-?[0-9]*(\.[0-9]*)?$/.test(e.target.value)) e.target.value = e.target.value.slice(0, -1);
  }
  const onFinish = async (values: { phone_number: string, password: string, re_password: string }): Promise<void> => {
    setLoading(true);
    if (values.phone_number == null || values.password == null) messageFunction.error("Thông tin bị trống");
    else if (values.phone_number.length !== 10 || values.phone_number.slice(0, -9) != '0') messageFunction.error("Số điện thoại không hợp lệ");
    else if (values.password !== values.re_password) messageFunction.error("Xác nhận mật khẩu không trùng khớp");
    else {
      const data = await userRegister({phone_number: values.phone_number, password: values.password});
      if (data.message) messageFunction.error(data.message);
      else {
        dispatch(login(data.user, data.token));
        navigate("/");
      }
    }
    setLoading(false);
  }
  return (
    <Form onFinish={onFinish}>
      <Row gutter={[15, 15]} className={"animate__animated animate__backInUp"}>
        <Col span={24}>
          <h3 style={{margin: "0"}}>Đăng ký</h3>
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
          <Form.Item name={"re_password"} style={{marginBottom: "0px"}}>
            <Input.Password placeholder={"Nhập lại mật khẩu"} addonBefore={<FaUnlock/>}/>
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item>
            <Button loading={loading} type={"primary"} htmlType={"submit"}
                    style={{width: "100%", backgroundColor: "#318E5A"}}>Đăng ký</Button>
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
                    <span>Bạn đã có tài khoản?
                        <Link to={"/login"}
                              style={{
                                textDecoration: "underline",
                                color: "#318E5A",
                                fontSize: "15px"
                              }}> Đăng nhập ngay!</Link>
                    </span>
        </Col>
      </Row>
    </Form>
  );
}

export default Register;