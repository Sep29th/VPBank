import React from "react";
import BackButton from "../../components/ui-components/back-button";
import {Button, Col, Row, Table} from "antd";
import zalo from "../../assets/zalo-logo.png";
import phone from "../../assets/telephone.png"

const Service: React.FC = () => {
  return (
    <div className={"animate__animated animate__fadeIn"}>
      <BackButton/>
      <Row gutter={[0, 15]} justify={"center"} align={"middle"} style={{marginTop: "20px"}}>
        <Col span={23}>
          <Table pagination={false} bordered columns={[
            {
              title: "Phương thức",
              dataIndex: "method",
              key: "method",
              onCell: (record) => ({
                rowSpan: record.key % 2 === 0 ? 0 : 2,
              })
            },
            {
              title: "Số",
              dataIndex: "phone",
              key: "phone"
            },
            {
              title: "Chọn",
              dataIndex: "action",
              key: "action"
            }
          ]} dataSource={[
                   {
                     key: 1,
                     method: <div style={{display: "flex", justifyContent: "center"}}><img src={zalo} alt={"zalo"}
                                                                                           style={{width: "87%"}}/>
                     </div>,
                     phone: "0971.436.931",
                     action: <Button style={{backgroundColor: "#318E5A"}} type={"primary"} onClick={() => {
                       window.open('https://zalo.me/0971436931', '_blank');
                     }}>Liên hệ</Button>
                   },
                   {
                     key: 2,
                     phone: "0376.246.460",
                     action: <Button style={{backgroundColor: "#318E5A"}} type={"primary"} onClick={() => {
                       window.open('https://zalo.me/0376246460', '_blank');
                     }}>Liên hệ</Button>
                   },
                   {
                     key: 3,
                     method: <div style={{display: "flex", justifyContent: "center"}}><img src={phone} alt={"phone"}
                                                                                           style={{width: "50%"}}/>
                     </div>,
                     phone: "0971.436.931",
                     action: <Button style={{backgroundColor: "#318E5A"}} type={"primary"} onClick={() => {
                       window.location.href = 'tel:+84971436931'
                     }}>Gọi</Button>
                   },
                   {
                     key: 4,
                     phone: "0376.246.460",
                     action: <Button style={{backgroundColor: "#318E5A"}} type={"primary"} onClick={() => {
                       window.location.href = 'tel:+84376246460'
                     }}>Gọi</Button>
                   }
                 ]}/>
        </Col>
      </Row>
    </div>
  );
}

export default Service;