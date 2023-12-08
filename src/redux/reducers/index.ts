import {combineReducers} from "redux";
import {handleAuth} from "./auth";
import {handleContract} from "./contract";
import {handleNotification} from "./notification";

export const allReducer = combineReducers({
  auth: handleAuth, contract: handleContract, notification: handleNotification
})