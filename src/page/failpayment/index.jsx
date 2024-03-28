import React, { useEffect, useState } from "react";
import { Button, Result } from "antd";
import api from "../../config/axios";
import { Link } from "react-router-dom";
const FailedPage = () => {
  const [order, setOrder] = useState();
  // const fetchOrder = async () => {
  //   const urlParams = new URLSearchParams(window.location.search);
  //   const orderId = urlParams.get("vnp_TxnRef");
  //   const response = await api.get(`/api/orders/update-order?orderId=${orderId}`);
  //   console.log(response);
  //   setOrder(response.data);
  // };
  // useEffect(() => {
  //   fetchOrder();
  // }, []);

  return (
    <Result
      status="error"
      title="You have failed paid"
      subTitle="Your payment has not complete, please continue your payment or go back to Home Page."
      extra={[
        <Link to="/">
          <Button type="primary">Go homepage</Button>
        </Link>,
        <Link to="/ManageOrder">
        <Button key="buy">Continue Payment</Button>,
        </Link>
      ]}
    />
  );
};
export default FailedPage;
