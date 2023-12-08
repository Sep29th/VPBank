import {Notification} from "../../../interfaces";
import {Link} from "react-router-dom";
import {Button} from "antd";
import dayjs from "dayjs";
import {IoCheckmarkDoneCircle} from "react-icons/io5";
import React from 'react';
import {deleteNotification} from "../../../services/api/notification";

const NotificationItem = (props: {
  data: Notification,
  key: number,
  reset: boolean,
  setReset: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const handleClick = async (): Promise<void> => {
    await deleteNotification(props.data.id);
    props.setReset(!props.reset);
  }
  return (
    <div style={{
      borderRadius: "9px",
      margin: "15px 0",
      display: "flex",
      justifyContent: "space-between",
      padding: "10px",
      alignItems: "center",
      boxShadow: "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px"
    }}>
      <Link to={"/history"}>
        <h3 style={{margin: 0, color: "#318E5A"}}>{props.data.content}</h3>
        <p style={{margin: 0}}>{dayjs(props.data.created_at).format("DD/MM/YYYY HH:mm:ss")}</p>
      </Link>
      <Button onClick={handleClick} icon={<IoCheckmarkDoneCircle/>} type={"primary"}
              style={{backgroundColor: "#318E5A"}}>Đã xem</Button>
    </div>
  );
}

export default NotificationItem;