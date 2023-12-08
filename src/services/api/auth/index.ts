import {post} from "../../utils";

export const userLogin = async (data: object): Promise<any> => {
  return await post("login", data);
}

export const userRegister = async (data: object): Promise<any> => {
  return await post("register", data);
}

export const userLogout = async (): Promise<any> => {
  return await post("logout");
}