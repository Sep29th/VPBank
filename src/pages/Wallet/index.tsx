import React, {useContext, useEffect, useState} from "react";
import card from "../../assets/card.png";
import logoCard from "../../assets/vpbank-logo-incard.png";
import {Button, Col, Row, Table} from "antd";
import {IoWifiOutline} from "react-icons/io5";
import {useDispatch, useSelector} from "react-redux";
import {formatMoney} from "../../helpers/formatMoney";
import {getUser} from "../../services/api/user";
import {login} from "../../redux/actions/auth";
import {getContract, updateContract} from "../../services/api/contract";
import {resetContract} from "../../redux/actions/contract";
import {createHistory, getHistories} from "../../services/api/history";
import DataCurrentStatus from "../../components/ui-components/data-current-status";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {propMessage} from "../../interfaces";
import {messageContext} from "../../components/ui-components/message-context";
import {createNotification} from "../../services/api/notification";

const Wallet: React.FC = () => {
  const authInfo: any = useSelector<any>(state => state.auth);
  const contract: any = useSelector<any>(state => state.contract);
  const dispatch = useDispatch();
  const navigate: NavigateFunction = useNavigate();
  const [arrayHistory, setArrayHistory] = useState<any>([]);
  const messageFunction: propMessage = useContext(messageContext);
  const handleWithdrawal = async (): Promise<void> => {
    if (contract.current_status === 2 && authInfo.userInfo.remaining_money !== null && authInfo.userInfo.remaining_money !== undefined && authInfo.userInfo.remaining_money > 0) {
      const contractData = await getContract();
      if (contractData.current_status === 2) {
        const data = await updateContract({current_status: 3});
        if (data.id) {
          messageFunction.success("Yêu cầu rút tiền thành công");
          dispatch(resetContract(data));
          await createNotification({content: "Yêu cầu rút tiền thành công"});
          setArrayHistory([await createHistory({content: "Đang chờ hoàn thiện giao dịch", comment: "Hệ thống sẽ xử lý khoản vay trong thời gian ngắn nhất, có bất kỳ thắc mắc nào vui lòng liên hệ CSKH"})]);
        } else {
          messageFunction.error("Máy chủ bận, vui lòng thử lại sau");
        }
      } else {
        messageFunction.error("Yêu cầu rút tiền không hợp lệ");
      }
    } else {
      messageFunction.error("Yêu cầu rút tiền không hợp lệ");
    }
  }
  useEffect((): void => {
    (async (): Promise<void> => {
      const userData = await getUser();
      dispatch(login(userData, authInfo.token));
      const contractData = await getContract();
      dispatch(resetContract(contractData));
      const historyData = await getHistories();
      setArrayHistory(historyData);
    })()
  }, []);
  return (
    <Row gutter={[0, 15]} justify={"center"} align={"middle"} className={"animate__animated animate__fadeIn"}>
      <Col span={23} style={{position: "relative", borderRadius: "9px"}}>
        <img src={logoCard} alt={"logo"} style={{width: "40%", position: "absolute", top: "15px", left: "15px"}}/>
        <img src={card} alt={"card"} style={{width: "100%"}}/>
        <span style={{
          display: "flex",
          alignItems: "center",
          position: "absolute",
          top: "90px",
          left: "75px",
          color: "white",
          fontSize: "20px"
        }}>CASHBACK <IoWifiOutline style={{rotate: "90deg", fontSize: "55px"}}/></span>
        <span style={{
          position: "absolute",
          bottom: "10px",
          left: "10px",
          color: "white",
          fontSize: "20px",
          fontWeight: "700"
        }}>{(authInfo.userInfo.name && authInfo.userInfo.identification_card) ?
          (
            <>{authInfo.userInfo.name}
              <hr/>
              {authInfo.userInfo.identification_card}</>
          ) : (
            <>***********
              <hr/>
              ••••••••••</>
          )
        }</span>
      </Col>
      <Col span={23} style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "15px",
        borderRadius: "9px",
        backgroundColor: "#cccccc"
      }}>
        <span style={{fontSize: "18px", fontWeight: "700"}}>Số dư:</span>
        <span style={{
          fontSize: "18px",
          fontWeight: "700",
          color: "orangered"
        }}>{authInfo.userInfo.remaining_money ? formatMoney(authInfo.userInfo.remaining_money.toString()) : "0"} VNĐ</span>
      </Col>
      <Col span={11}>
        <Button type={"primary"} style={{backgroundColor: "#318E5A"}} onClick={() => navigate("/history")}>Chi tiết giao
          dịch</Button>
      </Col>
      <Col span={11} style={{display: "flex", justifyContent: "end"}}>
        <Button type={"primary"} style={{backgroundColor: "#318E5A"}} onClick={handleWithdrawal}>Rút tiền ngay</Button>
      </Col>
      <Col span={23}>
        {arrayHistory.length > 0 ?
          (
            <DataCurrentStatus data={arrayHistory[arrayHistory.length - 1]}/>
          ) : (
            <Table bordered pagination={false} columns={[
              {
                title: "Tình trạng hiện tại",
                dataIndex: "content",
                key: "content",
                align: "center"
              }
            ]} dataSource={[
              {
                key: 1,
                content: "Chưa có thông tin"
              }
            ]}/>
          )
        }
      </Col>
    </Row>
  );
}

export default Wallet;
