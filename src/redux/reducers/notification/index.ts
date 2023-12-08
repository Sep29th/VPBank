import {Notification} from "../../../interfaces";

export const handleNotification = (state: Notification[] = [], actions: {
  type: string,
  notification: Notification[]
}): Notification[] => {
  switch (actions.type) {
    case "NOTIFICATION_RESET":
      return actions.notification;
    default:
      return state;
  }
}