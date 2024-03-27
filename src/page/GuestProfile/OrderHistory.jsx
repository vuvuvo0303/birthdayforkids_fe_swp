import React from "react";

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import { Button, Form, Input, Modal, Rate, Tag } from "antd";
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

    const fetchData = async (id) => {
        const response = await axios.get(
            `http://birthdayblitzhub.online:8080/api/orders/guest/${id}`
        );
        console.log("data :", response.data);
        setData(response.data);
    };

    useEffect(() => {
        fetchData(loggedUser.accountID);
    }, []);

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

    return (
        <div className="container table-orderHistory">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">NO</th>
                        <th scope="col">Name</th>
                        {/* <th scope="col">Quantity</th> */}
                        <th scope="col">Total Price</th>
                        <th scope="col">Description</th>
                        <th scope="col">Action</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <th scope="row">{index}</th>
                            {/* <td>{data.id}</td> */}
                            <td>{item.packageEntity.name}</td>
                            {/* <td>{item.quantity}</td> */}
                            <td>{item.totalPrice}</td>
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
                                    <Tag
                                        icon={<SyncOutlined spin />}
                                        color="processing"
                                    >
                                        PAID
                                    </Tag>
                                )}
                                {item.status === "ORDERED" && (
                                    <Tag
                                        icon={<SyncOutlined spin />}
                                        color="processing"
                                    >
                                        ORDERED
                                    </Tag>
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
                                    <Tag
                                        icon={<SyncOutlined spin />}
                                        color="processing"
                                    >
                                        ACCEPTED
                                    </Tag>
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
