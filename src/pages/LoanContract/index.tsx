import React, {useState} from "react";
import BackButton from "../../components/ui-components/back-button";
import {useSelector} from "react-redux";
import {Button, Col, Empty, Modal, Row, Table} from "antd";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {formatMoney} from "../../helpers/formatMoney";
import dayjs from "dayjs";
import {calculateLoanPayments} from "../../helpers/calculateLoanPayment";
import ContractForm from "../../components/ui-components/contract-form";

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
const LoanContract: React.FC = () => {
  const contract: any = useSelector<any>(state => state.contract);
  const authInfo: any = useSelector<any>(state => state.auth);
  const navigate: NavigateFunction = useNavigate();
  const [loanModalOpen, setLoanModalOpen] = useState<boolean>(false);
  const [contractModal, setContractModal] = useState<boolean>(false);
  return (
    <>
      <BackButton/>
      {contract.sign ?
        (
          <>
            <Row justify={"center"} style={{marginTop: "20px"}} className={"animate__animated animate__fadeIn"}>
              <Col span={23}>
                <Table pagination={false} bordered columns={[
                  {
                    title: "Thông tin hợp đồng",
                    children: [
                      {
                        title: "Thông tin",
                        dataIndex: "info",
                        key: "info"
                      },
                      {
                        title: "Nội dung",
                        dataIndex: "value",
                        key: "value"
                      }
                    ]
                  }
                ]} dataSource={[
                  {
                    key: 1,
                    info: <b>Mã hợp đồng</b>,
                    value: contract.contract_code
                  },
                  {
                    key: 2,
                    info: <b>Số tiền vay</b>,
                    value: <span style={{
                      fontWeight: 700,
                      fontSize: "18px",
                      color: "red"
                    }}>{formatMoney(contract.loan_money.toString())} VNĐ</span>
                  },
                  {
                    key: 3,
                    info: <b>Thời hạn</b>,
                    value: contract.payment_term + " tháng"
                  },
                  {
                    key: 4,
                    info: <b>Ngày tạo</b>,
                    value: dayjs(contract.created_at).format("Ngày DD/MM/YYYY lúc HH:mm:ss")
                  }
                ]}/>
              </Col>
            </Row>
            <Row justify={"space-evenly"} align={"middle"} style={{marginTop: "15px"}}
                 className={"animate__animated animate__fadeIn"}>
              <Button onClick={() => setLoanModalOpen(true)} type={"primary"} style={{backgroundColor: "#318E5A"}}>
                Chi tiết thanh toán
              </Button>
              <Button onClick={() => setContractModal(true)} type={"primary"} style={{backgroundColor: "#318E5A"}}>
                Chi tiết hợp đồng
              </Button>
            </Row>
            <Modal title="Chi tiết trả nợ" onCancel={(): void => setLoanModalOpen(false)} open={loanModalOpen}
                   onOk={(): void => setLoanModalOpen(false)}
                   cancelButtonProps={{style: {display: 'none'}}} okButtonProps={{style: {backgroundColor: "#318E5A"}}}>
              <Table
                dataSource={calculateLoanPayments(contract.loan_money, contract.payment_term, new Date(dayjs(contract.created_at).format("YYYY-MM-DD")))}
                columns={columns} pagination={{position: ["bottomLeft"]}}/>
            </Modal>
            <Modal onCancel={() => setContractModal(false)} open={contractModal}
                   okButtonProps={{style: {backgroundColor: "#318E5A"}}}
                   onOk={() => setContractModal(false)} cancelButtonProps={{style: {display: 'none'}}}>
              <ContractForm contract={contract} authInfo={authInfo}/>
            </Modal>
          </>
        ) : (
          <Empty description={"Chưa có hợp đồng vay"} className={"animate__animated animate__fadeIn"}>
            <Button type={"primary"} onClick={() => navigate("/loan")} style={{backgroundColor: "#318E5A"}}>
              Vay ngay
            </Button>
          </Empty>
        )
      }
    </>
  );
}

export default LoanContract;