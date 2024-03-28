import React, { useEffect, useState } from "react";
import { Button, Result } from "antd";
import api from "../../config/axios";
import { Link } from "react-router-dom";
const SuccessPage = () => {
    const [order, setOrder] = useState();
    const fetchOrder = async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const orderId = urlParams.get("vnp_TxnRef");
        const response = await api.get(
            `/api/orders/update-order?orderId=${orderId}`
        );
        console.log(response);
        setOrder(response.data);
    };
    useEffect(() => {
        fetchOrder();
    }, []);

    return (
        <Result
            status="success"
            title="You have successfully paid"
            subTitle={`Order number:  Cloud server configuration takes 1-5 minutes, please wait.`}
            extra={[
                <Link to="/">
                    <Button type="primary">Go homepage</Button>
                </Link>,
            ]}
        />
    );
};
export default SuccessPage;
