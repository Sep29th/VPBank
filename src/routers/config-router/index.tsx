import PublicLayout from "../../components/layouts/PublicLayout";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import VerifyLayout from "../../components/layouts/VerifyLayout";

import CheckDevice from "../../pages/CheckDevice";
import NotFound from "../../pages/NotFound";
import Login from "../../pages/Login";
import Register from "../../pages/Register";
import Authentication from "../../pages/Authentication";
import Home from "../../pages/Home";
import Loan from "../../pages/Loan";
import Sign from "../../pages/Sign";
import Verify from "../../pages/Verify";
import Notification from "../../pages/Notification";
import Success from "../../pages/Success";
import LoanContract from "../../pages/LoanContract";
import Profile from "../../pages/Profile";
import Wallet from "../../pages/Wallet";
import Service from "../../pages/Service";
import History from "../../pages/History";

export const configRouters: object[] = [
  {
    element: <CheckDevice/>,
    children: [
      {
        element: <PublicLayout/>,
        children: [
          {
            path: "/login",
            element: <Login/>
          },
          {
            path: "/register",
            element: <Register/>
          }
        ]
      },
      {
        element: <Authentication/>,
        children: [
          {
            element: <DefaultLayout/>,
            children: [
              {
                path: "/",
                element: <Home/>
              },
              {
                path: "/loan",
                element: <Loan/>
              },
              {
                path: "/notification",
                element: <Notification/>
              },
              {
                path: "/loan-contract",
                element: <LoanContract/>
              },
              {
                path: "/profile",
                element: <Profile/>
              },
              {
                path: "/wallet",
                element: <Wallet/>
              },
              {
                path: "/service",
                element: <Service/>
              },
              {
                path: "/history",
                element: <History/>
              }
            ]
          },
          {
            element: <VerifyLayout/>,
            children: [
              {
                path: "/sign",
                element: <Sign/>
              },
              {
                path: "/verify",
                element: <Verify/>
              },
              {
                path: "/success",
                element: <Success/>
              }
            ]
          }
        ]
      },
      {
        path: "/*",
        element: <NotFound/>
      }
    ]
  }
]