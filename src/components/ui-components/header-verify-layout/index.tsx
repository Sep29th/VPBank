import {ReactElement} from "react";
import {Col, Row} from "antd";

interface Props {
  content: string;
}

const HeaderVerifyLayout = (props: Props): ReactElement => {
  return (
    <Row>
      <Col span={24}>
        <header style={{
          backgroundColor: "#318E5A",
          height: "46px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
          <h3 style={{color: "white", fontSize: "20px", margin: "0",}}>{props.content}</h3>
        </header>
      </Col>
    </Row>
  );
}

export default HeaderVerifyLayout;
