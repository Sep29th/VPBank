import React, {useEffect, useState} from "react";
import {Button, Col, Result, Row, Spin, Timeline} from "antd";
import BackButton from "../../components/ui-components/back-button";
import {getHistories} from "../../services/api/history";
import dayjs from "dayjs";
import {FaDotCircle} from "react-icons/fa";
import {LoadingOutlined} from '@ant-design/icons';
import {NavigateFunction, useNavigate} from "react-router-dom";
import logoneo from "../../assets/VPBank-logo.png";

const filter = (arrayHistory: any, navigate: any) => {
  if (arrayHistory === false) {
    return (
      <div style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: "0px",
        left: "0px",
        flexDirection: "column"
      }}>
        <Spin size="large"/>
        <img src={logoneo} alt={"logofulltext"}/>
      </div>
    );
  } else if (arrayHistory.length > 0) {
    return (
      <Row justify={"center"} align={"middle"} style={{marginTop: "20px"}}>
        <Col span={22}>
          <Timeline
            pending={"Đang tiến hành..."}
            pendingDot={<LoadingOutlined style={{color: "#318E5A", fontSize: "18px"}}/>}
            items={
              arrayHistory.map((item: any) => {
                let color: string = "#318E5A";
                if (item.content === "Đang chờ phê duyệt") color = "orange";
                else if (item.content === "Xác thực thất bại") color = "red";
                else if (item.content === "Có thể rút tiền") color = "green";
                else if (item.content === "Đang chờ hoàn thiện giao dịch") color = "orange";
                else if (item.content === "Đã chuyển tiền thành công") color = "green";
                else if (item.content === "Rút tiền thất bại") color = "red";
                else if (item.content === "Đã vô hiệu hóa khả năng vay") color = "red";
                return {
                  children: (
                    <>
                      <span>
                        {dayjs(item.created_at).format("DD / MM / YYYY")}
                      </span>
                      <br/>
                      <span style={{fontSize: "18px", fontWeight: "700", color: color}}>
                        {item.content}
                      </span>
                      {item.account_balance_fluctuations && <><br/><span
                        style={{fontSize: "18px", fontWeight: "700"}}>{item.account_balance_fluctuations}</span></>}
                      {item.comment && <><br/><span>{item.comment}</span></>}
                    </>
                  ),
                  color: color,
                  dot: <FaDotCircle style={{fontSize: "18px"}}/>
                }
              })
            }
          />
        </Col>
      </Row>
    )
  } else {
    return (
      <Result
        status="404"
        title="Chưa có biến động giao dịch nào"
        extra={<Button onClick={() => navigate(-1)} type="primary" style={{backgroundColor: "#318E5A"}}>Quay lại</Button>}
      />
    );
  }
}
const History: React.FC = () => {
  const [arrayHistory, setArrayHistory] = useState<any>(false);
  const navigate: NavigateFunction = useNavigate();
  useEffect((): void => {
    (async (): Promise<void> => {
      const historyData = await getHistories();
      setArrayHistory(historyData);
    })()
  }, []);
  return (
    <div className={"animate__animated animate__fadeIn"}>
      <BackButton/>
      {filter(arrayHistory, navigate)}
    </div>
  );
}

export default History;