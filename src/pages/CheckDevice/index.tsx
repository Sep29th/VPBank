import React from 'react';
import {useMediaQuery} from "react-responsive";
import {Outlet} from "react-router-dom";
import {Col, message, Row, Watermark} from "antd";
import logofulltext from '../../assets/logofulltext.png';
import 'animate.css';
import {messageContext} from "../../components/ui-components/message-context";

const CheckDevice: React.FC = () => {
  const isMobileDevice: boolean = useMediaQuery({query: '(max-device-width: 1224px)'});
  const [messageApi, contextHolder] = message.useMessage();
  const success = (mes: string): void => {
    messageApi.open({
      type: 'success',
      content: mes,
    });
  };
  const error = (mes: string): void => {
    messageApi.open({
      type: 'error',
      content: mes,
    });
  };
  return (
    <>
      {isMobileDevice ? (
        <messageContext.Provider value={{success: success, error: error}}>
          {contextHolder}
          <Outlet/>
        </messageContext.Provider>
      ) : (
        <Watermark
          height={170}
          width={170}
          zIndex={0}
          content="VPBank"
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
                }}>Thiết bị không khả dụng</p>
              </Col>
            </Row>
          </div>
        </Watermark>
      )}
    </>
  );
}

export default CheckDevice;