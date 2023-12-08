import {User} from "../../../interfaces";

export const login = (userInfo: User, token: string): any => {
  return {
    type: "USER_LOGIN",
    userInfo: userInfo,
    token: token
  }
}

export const logout = (): any => {
  return {
    type: "USER_LOGOUT"
  }
}