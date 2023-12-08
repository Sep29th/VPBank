import {Notification} from "../../../interfaces";

export const resetNotification = (notification: Notification[]): any => {
  return {
    type: "NOTIFICATION_RESET",
    notification: notification
  }
}