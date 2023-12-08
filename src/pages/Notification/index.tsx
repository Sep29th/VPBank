import BackButton from "../../components/ui-components/back-button";
import {Col, Empty, Row} from "antd";
import NotificationItem from "../../components/ui-components/notification-item";
import {useDispatch, useSelector} from "react-redux";
import {Notification as TNotification} from "../../interfaces";
import {useEffect, useState} from "react";
import {getNotifications} from "../../services/api/notification";
import {resetNotification} from "../../redux/actions/notification";
import img_1 from "../../assets/img_1.png";

const Notification = () => {
  const notification: any = useSelector<any>(state => state.notification);
  const dispatch = useDispatch();
  const [reset, setReset] = useState(false);
  useEffect((): void => {
    (async (): Promise<void> => {
      const data = await getNotifications();
      dispatch(resetNotification(data));
    })()
  }, [dispatch, reset]);
  return (
    <div className={"animate__animated animate__fadeIn"}>
      <BackButton/>
      <Row gutter={[0, 15]} justify={"center"} align={"middle"}>
        <Col span={22}>
          {notification.length > 0 ?
            (
              <>{notification.map((item: TNotification, index: number) => <NotificationItem data={item}
                                                                                            reset={reset}
                                                                                            setReset={setReset}
                                                                                            key={index}/>)}</>
            ) : (
              <Empty style={{marginTop: "20px"}} description={"Chưa có thông báo nào"}
                     image={<img src={img_1} alt={"abc"}/>}
              />
            )
          }
        </Col>
      </Row>
    </div>
  );
}

export default Notification;