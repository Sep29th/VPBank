import {del, get, post} from "../../utils";

export const getNotifications = async (): Promise<any> => {
  return await get("notifications");
}

export const createNotification = async (data: object): Promise<any> => {
  return await post("notifications", data);
}

export const deleteNotification = async (id: bigint | null): Promise<any> => {
  return await del("notifications/" + id);
}