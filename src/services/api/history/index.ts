import {get, post} from "../../utils";

export const getHistories = async (): Promise<any> => {
  return await get("histories");
}

export const createHistory = async (data: object): Promise<any> => {
  return await post("histories", data);
}