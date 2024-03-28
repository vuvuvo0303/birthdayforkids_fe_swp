import React from "react";

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import { Button, Form, Input, Modal, Rate, Tag, message } from "antd";
import { useSelector } from "react-redux";
import api from "../../config/axios";
import { toast } from "react-toastify";
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    SyncOutlined,
} from "@ant-design/icons";

export const OrderHistory = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [orderId, setOrderId] = useState();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const loggedUser = useSelector((store) => store.user);
    const navigate = useNavigate();
    const [isPaymentContinued, setIsPaymentContinued] = useState(false);
    const [isCanceling, setIsCanceling] = useState(false);

    const fetchData = async (id) => {
        const response = await axios.get(
            `http://birthdayblitzhub.online:8080/api/orders/guest/${id}`
        );
        console.log("data :", response.data);
        setData(response.data);
    };

    useEffect(() => {
        fetchData(loggedUser.accountID);
    }, [data]);

    const [form] = Form.useForm();

    const handleOk = async () => {
        form.submit();
    };

    const handleCancel = () => {
        setModalVisible(false);
    };

    const onSubmit = async (values) => {
        console.log(values);
        await api.post(`/api/feedbacks/addFeedback/${orderId}`, values);
        toast.success("Success!!!");
        form.resetFields();
        setModalVisible(false);
    };

    const handleContinuePay = async () => {
        try {
            const response = await axios.post(
                `http://birthdayblitzhub.online:8080/api/orders/pay-ordered-payment/${orderId}`
            );

            console.log(response.data);
            setIsPaymentContinued(true);
            const indexOfHttps = response.data.indexOf("https://");
            const url = response.data.substring(indexOfHttps);

            window.open(url, "_self");
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleCancelOrder = async (orderId) => {
        try {
            const confirmed = window.confirm(
                "Are you sure you want to cancel this order?"
            );
            if (!confirmed) {
                return;
            }

            setIsCanceling(true);

            const response = await axios.put(
                `http://birthdayblitzhub.online:8080/api/orders/guest/cancel-order/${orderId}`
            );
            console.log("Cancel: ", response.data);

            if (response.data.success) {
                // message.success("Order canceled successfully");
                setIsCanceling(false);
                fetchData(loggedUser.accountID);
            }
            message.success("Order canceled successfully");
        } catch (error) {
            console.error("Error:", error);
            message.error("Failed to cancel order");
        } finally {
            setIsCanceling(false);
        }
    };

    const handleDoneOrder = async (orderId) => {
        try {
            const response = await axios.post(
                `http://birthdayblitzhub.online:8080/api/orders/guest/done-order/${orderId}`
            );
            const done = await response.data.success;
            if (done) {
                // message.success("Order marked as done successfully");

                const updatedData = data.map((item) => {
                    if (item.orderID === orderId) {
                        return { ...item, status: "DONE" };
                    }
                    return item;
                });
                fetchData(loggedUser.accountID);
                setData(updatedData);
            }
            message.success("Order marked as done successfully");
        } catch (error) {
            console.error("Error:", error);
            message.error("Failed to done order");
        }
        // console.log(response.data);
    };
    return (
        <div className=" table-orderHistory">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">NO</th>
                        <th scope="col">Name</th>
                        {/* <th scope="col">Quantity</th> */}
                        <th scope="col">Total Price</th>
                        <th scope="col">Deposit</th>
                        <th scope="col">Remaining Amount</th>
                        <th scope="col">Description</th>
                        <th scope="col">Action</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            {/* <td>{data.id}</td> */}
                            <td>{item.packageEntity.name}</td>
                            {/* <td>{item.quantity}</td> */}
                            <td>
                                {" "}
                                {new Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                }).format(item.totalPrice)}
                            </td>
                            <td>
                                {" "}
                                {new Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                }).format(item.depositedMoney)}
                            </td>
                            <td>
                                {" "}
                                {new Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                }).format(item.remainingMoney)}
                            </td>
                            <td>{item.packageEntity.description}</td>

                            <td>
                                <Button>
                                    <Link
                                        to={`http://localhost:5173/packageDetail/${item.packageEntity.packageID}`}
                                    >
                                        Detail
                                    </Link>
                                </Button>
                                {item.status === "DONE" && (
                                    <Button
                                        onClick={() => {
                                            setModalVisible(true);
                                            setOrderId(item.orderID);
                                        }}
                                    >
                                        FeedBack
                                    </Button>
                                )}
                            </td>
                            <td>
                                {item.status === "DONE" && (
                                    <Tag
                                        icon={<CheckCircleOutlined />}
                                        color="success"
                                    >
                                        DONE
                                    </Tag>
                                )}
                                {item.status === "PAID" && (
                                    <div>
                                        <Tag
                                            icon={<SyncOutlined spin />}
                                            color="processing"
                                        >
                                            PAID
                                        </Tag>
                                        <Button
                                            type="default"
                                            onClick={() =>
                                                handleCancelOrder(item.orderID)
                                            }
                                            loading={isCanceling}
                                            danger
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                )}
                                {item.status === "ORDERED" && (
                                    <div>
                                        <Tag
                                            icon={<SyncOutlined spin />}
                                            color="processing"
                                        >
                                            ORDERED
                                        </Tag>
                                        <Button
                                            type="primary"
                                            onClick={() => {
                                                setOrderId(item.orderID);
                                                handleContinuePay();
                                            }}
                                        >
                                            Continue Pay
                                        </Button>
                                        <Button
                                            type="default"
                                            onClick={() =>
                                                handleCancelOrder(item.orderID)
                                            }
                                            loading={isCanceling}
                                            danger
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                )}
                                {item.status === "REFUSESD" && (
                                    <Tag
                                        icon={<CloseCircleOutlined />}
                                        color="error"
                                    >
                                        REFUSED
                                    </Tag>
                                )}
                                {item.status === "ACCEPTED" && (
                                    <div>
                                        <Tag
                                            icon={<SyncOutlined spin />}
                                            color="processing"
                                        >
                                            ACCEPTED
                                        </Tag>
                                        <Button
                                            type="default"
                                            onClick={() => {
                                                handleDoneOrder(item.orderID);
                                            }}
                                        >
                                            Done
                                        </Button>
                                        <Button
                                            type="default"
                                            onClick={() =>
                                                handleCancelOrder(item.orderID)
                                            }
                                            loading={isCanceling}
                                            danger
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                )}
                                {item.status === "CANCELLED" && (
                                    <Tag
                                        icon={<CloseCircleOutlined />}
                                        color="error"
                                    >
                                        CANCELLED
                                    </Tag>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal
                title="Rating and Feedback"
                open={modalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} layout="vertical" onFinish={onSubmit}>
                    <Form.Item
                        label="Rating"
                        name="rating"
                        rules={[
                            {
                                required: true,
                                message: "Please rate this item!",
                            },
                        ]}
                    >
                        <Rate />
                    </Form.Item>

                    <Form.Item
                        label="description"
                        name="description"
                        rules={[
                            {
                                required: true,
                                message: "Please provide feedback!",
                            },
                        ]}
                    >
                        <Input.TextArea rows={4} />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};
