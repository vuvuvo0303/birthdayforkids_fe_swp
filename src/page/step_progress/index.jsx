import React, { useState, useContext } from "react";
import { Button, message, Steps, ConfigProvider, Form, Input, Modal, Row, Col } from "antd";
import { HeaderLogin } from "../../component/HeaderLogin";

import "./checkout.css";
import Checkout from "./Checkout";
import Payment from "./payment";
import FillInformation from "./fill-information";
import ChoosePackage from "./choose-package";
import ChooseServices from "./choose-services";
import { toast } from "react-toastify";
import api from "../../config/axios";
import { useSelector, useDispatch } from "react-redux";
import { reset } from "../../redux/features/bookingSlice";
import { useNavigate } from "react-router-dom";

const { Step } = Steps;
const { Item } = Form;

const StepProgress = () => {
  const [current, setCurrent] = useState(0);
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const prefixCls = getPrefixCls("steps", "ant-steps");
  const [form] = Form.useForm();
  const [cartItems, setCartItems] = useState();
  const booking = useSelector((store) => store.booking);
  const [showChooseOption, setShowChooseOption] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const steps = [
    {
      title: "Package",
      content: <ChoosePackage />,
    },
    {
      title: "Services",
      content: <ChooseServices />,
    },
    {
      title: "Fill information",
      content: <FillInformation form={form} setCurrent={setCurrent} current={current} />,
    },
    {
      title: "Checkout",
      content: <Checkout setCartItemsIndex={setCartItems} />,
    },
    // {
    //   title: "Payment",
    //   content: <Payment />,
    // },
  ];
  const next = () => {
    if (current === 2) {
      form.submit();
    } else {
      setCurrent(current + 1);
    }
  };
  const calcTotal = () => {
    var subtotal = 0;
    cartItems.forEach((item) => {
      subtotal += item.price * item.quantity;
    });

    return subtotal;
  };
  const prev = () => {
    setCurrent(current - 1);
  };

  const handlePayment = async (type) => {
    const url = type === "vnpay" ? "api/orders/create-payment" : "/api/orders/pay-with-wallet";
    try {
      const response = await api.post(url, {
        totalPrice: calcTotal(),
        packageId: booking?.package?.packageID,
        username: booking?.information?.username,
        phoneNumber: booking?.information?.phoneNumber,
        email: booking?.information?.email,
        venue: booking?.information?.venue,
        slot: booking?.information?.slot,
        notes: booking?.information?.note,
        date: booking?.information?.dateString,
        scheduleId: booking?.information?.scheduleId,
        orderDetailDTOList: booking.services.map((item) => {
          return {
            id: item.serviceID,
          };
        }),
      });
      console.log(response);
      dispatch(reset());
      if (type === "vnpay") {
        window.open(response.data, "_self");
      } else {
        navigate("/guestDetail");
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data);
    }
  };
  return (
    <div>
      <HeaderLogin />
      <div className="container container-progress">
        <Button
          type="primary"
          onClick={() => {
            dispatch(reset());
          }}
        >
          Reset Cart
        </Button>
        <Steps current={current} className={prefixCls}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className={`${prefixCls}-content`}>
          {typeof steps[current].content === "function" ? steps[current].content() : steps[current].content}
        </div>
        <div style={{ marginTop: 24 }}>
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              Next
            </Button>
          )}

          {current === steps.length - 1 && (
            <Button
              type="primary"
              onClick={() => {
                setShowChooseOption(true);
              }}
            >
              Pay
            </Button>
          )}
          {current > 0 && (
            <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
              Previous
            </Button>
          )}
        </div>

        <Modal
          footer={false}
          onCancel={() => setShowChooseOption(false)}
          open={showChooseOption}
          title="Choose payment type"
        >
          <Row gutter={12}>
            <Col span={12}>
              <Button
                style={{
                  width: "100%",
                }}
                onClick={() => {
                  handlePayment();
                }}
              >
                Payment with wallet
              </Button>
            </Col>
            <Col span={12}>
              <Button
                style={{
                  width: "100%",
                }}
                onClick={() => {
                  handlePayment("vnpay");
                }}
              >
                Payment with VNPay
              </Button>
            </Col>
          </Row>
        </Modal>
      </div>
    </div>
  );
};

export default StepProgress;
