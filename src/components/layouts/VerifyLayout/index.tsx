import React from "react";
import {Outlet} from "react-router-dom";
import "./VerifyLayout.css";

const VerifyLayout: React.FC = () => {
  return (
    <div className={"VerifyLayout"}>
      <Outlet/>
    </div>
  );
}

export default VerifyLayout;