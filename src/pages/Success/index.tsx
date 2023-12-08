import React from "react";
import HeaderVerifyLayout from "../../components/ui-components/header-verify-layout";
import {Button, Result} from "antd";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {BsArrowLeft} from "react-icons/bs";

const Success: React.FC = () => {
  const navigate: NavigateFunction = useNavigate();
  return (
    <>
      <HeaderVerifyLayout content={"Xác thực thành công"}/>
      <Button type="primary" icon={<BsArrowLeft/>}
              style={{
                marginTop: "3px",
                marginLeft: "5px",
                fontSize: "18px",
                color: "white",
                backgroundColor: "#318E5A",
                borderRadius: "50%"
              }}
              size={"large"}
              onClick={() => navigate("/")}>
      </Button>
      <Result
        status="success"
        title="Tạo hợp đồng vay thành công!"
        subTitle="Vui lòng liên hệ chăm sóc khách hàng để nhận thêm thông tin và hỗ trợ bảo hiểm khoản vay trước khi nhận tiền"
        extra={[
          <Button onClick={() => navigate("/service")} type="primary" style={{backgroundColor: "#318E5A"}} key={"CSKH"}>
            Liên hệ CSKH ngay!
          </Button>
        ]}
      />
    </>
  );
}

export default Success;