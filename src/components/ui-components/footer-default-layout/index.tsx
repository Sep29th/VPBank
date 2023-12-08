import React from "react";
import {Col, Row} from "antd";
import {NavLink} from "react-router-dom";
import './FooterDefaultLayout.css';
import {FaHeadphones, FaUser} from "react-icons/fa6";
import {FaHouse} from "react-icons/fa6";
import {IoWallet} from "react-icons/io5";

const FooterDefaultLayout: React.FC = () => {
  return (
    <footer style={{
      position: "fixed",
      bottom: "0px",
      width: "100%",
      borderTop: "1px solid #CCCCCC",
      zIndex: 999,
      backgroundColor: "white",
      height: "75px"
    }} className={"animate__animated animate__fadeInUp"}>
      <ul style={{padding: "0"}}>
        <Row gutter={[15, 15]} justify={"space-between"} align={"middle"}>
          <Col span={5} style={{textAlign: "center"}}>
            <NavLink to={"/wallet"} style={{color: "#222222"}} className={"FooterDefaultLayout__active"}>
              <IoWallet style={{fontSize: "22px"}}/><br/>Ví Tiền
            </NavLink>
          </Col>
          <Col span={4} style={{textAlign: "center"}}>
            <NavLink to={"/"} style={{color: "#222222"}} className={"FooterDefaultLayout__active"}>
              <FaHouse style={{fontSize: "22px"}}/><br/>Home
            </NavLink>
          </Col>
          <Col span={6} style={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}>
            <div style={{
              backgroundColor: "white",
              padding: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "-50px",
              borderRadius: "50%",
              border: "1px solid #CCCCCC"
            }}>
              <NavLink to={"/loan"} style={{
                color: "#318E5A",
                width: "70px",
                height: "70px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#EEEEEE",
                borderRadius: "50%",
                fontSize: "20px",
                fontWeight: "700"
              }} className={"FooterDefaultLayout__mainActive"}>
                Vay<br/>ngay
              </NavLink>
            </div>
          </Col>
          <Col span={4} style={{textAlign: "center"}}>
            <NavLink to={"/service"} style={{color: "#222222"}} className={"FooterDefaultLayout__active"}>
              <FaHeadphones style={{fontSize: "22px"}}/><br/>CSKH
            </NavLink>
          </Col>
          <Col span={5} style={{textAlign: "center"}}>
            <NavLink to={"/profile"} style={{color: "#222222"}} className={"FooterDefaultLayout__active"}>
              <FaUser style={{fontSize: "22px"}}/><br/>Cá Nhân
            </NavLink>
          </Col>
        </Row>
      </ul>
    </footer>
  );
}

export default FooterDefaultLayout;