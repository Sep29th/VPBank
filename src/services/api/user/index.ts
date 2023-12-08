import {get, put, uploadFile} from "../../utils";

export const getUser = async (): Promise<any> => {
  return await get("users");
}

export const updateUser = async (data: any): Promise<any> => {
  return await put("users", data);
}

export const uploadImage = async (formData: FormData): Promise<any> => {
  return await uploadFile("users/upload", formData);
}