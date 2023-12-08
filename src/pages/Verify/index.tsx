import React, {useContext, useEffect, useState} from "react";
import HeaderVerifyLayout from "../../components/ui-components/header-verify-layout";
import {Button, Col, DatePicker, Form, Input, Row, Select, Steps, Tabs, Upload} from "antd";
import './Verify.css';
import {NavigateFunction, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {propMessage} from "../../interfaces";
import {messageContext} from "../../components/ui-components/message-context";
import {FiTarget, FiUpload} from "react-icons/fi";
import {updateUser, uploadImage} from "../../services/api/user";
import {login} from "../../redux/actions/auth";
import {BsArrowLeft, BsBank2} from "react-icons/bs";
import {
  AiOutlineFork,
  AiOutlineIdcard,
  AiOutlineUser,
  AiOutlineUsergroupAdd,
  AiOutlineUserSwitch
} from "react-icons/ai";
import {FaPlaceOfWorship} from "react-icons/fa";
import moment from 'moment';
import dayjs from "dayjs";
import {TbWorldCheck} from "react-icons/tb";
import {createNotification} from "../../services/api/notification";

const {Dragger} = Upload;

const allSteps: { title: string }[] = [
  {
    title: 'Đăng ảnh',
  },
  {
    title: 'Điền thông tin',
  },
  {
    title: 'Cách thụ hưởng',
  },
]
const customOptions: ({ label: string, value: string })[] = [
  {value: "ABBank", label: "Ngân hàng An Bình"},
  {value: "ACB", label: "Ngân hàng Á Châu"},
  {value: "Agribank", label: "Ngân Hàng Nông Nghiệp và Phát Triển Nông Thôn"},
  {value: "Baoviet Bank", label: "Ngân hàng TMCP Bảo Việt"},
  {value: "BIDV", label: "Ngân hàng Đầu tư và Phát triển Việt Nam"},
  {value: "CIMB", label: "Ngân hàng TNHH MTV CIMB Việt Nam"},
  {value: "Dong A Bank", label: "Ngân hàng Đông Á"},
  {value: "Eximbank", label: "Ngân hàng Xuất nhập khẩu Việt Nam"},
  {value: "GP Bank", label: "Ngân hàng Dầu khí Toàn cầu"},
  {value: "HDBank", label: "Ngân hàng Phát triển TP HCM"},
  {value: "HLO", label: "Ngân hàng Hong Leong Viet Nam"},
  {value: "Kienlongbank", label: "Ngân hàng Kiên Long"},
  {value: "Lienvietbank", label: "Ngân hàng TMCP Bưu điện Liên Việt"},
  {value: "MB", label: "Ngân hàng Quân Đội"},
  {value: "MSB", label: "Ngân hàng Hàng Hải Việt Nam"},
  {value: "Nam A Bank", label: "Ngân hàng Nam Á"},
  {value: "NASBank", label: "Ngân hàng Bắc Á"},
  {value: "NCB", label: "Ngân hàng Quoc Dan"},
  {value: "OCB", label: "Ngân hàng Phương Đông"},
  {value: "OCBC", label: "OverseaChinese Bank"},
  {value: "Ocean Bank", label: "Ngân hàng Đại Dương"},
  {value: "PG Bank", label: "Ngân hàng Xăng dầu Petrolimex"},
  {value: "PVcombank", label: "NH TMCP Đại Chúng Việt Nam"},
  {value: "QTDCS", label: "Quỹ tín dụng cơ sở"},
  {value: "Sacombank", label: "Ngân hàng Sài Gòn Thương Tín"},
  {value: "Saigonbank", label: "Ngân hàng Sài Gòn Công Thương"},
  {value: "SCB", label: "Ngân hàng TMCP Sài Gòn"},
  {value: "SCBank", label: "Ngân hàng Standard Chartered Bank Việt Nam"},
  {value: "SCBank HN", label: "Ngân hàng Standard Chartered Bank HN"},
  {value: "SCSB", label: "The Shanghai Commercial & Savings Bank CN Đồng Nai"},
  {value: "SeABank", label: "Ngân hàng TMCP Đông Nam Á"},
  {value: "SHB", label: "Ngân hàng Sài GònHà Nội"},
  {value: "Shinhan Bank", label: "Ngân hàng TNHH MTV Shinhan Việt Nam"},
  {value: "SIAM", label: "Ngân hàng The Siam Commercial Public"},
  {value: "SMBC", label: "Sumitomo Mitsui Banking Corporation HCM"},
  {value: "SMBC HN", label: "Sumitomo Mitsui Banking Corporation HN"},
  {value: "SPB", label: "Ngân hàng SinoPac"},
  {value: "TFCBHN", label: "Taipei Fubon Commercial Bank Ha Noi"},
  {value: "TFCBTPHCM", label: "Taipei Fubon Commercial Bank TP Ho Chi Minh"},
  {value: "TPBank", label: "Ngân hàng Tiên Phong TPBank"},
  {value: "VBSP", label: "Ngân hàng Chính sách xã hội Việt Nam"},
  {value: "VDB", label: "Ngân hàng Phát triển Việt Nam"},
  {value: "VIB", label: "Ngân hàng Quốc tế"},
  {value: "VID public", label: "Ngân hàng VID Public"},
  {value: "Viet Hoa Bank", label: "Ngân hàng Việt Hoa"},
  {value: "VietA Bank", label: "Ngân hàng Việt Á"},
  {value: "Vietbank", label: "Ngân hàng Việt Nam Thương Tín"},
  {value: "Viet Capital Bank", label: "NHTMCP Bản Việt"},
  {value: "Vietcombank", label: "Ngân hàng thương mại cổ phần Ngoại thương Việt Nam"},
  {value: "Viettinbank", label: "Ngân hàng công thương Việt Nam"},
  {value: "VNCB", label: "NH TMCP Xây dựng Việt Nam"},
  {value: "VPBank", label: "Ngân hàng Thương mại cổ phần Việt Nam Thịnh Vượng"},
  {value: "VRB", label: "Ngân hàng Liên doanh Việt Nga"},
  {value: "Vung Tau", label: "Ngân hàng Vũng Tàu"},
  {value: "WHHCM", label: "NH Woori HCM"},
  {value: "WHHN", label: "WOORI BANK Hà Nội"}
];

function modifyString(input: string): string {
  const cleanedString = input.replace(/[^\w\s]/g, '').toUpperCase();
  const trimmedString = cleanedString.replace(/\s+/g, ' ').trim();
  if (input.endsWith(' ')) {
    return trimmedString + ' ';
  }
  return trimmedString;
}

const Verify: React.FC = () => {
  const navigate: NavigateFunction = useNavigate();
  const authInfo: any = useSelector<any>(state => state.auth);
  const messageFunction: propMessage = useContext(messageContext);
  const [step, setStep] = useState(0);
  const [listImage, setListImage] = useState({
    front_id: authInfo.userInfo.front_identification_card + "?token=" + authInfo.token,
    back_id: authInfo.userInfo.back_identification_card + "?token=" + authInfo.token,
    face: authInfo.userInfo.face_image + "?token=" + authInfo.token
  });
  const dispatch = useDispatch();
  const [arrayButtonLoading, setArrayButtonLoading] = useState(false);
  const propsDragger1 = {
    multiple: false,
    beforeUpload: (file: Blob) => {
      const reader = new FileReader();
      reader.onload = e => {
        setListImage({...listImage, front_id: e.target?.result + ""});
      };
      reader.readAsDataURL(file);
      return false;
    },
    showUploadList: false,
  };
  const propsDragger2 = {
    multiple: false,
    beforeUpload: (file: Blob) => {
      const reader = new FileReader();
      reader.onload = e => {
        setListImage({...listImage, back_id: e.target?.result + ""});
      };
      reader.readAsDataURL(file);
      return false;
    },
    showUploadList: false,
  };
  const propsDragger3 = {
    multiple: false,
    beforeUpload: (file: Blob): boolean => {
      const reader: FileReader = new FileReader();
      reader.onload = e => {
        setListImage({...listImage, face: e.target?.result + ""});
      };
      reader.readAsDataURL(file);
      return false;
    },
    showUploadList: false,
  };
  const onFinish1 = async (): Promise<void> => {
    setArrayButtonLoading(true);
    if (listImage.front_id.substring(0, 1) !== 'n' && listImage.back_id.substring(0, 1) !== 'n' && listImage.face.substring(0, 1) !== 'n') {
      const formData = new FormData();
      let check = false;
      if (listImage.front_id.substring(0, 1) === 'd') {
        await fetch(listImage.front_id)
          .then(res => res.blob())
          .then(blob => {
            formData.append('front_identification_card', blob);
            check = true;
          });
      }
      if (listImage.back_id.substring(0, 1) === 'd') {
        await fetch(listImage.back_id)
          .then(res => res.blob())
          .then(blob => {
            formData.append('back_identification_card', blob);
            check = true;
          });
      }
      if (listImage.face.substring(0, 1) === 'd') {
        await fetch(listImage.face)
          .then(res => res.blob())
          .then(blob => {
            formData.append('face_image', blob);
            check = true;
          });
      }
      if (check) {
        const data = await uploadImage(formData);
        if (data) {
          dispatch(login({...authInfo.userInfo, ...data}, authInfo.token));
          setStep(step + 1);
        } else {
          messageFunction.error("Đã có lỗi xảy ra");
        }
      } else setStep(step + 1);
    } else {
      messageFunction.error("Không được để trống thông tin");
    }
    setArrayButtonLoading(false);
  }
  const onFinish2 = async (values: any): Promise<void> => {
    if (values.relative_phone_number === authInfo.userInfo.phone_number) {
      messageFunction.error("Số điện thoại cá nhân và người thân không được trùng nhau");
    } else if (values.relative_phone_number.substring(0, 1) !== '0') {
      messageFunction.error("Số điện thoại người thân không hợp lệ");
    } else {
      setArrayButtonLoading(true);
      const data = await updateUser({
        ...values,
        birth_date: dayjs(values.birth_date.$d).format('YYYY-MM-DD'),
        date_identification_card: dayjs(values.date_identification_card.$d).format('YYYY-MM-DD')
      });
      dispatch(login(data, authInfo.token));
      setArrayButtonLoading(false);
      setStep(2);
    }
  };
  const onFinish3 = async (values: any): Promise<void> => {
    if (values.phone_receive_person && values.phone_receive_person.substring(0, 1) !== '0') {
      messageFunction.error("Số điện thoại người nhận không hợp lệ");
      return;
    }
    setArrayButtonLoading(true);
    const data = await updateUser(values);
    const notification = await createNotification({content: "Bạn đã xác thực tài khoản thành công"});
    if (data && notification) {
      dispatch(login(data, authInfo.token));
      messageFunction.success("Xác thực tài khoản thành công");
      setArrayButtonLoading(false);
      navigate(-1);
    } else {
      messageFunction.error("Xác thực tài khoản thất bại, vui lòng thử lại");
    }
  }
  useEffect((): void => {
    if (authInfo.userInfo.bank_name !== null || authInfo.userInfo.receive_address !== null) {
      messageFunction.error("Tài khoản đã xác thực thành công, không thể tạo lại, vui lòng liên hệ chăm sóc khách hàng để được hỗ trợ");
      navigate("/");
    }
  }, []);
  return (
    <>
      <HeaderVerifyLayout content={"Xác thực tài khoản"}/>
      <Row gutter={[0, 15]} justify={"center"} align={"middle"} style={{marginTop: "15px"}}>
        <Col span={24}>
          <Button type="primary" icon={<BsArrowLeft/>} loading={arrayButtonLoading} size={"large"}
                  style={{
                    marginTop: "3px",
                    marginLeft: "5px",
                    fontSize: "18px",
                    color: "white",
                    backgroundColor: "#318E5A"
                  }}
                  onClick={() => {
                    if (step === 0) navigate(-1);
                    else setStep(step - 1);
                  }}>Quay lại
          </Button>
        </Col>
        <Col span={23} style={{borderRadius: "9px", backgroundColor: "white", marginBottom: "10px"}}>
          <Steps size="small" current={step} items={allSteps} type={"inline"} style={{width: "100%"}}/>
        </Col>
      </Row>
      {step === 0 && (
        <Form onFinish={onFinish1} className={"animate__animated animate__fadeIn"}>
          <Row gutter={[0, 15]} justify={"center"} align={"middle"} style={{marginTop: "15px"}}>
            {listImage.front_id.substring(0, 1) !== 'n' ? (
              <Col span={22} style={{
                position: "relative",
                overflow: "hidden",
                borderRadius: "9px",
                padding: "0px"
              }}>
                <img src={listImage.front_id} alt={"front"} style={{
                  width: "100%",
                  objectFit: "cover",
                  position: "absolute",
                  height: "100%"
                }}/>
                <Form.Item required={true} style={{marginBottom: "0", opacity: "0.5"}}>
                  <Dragger {...propsDragger1} name={"front_identification_card"}>
                    <p className="ant-upload-drag-icon">
                      <FiUpload style={{fontSize: "45px"}}/>
                    </p>
                    <p className="ant-upload-text">Ảnh mặt trước CMND/CCCD</p>
                  </Dragger>
                </Form.Item>
              </Col>
            ) : (
              <Col span={22}>
                <Form.Item required={true} style={{marginBottom: "0"}}>
                  <Dragger {...propsDragger1} name={"front_identification_card"}>
                    <p className="ant-upload-drag-icon">
                      <FiUpload style={{fontSize: "45px"}}/>
                    </p>
                    <p className="ant-upload-text">Ảnh mặt trước CMND/CCCD</p>
                  </Dragger>
                </Form.Item>
              </Col>
            )}
            {listImage.back_id.substring(0, 1) !== 'n' ? (
              <Col span={22} style={{
                position: "relative",
                overflow: "hidden",
                borderRadius: "9px",
                padding: "0px"
              }}>
                <img src={listImage.back_id} alt={"back"} style={{
                  width: "100%",
                  objectFit: "cover",
                  position: "absolute",
                  height: "100%"
                }}/>
                <Form.Item required={true} style={{marginBottom: "0", opacity: "0.5"}}>
                  <Dragger {...propsDragger2} name={"back_identification_card"}>
                    <p className="ant-upload-drag-icon">
                      <FiUpload style={{fontSize: "45px"}}/>
                    </p>
                    <p className="ant-upload-text">Ảnh mặt sau CMND/CCCD</p>
                  </Dragger>
                </Form.Item>
              </Col>
            ) : (
              <Col span={22}>
                <Form.Item required={true} style={{marginBottom: "0"}}>
                  <Dragger {...propsDragger2} name={"back_identification_card"}>
                    <p className="ant-upload-drag-icon">
                      <FiUpload style={{fontSize: "45px"}}/>
                    </p>
                    <p className="ant-upload-text">Ảnh mặt sau CMND/CCCD</p>
                  </Dragger>
                </Form.Item>
              </Col>
            )}
            {listImage.face.substring(0, 1) !== 'n' ? (
              <Col span={22} style={{
                position: "relative",
                overflow: "hidden",
                borderRadius: "9px",
                padding: "0px"
              }}>
                <img src={listImage.face} alt={"face"} style={{
                  width: "100%",
                  objectFit: "cover",
                  position: "absolute",
                  height: "100%"
                }}/>
                <Form.Item required={true} style={{marginBottom: "0", opacity: "0.5"}}>
                  <Dragger {...propsDragger3} name={"face_image"}>
                    <p className="ant-upload-drag-icon">
                      <FiUpload style={{fontSize: "45px"}}/>
                    </p>
                    <p className="ant-upload-text">Ảnh chân dung</p>
                  </Dragger>
                </Form.Item>
              </Col>
            ) : (
              <Col span={22}>
                <Form.Item required={true} style={{marginBottom: "0"}}>
                  <Dragger {...propsDragger3} name={"face_image"}>
                    <p className="ant-upload-drag-icon">
                      <FiUpload style={{fontSize: "45px"}}/>
                    </p>
                    <p className="ant-upload-text">Ảnh chân dung</p>
                  </Dragger>
                </Form.Item>
              </Col>
            )}
            <Col span={11} style={{display: "flex", justifyContent: "center"}}>
              <Button loading={arrayButtonLoading} type={"primary"} htmlType={"submit"}
                      style={{backgroundColor: "#318E5A"}}>Tiếp
                tục</Button>
            </Col>
          </Row>
        </Form>
      )}
      {step === 1 && (
        <Form onFinish={onFinish2} initialValues={{
          name: authInfo.userInfo.name,
          identification_card: authInfo.userInfo.identification_card,
          gender: authInfo.userInfo.gender,
          job: authInfo.userInfo.job,
          birth_date: authInfo.userInfo.birth_date && dayjs(authInfo.userInfo.birth_date, "YYYY-MM-DD"),
          date_identification_card: authInfo.userInfo.date_identification_card && dayjs(authInfo.userInfo.date_identification_card, "YYYY-MM-DD"),
          income: authInfo.userInfo.income,
          loan_purpose: authInfo.userInfo.loan_purpose,
          address: authInfo.userInfo.address,
          relative_phone_number: authInfo.userInfo.relative_phone_number,
          relationship: authInfo.userInfo.relationship
        }} className={"animate__animated animate__fadeIn"}>
          <Row gutter={[0, 15]} align={"middle"} justify={"center"}>
            <Col span={22}>
              <Form.Item name="name"
                         rules={[{required: true, min: 10, message: "Bạn phải nhập họ tên đầy đủ"}]}
                         style={{marginBottom: "0"}}>
                <Input placeholder="Họ tên" addonAfter={<AiOutlineUser/>} size={"large"}/>
              </Form.Item>
            </Col>
            <Col span={22}>
              <Form.Item name="identification_card"
                         rules={[{
                           required: true,
                           min: 1,
                           message: "Bạn phải nhập đúng số CMND/CCCD"
                         }]}
                         style={{marginBottom: "0"}}>
                <Input placeholder="Số CMND/CCCD" addonAfter={<AiOutlineIdcard/>}
                       onInput={(e: any): void => e.target.value = e.target.value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, "")}
                       size={"large"}/>
              </Form.Item>
            </Col>
            <Col span={11}>
              <span>Ngày cấp CMND/CCCD (dd/mm/yyyy): </span>
            </Col>
            <Col span={11}>
              <Form.Item name="date_identification_card"
                         rules={[{
                           required: true,
                           message: "Bạn phải nhập ngày cấp CMND/CCCD"
                         }]}
                         style={{marginBottom: "0"}}>
                <DatePicker format="DD/MM/YYYY" size={"large"} disabledDate={(current) => {
                  return current && current > moment().endOf('day');
                }}/>
              </Form.Item>
            </Col>
            <Col span={22}>
              <Form.Item name="gender"
                         rules={[{
                           required: true,
                           message: "Bạn phải nhập giới tính"
                         }]}
                         style={{marginBottom: "0"}}>
                <Select size={"large"} placeholder={"Giới tính"} options={[
                  {
                    value: 'Nam',
                    label: 'Nam',
                  },
                  {
                    value: 'Nữ',
                    label: 'Nữ',
                  },
                  {
                    value: 'Khác',
                    label: 'Khác',
                  }
                ]}/>
              </Form.Item>
            </Col>
            <Col span={11}>
              <span>Ngày sinh (dd/mm/yyyy): </span>
            </Col>
            <Col span={11}>
              <Form.Item name="birth_date"
                         rules={[{
                           required: true,
                           message: "Bạn phải nhập ngày sinh"
                         }]}
                         style={{marginBottom: "0"}}>
                <DatePicker format="DD/MM/YYYY" size={"large"} disabledDate={(current) => {
                  return current && current > moment().endOf('day');
                }}/>
              </Form.Item>
            </Col>
            <Col span={22}>
              <Form.Item name="job"
                         rules={[{required: true, min: 5, message: "Bạn phải nhập nghề nghiệp"}]}
                         style={{marginBottom: "0"}}>
                <Input placeholder="Nghề nghiệp" addonAfter={<AiOutlineFork/>} size={"large"}/>
              </Form.Item>
            </Col>
            <Col span={22}>
              <Form.Item name="income"
                         rules={[{
                           required: true,
                           message: "Bạn phải nhập thu nhập của bạn"
                         }]}
                         style={{marginBottom: "0"}}>
                <Select size={"large"} placeholder={"Thu nhập"} options={[
                  {
                    value: 'Dưới 5 triệu',
                    label: 'Dưới 5 triệu'
                  },
                  {
                    value: 'Từ 5 - 10 triệu',
                    label: 'Từ 5 - 10 triệu'
                  },
                  {
                    value: 'Từ 10 - 20 triệu',
                    label: 'Từ 10 - 20 triệu'
                  },
                  {
                    value: 'Trên 20 triệu',
                    label: 'Trên 20 triệu'
                  }
                ]}/>
              </Form.Item>
            </Col>
            <Col span={22}>
              <Form.Item name="loan_purpose"
                         rules={[{required: true, min: 5, message: "Bạn phải nhập mục đích vay"}]}
                         style={{marginBottom: "0"}}>
                <Input placeholder="Mục đích vay" addonAfter={<FiTarget/>} size={"large"}/>
              </Form.Item>
            </Col>
            <Col span={22}>
              <Form.Item name="address"
                         rules={[{required: true, min: 15, message: "Bạn phải nhập địa chỉ"}]}
                         style={{marginBottom: "0"}}>
                <Input placeholder="Địa chỉ: số nhà, phường, quận, thành phố"
                       addonAfter={<FaPlaceOfWorship/>} size={"large"}/>
              </Form.Item>
            </Col>
            <Col span={22}>
              <Form.Item name="relative_phone_number"
                         rules={[{
                           required: true,
                           min: 10,
                           max: 10,
                           message: "Bạn phải nhập đúng số điện thoại người thân"
                         }]}
                         style={{marginBottom: "0"}}>
                <Input placeholder="Số điện thoại người thân" addonAfter={<AiOutlineUserSwitch/>}
                       onInput={(e: any): void => e.target.value = e.target.value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, "")}
                       size={"large"}/>
              </Form.Item>
            </Col>
            <Col span={22}>
              <Form.Item name="relationship"
                         rules={[{
                           required: true,
                           min: 2,
                           message: "Bạn phải nhập mối quan hệ với người thân"
                         }]}
                         style={{marginBottom: "0"}}>
                <Input placeholder="Mối quan hệ với người thân"
                       addonAfter={<AiOutlineUsergroupAdd/>} size={"large"}/>
              </Form.Item>
            </Col>
            <Col span={11} style={{display: "flex", justifyContent: "center", marginTop: "5px"}}>
              <Button loading={arrayButtonLoading} type={"primary"} htmlType={"submit"}
                      style={{backgroundColor: "#318E5A"}}>Tiếp
                tục</Button>
            </Col>
          </Row>
        </Form>
      )}
      {step === 2 && (
        <Tabs
          className={"animate__animated animate__fadeIn"}
          defaultActiveKey="1"
          centered
          items={[
            {
              label: "Nhận tiền online",
              key: "1",
              children:
                <Form onFinish={onFinish3} className={"animate__animated animate__fadeIn"}>
                  <Row gutter={[0, 15]} justify={"center"} align={"middle"}>
                    <Col span={22}>
                      <Form.Item name="beneficiary_name"
                                 rules={[{
                                   required: true,
                                   min: 8,
                                   message: "Bạn phải nhập tên thụ hưởng"
                                 }]}
                                 style={{marginBottom: "0"}}>
                        <Input placeholder="Chủ tài khoản" addonBefore={<AiOutlineUser/>}
                               size={"large"}
                               onInput={(e: any): any => e.target.value = modifyString(e.target.value)}/>
                      </Form.Item>
                    </Col>
                    <Col span={22}>
                      <Form.Item name="bank_account_number"
                                 rules={[{
                                   required: true,
                                   min: 9,
                                   max: 17,
                                   message: "Bạn phải nhập đúng số tài khoản"
                                 }]}
                                 style={{marginBottom: "0"}}>
                        <Input placeholder="Số tài khoản" addonBefore={<BsBank2/>}
                               onInput={(e: any): void => e.target.value = e.target.value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, "")}
                               size={"large"}/>
                      </Form.Item>
                    </Col>
                    <Col span={22}>
                      <Form.Item name="bank_name"
                                 rules={[{
                                   required: true,
                                   message: "Bạn phải nhập tên ngân hàng thụ hưởng"
                                 }]}
                                 style={{marginBottom: "0"}}>
                        <Select size={"large"} placeholder={"Tên ngân hàng thụ hưởng"}>
                          {customOptions.map(option => (
                            <Select.Option key={option.value} value={option.value}>
                                                            <span>
                                                                <strong>{option.value}</strong> - {option.label}
                                                            </span>
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={11}
                         style={{display: "flex", justifyContent: "center", marginTop: "5px"}}>
                      <Button loading={arrayButtonLoading} type={"primary"} htmlType={"submit"}
                              style={{backgroundColor: "#318E5A"}}>Gửi yêu cầu
                      </Button>
                    </Col>
                  </Row>
                </Form>
            },
            {
              label: "Nhận tiền mặt",
              key: "2",
              children:
                <Form onFinish={onFinish3} className={"animate__animated animate__fadeIn"}>
                  <Row gutter={[0, 15]} justify={"center"} align={"middle"}>
                    <Col span={22}>
                      <Form.Item name="receive_address"
                                 rules={[{
                                   required: true,
                                   min: 15,
                                   message: "Bạn phải nhập địa chỉ nhận"
                                 }]}
                                 style={{marginBottom: "0"}}>
                        <Input placeholder="Địa chỉ nhận tiền mặt"
                               addonAfter={<TbWorldCheck/>} size={"large"}/>
                      </Form.Item>
                    </Col>
                    <Col span={22}>
                      <Form.Item name="phone_receive_person"
                                 rules={[{
                                   required: true,
                                   min: 10,
                                   max: 10,
                                   message: "Bạn phải nhập đúng số điện thoại người nhận"
                                 }]}
                                 style={{marginBottom: "0"}}>
                        <Input placeholder="Số điện thoại người nhận"
                               addonAfter={<AiOutlineUserSwitch/>}
                               onInput={(e: any): void => e.target.value = e.target.value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, "")}
                               size={"large"}/>
                      </Form.Item>
                    </Col>
                    <Col span={22}>
                      <Form.Item name="name_receive_person"
                                 rules={[{
                                   required: true,
                                   min: 10,
                                   message: "Bạn phải nhập họ tên đầy đủ"
                                 }]}
                                 style={{marginBottom: "0"}}>
                        <Input placeholder="Họ tên người nhận" addonAfter={<AiOutlineUser/>}
                               size={"large"}/>
                      </Form.Item>
                    </Col>
                    <Col span={11}
                         style={{display: "flex", justifyContent: "center", marginTop: "5px"}}>
                      <Button loading={arrayButtonLoading} type={"primary"} htmlType={"submit"}
                              style={{backgroundColor: "#318E5A"}}>Gửi yêu cầu
                      </Button>
                    </Col>
                  </Row>
                </Form>
            }
          ]}
        />
      )}
    </>
  );
}

export default Verify;