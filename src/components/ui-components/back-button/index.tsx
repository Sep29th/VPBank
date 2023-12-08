import React from "react";
import {BsArrowLeft} from "react-icons/bs";
import {Button} from "antd";
import {NavigateFunction, useNavigate} from "react-router-dom";

const BackButton: React.FC = () => {
  const navigate: NavigateFunction = useNavigate();
  return (
    <Button type="primary" icon={<BsArrowLeft/>}
            style={{
              marginTop: "3px",
              marginLeft: "5px",
              fontSize: "18px",
              color: "white",
              backgroundColor: "#318E5A",
              borderRadius: "50%"
            }}
            size={"large"}
            onClick={() => navigate(-1)}>
    </Button>
  );
}

export default BackButton;