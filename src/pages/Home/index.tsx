import React, {useEffect} from "react";
import {Alert, Badge, Carousel, Col, Image, Row} from "antd";
import {useDispatch, useSelector} from "react-redux";
import i1 from '../../assets/OIP.jpeg';
import i2 from '../../assets/vpbank-hoan-thanh-ke-hoach-loi-nhuan-8-4329-1670480653-width497height280.jpg';
import i3 from '../../assets/OIP (1).jpeg';
import i4 from '../../assets/R.png';
import avatar from '../../assets/avatar.svg';
import Marquee from 'react-fast-marquee';
import {Link} from "react-router-dom";
import img from '../../assets/img.png';
import boCongThuong from '../../assets/bo-cong-thuong.png';
import {AiOutlineCalculator} from "react-icons/ai";
import {getNotifications} from "../../services/api/notification";
import {resetNotification} from "../../redux/actions/notification";
import {FaRegBell, FaRegUser} from "react-icons/fa";
import {CiWallet} from "react-icons/ci";
import {LiaFileContractSolid} from "react-icons/lia";
import {GoHistory} from "react-icons/go";

const imageCarouselStyle: React.CSSProperties = {
  width: "100%",
  height: "170px",
  objectFit: "cover",
  borderRadius: "9px"
}
const Home: React.FC = () => {
  const authInfo: any = useSelector<any>(state => state.auth);
  const notification: any = useSelector<any>(state => state.notification);
  const dispatch = useDispatch();
  useEffect((): void => {
    (async (): Promise<void> => {
      const data = await getNotifications();
      dispatch(resetNotification(data));
    })()
  }, []);
  return (
    <>
      <Row className={"animate__animated animate__fadeIn"} gutter={[0, 15]} justify={"center"} align={"middle"}
           style={{zIndex: 0, position: "relative"}}>
        <Col span={24}>
          <Carousel autoplay dots={false}>
            <div>
              <img src={i1} alt={"i1"} style={imageCarouselStyle}/>
            </div>
            <div>
              <img src={i2} alt={"i2"} style={imageCarouselStyle}/>
            </div>
            <div>
              <img src={i3} alt={"i3"} style={imageCarouselStyle}/>
            </div>
            <div>
              <img src={i4} alt={"i4"} style={imageCarouselStyle}/>
            </div>
          </Carousel>
        </Col>
      </Row>
      <div className={"animate__animated animate__bounceInLeft"} style={{position: "relative", zIndex: 5, marginTop: "-50px", display: "flex", alignItems: "center"}}>
        {authInfo.userInfo.face_image !== null ?
          (
            <img src={authInfo.userInfo.face_image + "?token=" + authInfo.token} alt={"avatar"} style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              objectFit: "cover",
              marginLeft: "15px",
              zIndex: 5,
              position: "relative",
              border: "3px solid white"
            }}/>
          ) : (
            <img src={avatar} alt={"defaultAvatar"} style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              objectFit: "cover",
              marginLeft: "15px",
              zIndex: 5,
              position: "relative",
              border: "3px solid white"
            }}/>
          )
        }
        <span style={{
          fontSize: "20px",
          marginLeft: "20px",
          marginTop: "50px",
          marginRight: "5px",
          letterSpacing: "3px",
          padding: "5px",
          borderRadius: "9px",
          backgroundColor: "#dddddd",
          boxShadow: "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px"
        }}>SĐT: {authInfo.userInfo.phone_number}</span>
      </div>
      <Row className={"animate__animated animate__fadeIn"} gutter={[0, 15]} justify={"center"} align={"middle"}>
        <Col span={23} style={{marginTop: "7px"}}>
          <Alert
            type={"success"}
            showIcon
            message={
              <Marquee pauseOnClick speed={40}>
                <span style={{fontSize: "15px"}}>Thủ tục vay nhanh chóng, đơn giản. Hạn mức vay lên tới 900 triệu VNĐ. Nhận tiền chỉ sau 30 phút làm hồ sơ.</span>
              </Marquee>
            }
          />
        </Col>
        <Col span={22}>
          <Row gutter={[15, 20]} align={"middle"} style={{
            padding: "20px",
            boxShadow: "rgba(49, 142, 90, 0.24) 0px 3px 8px",
            borderRadius: "9px",
          }}>
            <Col span={8} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
              <Link to={"/loan"} style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: "#222222",
                textAlign: "center"
              }}>
                <AiOutlineCalculator style={{
                  fontSize: "25px",
                  padding: "10px",
                  borderRadius: "9px",
                  color: "white",
                  backgroundColor: "#318e5a",
                  boxShadow: "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px"
                }}/>
                <p style={{marginTop: "10px", marginBottom: "0"}}>Tính khoản vay</p>
              </Link>
            </Col>
            <Col span={8} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
              <Link to={"/loan-contract"} style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: "#222222",
                textAlign: "center"
              }}>
                <LiaFileContractSolid style={{
                  fontSize: "25px",
                  padding: "10px",
                  borderRadius: "9px",
                  color: "white",
                  backgroundColor: "#318e5a",
                  boxShadow: "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px"
                }}/>
                <p style={{marginTop: "10px", marginBottom: "0"}}>Hợp đồng</p>
              </Link>
            </Col>
            <Col span={8} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
              <Link to={"/notification"} style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: "#222222",
                textAlign: "center"
              }}>
                <Badge count={notification.length}>
                  <FaRegBell style={{
                    fontSize: "25px",
                    padding: "10px",
                    borderRadius: "9px",
                    color: "white",
                    backgroundColor: "#318e5a",
                    boxShadow: "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px"
                  }}/>
                </Badge>
                <p style={{marginTop: "10px", marginBottom: "0"}}>Thông báo</p>
              </Link>
            </Col>
            <Col span={8} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
              <Link to={"/wallet"} style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: "#222222",
                textAlign: "center"
              }}>
                <CiWallet style={{
                  fontSize: "25px",
                  padding: "10px",
                  borderRadius: "9px",
                  color: "white",
                  backgroundColor: "#318e5a",
                  boxShadow: "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px"
                }}/>
                <p style={{marginTop: "10px", marginBottom: "0"}}>Ví tiền</p>
              </Link>
            </Col>
            <Col span={8} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
              <Link to={"/history"} style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: "#222222",
                textAlign: "center"
              }}>
                <GoHistory style={{
                  fontSize: "25px",
                  padding: "10px",
                  borderRadius: "9px",
                  color: "white",
                  backgroundColor: "#318e5a",
                  boxShadow: "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px"
                }}/>
                <p style={{marginTop: "10px", marginBottom: "0"}}>Lịch sử</p>
              </Link>
            </Col>
            <Col span={8} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
              <Link to={"/profile"} style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: "#222222",
                textAlign: "center"
              }}>
                <FaRegUser style={{
                  fontSize: "25px",
                  padding: "10px",
                  borderRadius: "9px",
                  color: "white",
                  backgroundColor: "#318e5a",
                  boxShadow: "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px"
                }}/>
                <p style={{marginTop: "10px", marginBottom: "0"}}>Thông tin</p>
              </Link>
            </Col>
          </Row>
        </Col>
        <Col span={23}>
          <Image src={img} width={"100%"} preview={{toolbarRender: () => (<></>), closeIcon: (<></>)}}
                 style={{width: "100%", borderRadius: "9px", objectFit: "cover", height: "100%"}}/>
        </Col>
        <Col span={8}>
          <img src={boCongThuong} alt={"bo-cong-thuong"} style={{width: "100%"}}/>
        </Col>
        <Col span={22}>
          <p style={{marginBottom: 0, textAlign: "center", marginTop: "-15px", color: "#865a6b"}}>® Bản quyền
            thuộc về Ngân hàng Thương mại cổ phần Việt Nam Thịnh Vượng</p>
        </Col>
      </Row>
    </>
  );
}

export default Home;