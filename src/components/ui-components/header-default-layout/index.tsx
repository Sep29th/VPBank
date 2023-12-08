import React from "react";
import {Col, Row} from "antd";
import logoheader from '../../../assets/VPBank-logo.png';

const HeaderDefaultLayout: React.FC = () => {
  return (
    <header style={{
      position: "fixed",
      top: "0px",
      width: "100%",
      zIndex: 999,
      backgroundColor: "#318E5A",
      height: "60px"
    }} className={"animate__animated animate__fadeInDown"}>
      <Row gutter={[15, 15]} justify={"center"} align={"middle"}>
        <Col span={13}>
          <img src={logoheader} alt={"logoheader"} style={{width: "100%"}}/>
        </Col>
      </Row>
    </header>
  );
}

export default HeaderDefaultLayout;