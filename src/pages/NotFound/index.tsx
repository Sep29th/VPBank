import React from 'react';
import {Col, Row, Watermark} from "antd";
import logofulltext from '../../assets/logofulltext.png';
import 'animate.css';

const NotFound: React.FC = () => {
  return (
    <Watermark
      height={50}
      width={50}
      image="https://static.wixstatic.com/media/9d8ed5_847c5475fe8c43f899c98fea24fd4ca1~mv2.png/v1/fit/w_500,h_500,q_90/file.png"
      zIndex={0}
    >
      <div style={{height: "100vh"}}>
        <Row justify={"center"} align={"middle"}>
          <Col xs={24} sm={14} md={8}>
            <img style={{width: "100%", zIndex: 100, position: "relative"}}
                 className={"animate__animated animate__zoomIn"}
                 src={logofulltext} alt={"logo"}/>
          </Col>
        </Row>
        <Row justify={"center"} align={"middle"}>
          <Col span={12}>
            <p style={{
              textAlign: "center",
              fontSize: "xxx-large",
              fontWeight: "bolder",
              zIndex: 100,
              position: "relative"
            }}>404<br/>NOT FOUND</p>
          </Col>
        </Row>
        <Row justify={"center"} align={"middle"}>
          <Col span={12}>
            <p style={{
              textAlign: "center",
              fontSize: "xx-large",
              zIndex: 100,
              position: "relative"
            }}>Trang không tồn tại</p>
          </Col>
        </Row>
      </div>
    </Watermark>
  );
}

export default NotFound;