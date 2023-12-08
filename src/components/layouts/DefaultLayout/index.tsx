import React from "react";
import {Outlet} from "react-router-dom";
import FooterDefaultLayout from "../../ui-components/footer-default-layout";
import HeaderDefaultLayout from "../../ui-components/header-default-layout";

const DefaultLayout: React.FC = () => {
  return (
    <>
      <HeaderDefaultLayout/>
      <div style={{marginTop: "65px", marginBottom: "126px"}}>
        <Outlet/>
      </div>
      <FooterDefaultLayout/>
    </>
  );
}

export default DefaultLayout;