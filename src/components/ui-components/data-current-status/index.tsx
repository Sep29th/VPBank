import dayjs from "dayjs";
import {Table} from "antd";

const filter = (value: string) => {
  if (value === "Đang chờ phê duyệt") return <b style={{fontSize: "18px", color: "orange"}}>{value}</b>
  else if (value === "Xác thực thất bại") return <b style={{fontSize: "18px", color: "red"}}>{value}</b>
  else if (value === "Có thể rút tiền") return <b style={{fontSize: "18px", color: "green"}}>{value}</b>
  else if (value === "Đang chờ hoàn thiện giao dịch") return <b style={{fontSize: "18px", color: "orange"}}>{value}</b>
  else if (value === "Đã chuyển tiền thành công") return <b style={{fontSize: "18px", color: "green"}}>{value}</b>
  else if (value === "Rút tiền thất bại") return <b style={{fontSize: "18px", color: "red"}}>{value}</b>
  else if (value === "Đã vô hiệu hóa khả năng vay") return <b style={{fontSize: "18px", color: "red"}}>{value}</b>
  else return value
}
const DataCurrentStatus = (props: { data: any }) => {
  const {data} = props;
  const columns = [
    {
      title: "Tình trạng hiện tại",
      children: [
        {
          title: "Thông tin",
          dataIndex: "info",
          key: "info"
        },
        {
          title: "Nội dung",
          dataIndex: "value",
          key: "value",
          align: "end"
        }
      ]
    }
  ];
  const dataSource = [];
  dataSource.push({
    key: 1,
    info: "Thời gian",
    value: dayjs(data.created_at).format("HH:mm:ss DD/MM/YYYY")
  });
  if (data.account_balance_fluctuations) {
    dataSource.push({
      key: 2,
      info: "Biến động",
      value: data.account_balance_fluctuations
    })
  }
  if (data.content) {
    dataSource.push({
      key: 3,
      info: "Tình trạng",
      value: filter(data.content)
    })
  }
  if (data.comment) {
    dataSource.push({
      key: 4,
      info: "Ghi chú",
      value: data.comment
    })
  }
  return (
    <Table bordered pagination={false} columns={columns} dataSource={dataSource}/>
  );
}

export default DataCurrentStatus;