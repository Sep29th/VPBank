import {deleteLocalStorage, setLocalStorage} from "../../../services/local-storage";
import {User} from "../../../interfaces";

export const handleAuth = (state: object = {isLogin: false}, actions: {
  type: string,
  token: string,
  userInfo: User
}): object => {
  switch (actions.type) {
    case "USER_LOGIN":
      setLocalStorage("user-token", actions.token);
      return {
        isLogin: true,
        userInfo: actions.userInfo,
        token: actions.token
      }
    case "USER_LOGOUT":
      deleteLocalStorage("user-token");
      return {
        isLogin: false
      }
    default:
      return state;
  }
}