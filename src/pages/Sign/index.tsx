import React, {useContext, useRef, useState} from "react";
import HeaderVerifyLayout from "../../components/ui-components/header-verify-layout";
import BackButton from "../../components/ui-components/back-button";
import {Button, Col, Modal, Row} from "antd";
import {useDispatch, useSelector} from "react-redux";
import SignatureCanvas from "react-signature-canvas";
import {propMessage} from "../../interfaces";
import {messageContext} from "../../components/ui-components/message-context";
import {uploadSign} from "../../services/api/contract";
import {createNotification} from "../../services/api/notification";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {createHistory} from "../../services/api/history";
import {resetContract} from "../../redux/actions/contract";
import ContractForm from "../../components/ui-components/contract-form";

const Sign: React.FC = () => {
  const authInfo: any = useSelector<any>(state => state.auth);
  const contract: any = useSelector<any>(state => state.contract);
  const [contractModal, setContractModal] = useState(false);
  const sigCanvas: React.MutableRefObject<any> = useRef({});
  const messageFunction: propMessage = useContext(messageContext);
  const navigate: NavigateFunction = useNavigate();
  const dispatch = useDispatch();
  const save = () => {
    if (sigCanvas.current.isEmpty()) {
      messageFunction.error("Bạn phải ký trước khi gửi đi !");
      return;
    }
    const dataUrl = sigCanvas.current.toDataURL();
    fetch(dataUrl)
      .then(res => res.blob())
      .then(blob => {
        const formData = new FormData();
        formData.append('sign', blob, 'signature.png');
        const sendData = async () => {
          try {
            const data = await uploadSign(formData);
            if (data) {
              dispatch(resetContract(data));
              messageFunction.success("Ký hợp đồng thành công !");
              await createNotification({content: "Bạn đã tạo thành công hợp đồng vay"});
              await createHistory({content: "Đang chờ phê duyệt", comment: "Vui lòng liên hệ CSKH để đăng ký bảo hiểm khoản vay"});
              navigate("/success");
            }
          } catch (error) {
            messageFunction.error("Có lỗi xảy ra khi ký hợp đồng!");
          }
        }
        sendData().then();
      });
  };
  return (
    <div className={"animate__animated animate__fadeIn"}>
      <HeaderVerifyLayout content={"Hoàn thiện hợp đồng"}/>
      <BackButton/>
      <Row gutter={[0, 15]} justify={"center"} align={"middle"} style={{marginTop: "15px"}}>
        <Col span={20} style={{display: "flex", justifyContent: "space-between", fontSize: "18px"}}>
          <span>Khoản tiền vay:</span><span><b>{contract.loan_money && <>{contract.loan_money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</>}</b> VNĐ</span>
        </Col>
        <Col span={20} style={{display: "flex", justifyContent: "space-between", fontSize: "18px"}}>
          <span>Thời hạn thanh toán:</span><span><b>{contract.payment_term && <>{contract.payment_term}</>}</b> tháng</span>
        </Col>
        <Col span={20} style={{alignItems: "center", display: "flex"}}>
          <Button type={"dashed"} onClick={() => setContractModal(true)}>Xem hợp đồng</Button>
        </Col>
        <Col span={11}>
          <span>Ký vào khung bên dưới</span>
        </Col>
        <Col span={11}>
          <Button type={"primary"} style={{float: "right", backgroundColor: "#318E5A"}} onClick={save}>Xác
            nhận chữ ký</Button>
        </Col>
        <Col span={22} style={{borderRadius: "9px", border: "1px dashed #cccccc", overflow: "hidden"}}>
          <SignatureCanvas
            ref={sigCanvas}
            canvasProps={{width: 350, height: 200}}
          />
        </Col>
        <Col span={22}>
          <Button type={"primary"} style={{backgroundColor: "#318E5A"}}
                  onClick={() => sigCanvas.current.clear()}>
            Làm mới
          </Button>
        </Col>
      </Row>
      <Modal onCancel={() => setContractModal(false)} open={contractModal}
             okButtonProps={{style: {backgroundColor: "#318E5A"}}}
             onOk={() => setContractModal(false)} cancelButtonProps={{style: {display: 'none'}}}>
        <ContractForm contract={contract} authInfo={authInfo}/>
      </Modal>
    </div>
  );
}

export default Sign;