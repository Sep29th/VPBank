import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "../../services/api/user";
import {NavigateFunction, Outlet, useNavigate} from "react-router-dom";
import {Dispatch} from "redux";
import {login} from "../../redux/actions/auth";
import {getLocalStorage} from "../../services/local-storage";
import {Spin} from "antd";
import './Authentication.css';
import logoneo from '../../assets/VPBank-logo.png';
import {getContract} from "../../services/api/contract";
import {resetContract} from "../../redux/actions/contract";

const Authentication: React.FC = () => {
  const authInfo: any = useSelector<any>(state => state.auth);
  const navigate: NavigateFunction = useNavigate();
  const dispatch: Dispatch<any> = useDispatch();
  useEffect((): void => {
    (async (): Promise<void> => {
      if (!authInfo.isLogin) {
        const userInfo: any = await getUser();
        if (userInfo.message) {
          navigate("/login");
          return;
        }
        await dispatch(login(userInfo, getLocalStorage("user-token")));
      }
      const contractInfo: any = await getContract();
      if (contractInfo.message === undefined) dispatch(resetContract(contractInfo));
      else dispatch(resetContract(
        {
          id: null,
          user_id: null,
          contract_code: null,
          loan_money: null,
          payment_term: null,
          sign: null,
          current_status: null,
          created_at: null,
          updated_at: null
        }
      ))
    })();
  }, []);
  return (
    <>
      {authInfo.isLogin ?
        (
          <Outlet/>
        ) : (
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
        )
      }
    </>
  );
}

export default Authentication;