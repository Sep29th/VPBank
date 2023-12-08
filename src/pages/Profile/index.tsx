import React, {useContext, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button, Col, Image, Result, Row, Table} from "antd";
import {NavigateFunction, useNavigate} from "react-router-dom";
import dayjs from "dayjs";
import {RiLogoutBoxLine} from "react-icons/ri";
import {userLogout} from "../../services/api/auth";
import {logout} from "../../redux/actions/auth";
import {propMessage} from "../../interfaces";
import {messageContext} from "../../components/ui-components/message-context";
import BackButton from "../../components/ui-components/back-button";

const columns = [
  {
    title: 'Thông tin',
    dataIndex: 'info',
    key: 'info',
  },
  {
    title: 'Nội dung',
    dataIndex: 'value',
    key: 'value',
  },
]
const Profile: React.FC = () => {
  const authInfo: any = useSelector<any>(state => state.auth);
  const messageFunction: propMessage = useContext(messageContext);
  const navigate: NavigateFunction = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const handleClick = async (): Promise<void> => {
    setLoading(true);
    await userLogout();
    await dispatch(logout());
    navigate("/login");
    messageFunction.success("Đăng xuất thành công");
  }
  return (
    <>
      <BackButton/>
      {(authInfo.userInfo.bank_name || authInfo.userInfo.receive_address) ?
        (
          <Row justify={"center"} className={"animate__animated animate__fadeIn"}>
            <Col span={23}>
              <li style={{fontSize: "18px", margin: "15px 0"}}>Căn cứ xác thực: <span style={{
                fontSize: "20px",
                fontWeight: 700,
                color: "#318E5A"
              }}>Thẻ CMND/CCCD</span></li>
            </Col>
            <Col span={23}>
              <Table pagination={false} columns={[
                {
                  title: "Mặt trước",
                  dataIndex: "front",
                  key: "front"
                },
                {
                  title: "Mặt sau",
                  dataIndex: "back",
                  key: "back"
                }
              ]} dataSource={[{
                key: 1,
                front: <Image src={authInfo.userInfo.front_identification_card + "?token=" + authInfo.token}
                              alt={"front"} style={{maxHeight: "100px"}}/>,
                back: <Image src={authInfo.userInfo.back_identification_card + "?token=" + authInfo.token}
                             alt={"back"} style={{maxHeight: "102px"}}/>
              }]}/>
            </Col>
            <Col span={23}>
              <li style={{fontSize: "18px", margin: "15px 0"}}>Thông tin cá nhân:</li>
            </Col>
            <Col span={23}>
              <Table pagination={false} columns={columns} dataSource={[
                {
                  key: 1,
                  info: <b>Tên</b>,
                  value: authInfo.userInfo.name
                },
                {
                  key: 2,
                  info: <b>Địa chỉ</b>,
                  value: authInfo.userInfo.address
                },
                {
                  key: 3,
                  info: <b>Số CMND/CCCD</b>,
                  value: authInfo.userInfo.identification_card
                },
                {
                  key: 4,
                  info: <b>Ngày cấp CMND/CCCD</b>,
                  value: dayjs(authInfo.userInfo.date_identification_card, "YYYY-MM-DD").format("DD / MM / YYYY")
                },
                {
                  key: 5,
                  info: <b>Giới tính</b>,
                  value: authInfo.userInfo.gender
                },
                {
                  key: 6,
                  info: <b>Ngày sinh</b>,
                  value: dayjs(authInfo.userInfo.birth_date, "YYYY-MM-DD").format("DD / MM / YYYY")
                },
                {
                  key: 7,
                  info: <b>Công việc</b>,
                  value: authInfo.userInfo.job
                },
                {
                  key: 8,
                  info: <b>Thu nhập</b>,
                  value: authInfo.userInfo.income
                },
                {
                  key: 9,
                  info: <b>Mục đích vay</b>,
                  value: authInfo.userInfo.loan_purpose
                },
                {
                  key: 10,
                  info: <b>Số điện thoại</b>,
                  value: authInfo.userInfo.phone_number
                },
                {
                  key: 11,
                  info: <b>Số người thân</b>,
                  value: authInfo.userInfo.relative_phone_number
                },
                {
                  key: 12,
                  info: <b>Quan hệ người thân</b>,
                  value: authInfo.userInfo.relationship
                }
              ]}/>
            </Col>
            <Col span={23}>
              <li style={{fontSize: "18px", margin: "15px 0"}}>Phương thức nhận tiền: <span style={{
                fontSize: "20px",
                fontWeight: 700,
                color: "#318E5A"
              }}>{authInfo.userInfo.bank_name ? "Chuyển khoản" : "Tiền mặt"}</span></li>
            </Col>
            <Col span={23}>
              {authInfo.userInfo.bank_name ?
                (
                  <Table pagination={false} columns={columns} dataSource={[
                    {
                      key: 1,
                      info: <b>Ngân hàng</b>,
                      value: authInfo.userInfo.bank_name
                    },
                    {
                      key: 2,
                      info: <b>Số tài khoản</b>,
                      value: authInfo.userInfo.bank_account_number
                    },
                    {
                      key: 3,
                      info: <b>Tên thụ hưởng</b>,
                      value: authInfo.userInfo.beneficiary_name
                    }
                  ]}/>
                ) : (
                  <Table pagination={false} columns={columns} dataSource={[
                    {
                      key: 1,
                      info: "Địa chỉ nhận",
                      value: authInfo.userInfo.receive_address
                    },
                    {
                      key: 2,
                      info: "Tên người nhận",
                      value: authInfo.userInfo.name_receive_person
                    },
                    {
                      key: 3,
                      info: "Số điện thoại người nhận",
                      value: authInfo.userInfo.phone_receive_person
                    }
                  ]}/>
                )
              }
            </Col>
          </Row>
        ) : (
          <Result
            className={"animate__animated animate__fadeIn"}
            status="403"
            title="Bạn chưa xác thực tài khoản"
            subTitle="Vui lòng hoàn thành xác thực thông tin cá nhân trước khi vay"
            extra={<Button onClick={() => navigate("/verify")} type="primary" style={{backgroundColor: "#318E5A"}}>Xác
              thực ngay</Button>}
          />
        )
      }
      <Row justify={"center"} align={"middle"} style={{marginTop: "20px"}}>
        <Button loading={loading} onClick={handleClick} type={"primary"} style={{backgroundColor: "#D21312"}}
                icon={<RiLogoutBoxLine/>}>
          Đăng xuất
        </Button>
      </Row>
    </>
  );
}

export default Profile;