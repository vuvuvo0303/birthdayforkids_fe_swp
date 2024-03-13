import React from "react";

import { useState, useEffect } from "react";

import axios from "axios";
import { Button, Form, Input, Modal, Rate } from "antd";
import { useSelector } from "react-redux";

export const OrderHistory = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const loggedUser = useSelector((store) => store.user);

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

    const handleOk = () => {
        form.submit();
    };

    const handleCancel = () => {
        setModalVisible(false);
    };

    const onSubmit = (values) => {
        console.log(values);
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
                                <Button>Detail</Button>
                                {item.status === "DONE" && (
                                    <Button
                                        onClick={() => setModalVisible(true)}
                                    >
                                        FeedBack
                                    </Button>
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
                        label="Feedback"
                        name="feedback"
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
