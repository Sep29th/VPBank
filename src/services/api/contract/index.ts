import {get, post, put, uploadFile} from "../../utils";

export const getContract = async (): Promise<any> => {
  return await get("contracts");
}

export const createContract = async (data: object): Promise<any> => {
  return await post("contracts", data);
}

export const updateContract = async (data: object): Promise<any> => {
  return await put("contracts", data);
}

export const uploadSign = async (data: FormData): Promise<any> => {
  return await uploadFile("contracts/upload", data);
}