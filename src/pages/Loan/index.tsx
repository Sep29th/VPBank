import React, {useContext, useState} from "react";
import {Button, Col, Form, Input, Modal, Row, Select, Table} from "antd";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {formatMoney} from "../../helpers/formatMoney";
import {getCurrentDate} from "../../helpers/getCurrentDate";
import {calculateLoanPayments} from "../../helpers/calculateLoanPayment";
import './Loan.css';
import BackButton from "../../components/ui-components/back-button";
import {Contract, propMessage} from "../../interfaces";
import {messageContext} from "../../components/ui-components/message-context";
import {useDispatch, useSelector} from "react-redux";
import {createContract, updateContract} from "../../services/api/contract";
import {Dispatch} from "redux";
import {resetContract} from "../../redux/actions/contract";

const options: any = [
  {
    value: '6 tháng',
    label: '6 tháng'
  },
  {
    value: '12 tháng',
    label: '12 tháng'
  },
  {
    value: '18 tháng',
    label: '18 tháng'
  },
  {
    value: '24 tháng',
    label: '24 tháng'
  },
  {
    value: '36 tháng',
    label: '36 tháng'
  },
  {
    value: '48 tháng',
    label: '48 tháng'
  },
  {
    value: '60 tháng',
    label: '60 tháng'
  },
];
const columns: any = [
  {
    title: 'Kỳ',
    dataIndex: 'quad',
    key: 'quad',
  },
  {
    title: 'Số tiền',
    dataIndex: 'value',
    key: 'value',
  },
  {
    title: 'Ngày đóng',
    dataIndex: 'month',
    key: 'month',
  },
];
const Loan: React.FC = () => {
  const navigate: NavigateFunction = useNavigate();
  const contract: any = useSelector<any>(state => state.contract);
  const authInfo: any = useSelector<any>(state => state.auth);
  const messageFunction: propMessage = useContext(messageContext);
  const [money, setMoney] = useState(0);
  const [month, setMonth] = useState(6);
  const [sumMoney, setSumMoney] = useState("0");
  const [dataArray, setDataArray] = useState<({ key: number, quad: string, value: string, month: string })[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [confirmModal, setConfirmModal] = useState<boolean>(false);
  const dispatch: Dispatch<any> = useDispatch();
  const moneyChange = (e: any): void => {
    const moneyFormatted: string = formatMoney(e.target.value);
    e.target.value = moneyFormatted;
    const newMoney: number = parseInt(moneyFormatted.replace(/\./g, ''), 10);
    setMoney(newMoney);
    setSumMoney(moneyFormatted);
    setDataArray(calculateLoanPayments(newMoney, month, new Date()));
  }
  const onFinish = async (): Promise<void> => {
    if (money < 10000000) messageFunction.error("Khoản tiền vay tối thiểu là 10.000.000 đ");
    else if (contract.sign !== null && contract.sign !== undefined) messageFunction.error("Bạn đã có sẵn hợp đồng vay, không thể vay thêm");
    else if (authInfo.userInfo.bank_name === null && authInfo.userInfo.receive_address === null) setConfirmModal(true);
    else if (contract.id) {
      const newContract: Contract = await updateContract({loan_money: money, payment_term: month});
      if (newContract) {
        dispatch(resetContract(newContract));
        navigate("/sign")
      } else messageFunction.error("Máy chủ bận, vui lòng thử lại sau ít phút");
    } else {
      const newContract: Contract = await createContract({loan_money: money, payment_term: month});
      if (newContract) {
        dispatch(resetContract(newContract));
        navigate("/sign")
      } else messageFunction.error("Máy chủ bận, vui lòng thử lại sau ít phút");
    }
  }
  return (
    <>
      <div className={"animate__animated animate__fadeIn"}>
        <BackButton/>
        <Form onFinish={onFinish} initialValues={{money: "0", month: "6 tháng"}}>
          <Row gutter={[0, 15]} justify={"center"} align={"middle"}>
            <Col span={22}>
              <p style={{
                margin: "3px",
                fontSize: "19px",
                marginTop: "25px",
                color: "#222222",
                fontWeight: "500"
              }}>Số tiền vay:</p>
              <Form.Item name="money" style={{marginBottom: "0"}}>
                <Input onInput={moneyChange} size={"large"} addonAfter={"VNĐ"}
                       style={{borderColor: "#318E5A", fontSize: "18px", outlineColor: "#318E5A"}}/>
              </Form.Item>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                color: "#341d33",
                paddingTop: "10px"
              }}>
                <span>Từ 10.000.000</span>
                <span>đến 900.000.000</span>
              </div>
            </Col>
            <Col span={11}>
              <div>
                <span style={{color: "#341d33", fontSize: "16px"}}>Chọn thời hạn vay:</span>
              </div>
            </Col>
            <Col span={11}>
              <Form.Item name="month" style={{marginBottom: "0"}}>
                <Select onChange={(e: string): void => {
                  const newMonth: number = parseInt(e.substring(0, 2));
                  setMonth(newMonth);
                  setDataArray(calculateLoanPayments(money, newMonth, new Date()));
                }} options={options}/>
              </Form.Item>
            </Col>
            <Col span={22}>
              <div style={{
                backgroundImage: "linear-gradient(180deg, #318E5A, white)",
                borderRadius: "9px",
                padding: "10px 20px",
                boxShadow: "0 8px 6px rgba(0,0,0,.2)"
              }}>
                <h2 style={{textAlign: "center", color: "white", margin: "0"}}>Thông tin khoản vay</h2>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                  <span style={{fontSize: "16px"}}>Số tiền:</span>
                  <span style={{fontSize: "16px"}}>{sumMoney} đ</span>
                </div>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                  <span style={{fontSize: "16px"}}>Thời hạn vay:</span>
                  <span style={{fontSize: "16px"}}>{month} tháng</span>
                </div>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                  <span style={{fontSize: "16px"}}>Ngày vay:</span>
                  <span style={{fontSize: "16px"}}>{getCurrentDate()}</span>
                </div>
                <span style={{fontSize: "16px"}}>Hình thức thanh toán TRẢ GÓP mỗi tháng</span>
              </div>
            </Col>
            <Col span={20}>
              <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <span style={{fontSize: "15px", color: "#341d33"}}>Trả nợ kì đầu:</span>
                <span
                  style={{fontSize: "20px"}}>{(dataArray.length > 0 && dataArray[0].value !== '') ? (dataArray[0].value) : '0'} VNĐ</span>
              </div>
              <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <span style={{fontSize: "15px", color: "#341d33"}}>Lãi suất hàng tháng:</span>
                <span style={{fontSize: "20px"}}>1%</span>
              </div>
            </Col>
            <Col span={10}>
              <Button type="primary" onClick={(): void => {
                if (money < 10000000) messageFunction.error("Khoản tiền vay tối thiểu là 10.000.000 đ");
                else setIsModalOpen(true);
              }}
                      style={{backgroundColor: "#318E5A", fontSize: "15px", color: "white"}}>
                Chi tiết trả nợ
              </Button>
            </Col>
            <Col span={10}>
              <Form.Item style={{margin: "0", display: "flex", justifyContent: "end"}}>
                <Button htmlType={"submit"} type="primary"
                        style={{backgroundColor: "#318E5A", fontSize: "15px", color: "white"}}>
                  Xác nhận khoản vay
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
      <Modal title="Chi tiết trả nợ" onCancel={(): void => setIsModalOpen(false)} open={isModalOpen}
             onOk={(): void => setIsModalOpen(false)}
             cancelButtonProps={{style: {display: 'none'}}} okButtonProps={{style: {backgroundColor: "#318E5A"}}}>
        <Table dataSource={dataArray} columns={columns} pagination={{position: ["bottomLeft"]}}/>
      </Modal>
      <Modal title="Bạn chưa xác thực tài khoản" onCancel={(): void => setConfirmModal(false)} open={confirmModal}
             onOk={(): void => navigate("/verify")} okButtonProps={{style: {backgroundColor: "#318E5A"}}}>
        Vui lòng bấm OK để xác thực tài khoản trước khi vay !
      </Modal>
    </>
  );
}

export default Loan;