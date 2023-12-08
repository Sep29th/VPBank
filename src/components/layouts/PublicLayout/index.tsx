import React from "react";
import './PublicLayout.css';
import {Card, Col, Row} from "antd";
import logoneo from '../../../assets/VPBank-logo.png';
import {Outlet} from "react-router-dom";

const PublicLayout: React.FC = () => {
  return (
    <Row justify={"center"} className={"PublicLayout"} align={"middle"} style={{
      width: "100%",
      height: "100vh",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center 0px"
    }}>
      <Col span={22}>
        <Card className={"animate__animated animate__fadeInUp"}
              title={<img src={logoneo} alt={"logo"} style={{width: "45%"}}/>} style={{width: "100%"}}>
          <Outlet/>
        </Card>
      </Col>
    </Row>
  );
}

export default PublicLayout;