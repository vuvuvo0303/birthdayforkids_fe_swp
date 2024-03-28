import {
    Breadcrumb,
    Button,
    Form,
    Input,
    Modal,
    Space,
    Table,
    Tag,
    message,
} from "antd";
import Dragger from "antd/es/upload/Dragger";
import React, { useEffect, useState } from "react";
import { InboxOutlined, HomeOutlined, UserOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import api from "../../../config/axios";
import uploadFile from "../../../utils/upload";
import { toast } from "react-toastify";
import UpdateServiceButton from "./UpdateServiceBuuton";
import { useSelector } from "react-redux";

export const ManageSevices = () => {
    const [form] = useForm();
    const [showAddPackage, setShowPackage] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    const [rerenderKey, setRerenderKey] = useState(0);
    const loggedUser = useSelector((store) => store.user);
    const forceRerender = () => {
        setRerenderKey(rerenderKey + 1);
    };

    const fetchService = async () => {
        try {
            const response = await api.get(
                `/api/services/host/${loggedUser.accountID}`
            );
            if (response.data) {
                setDataSource(response.data.filter((item) => !item.deleted));
            } else {
                setDataSource([]);
            }
        } catch (error) {
            console.error("Error fetching services:", error);
            message.error("Error fetching services. Please try again later.");
        }
    };

    const onSubmit = async (values) => {
        if (values.picture.file) {
            const url = await uploadFile(values.picture.file.originFileObj);
            values.picture = url;
        }

        try {
            const response = await api.post("/api/services/addService", {
                ...values,
            });
            console.log(response.data);
            form.resetFields();
            setShowPackage(false);
            fetchService();
            toast.success("Add successfully");
        } catch (error) {
            console.error("Error submitting package:", error);
        }
    };

    useEffect(() => {
        fetchService();
    }, [rerenderKey]);
    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
            render: (price) => {
                const formattedPrice = new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                }).format(price);
                return formattedPrice;
            },
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
        },

        {
            title: "Picture",
            dataIndex: "picture",
            key: "picture",
            render: (text, record) => (
                <img
                    src={record.picture}
                    alt="Package"
                    style={{ width: 100, height: 100 }}
                />
            ),
        },
        {
            title: "Action",
            key: "action",
            render: (text, record) => (
                <Space size="middle">
                    <Button
                        type="primary"
                        danger
                        onClick={() => handleDelete(record)}
                    >
                        Delete
                    </Button>
                    <UpdateServiceButton
                        record={record}
                        forceRerender={forceRerender}
                    />
                </Space>
            ),
        },
    ];

    const handleDelete = async (record) => {
        try {
            const confirmed = window.confirm(
                "Are you sure you want to delete this service?"
            );
            if (!confirmed) {
                return;
            }
            const response = await api.delete(
                `/api/services/${record.serviceID}`
            );
            console.log(response.data);

            const newData = dataSource.filter(
                (item) => item.serviceID !== record.serviceID
            );
            setDataSource(newData);
            toast.success("Delete service successfully!");
        } catch (error) {
            console.error("Error deleting serviceID:", error);
            message.error("Failed to delete serviceID");
        }
    };
    useEffect(() => {
        fetchService();
    }, []);
    const props = {
        name: "file",
        multiple: false,
        action: "URL_API_UPLOAD_IMAGE",
    };
    return (
        <>
            <Breadcrumb
                items={[
                    {
                        href: "/",
                        title: <HomeOutlined />,
                    },
                    {
                        href: "",
                        title: (
                            <>
                                <UserOutlined />
                                <span>Hosts</span>
                            </>
                        ),
                    },
                    {
                        title: "All service",
                    },
                ]}
            />{" "}
            <Button
                style={{
                    marginBottom: 10,
                }}
                type="primary"
                onClick={() => setShowPackage(true)}
            >
                Add Services
            </Button>
            <Table columns={columns} dataSource={dataSource} expandable={{}} />
            <Modal
                open={showAddPackage}
                title="Create Services"
                okText="Add"
                onOk={() => form.submit()}
                onCancel={() => setShowPackage(false)}
            >
                <Form
                    onFinish={onSubmit}
                    form={form}
                    name="basic"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    //   onFinish={onFinish}
                    //   onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "Name must not be blank",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Price"
                        name="price"
                        rules={[
                            {
                                required: true,
                                message: "Price must not be blank",
                            },
                        ]}
                    >
                        <Input addonAfter="VND" type="number" />
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[
                            {
                                required: true,
                                message: "Description must not be blank",
                            },
                        ]}
                    >
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item label="Picture" name="picture">
                        <Dragger maxCount={1} {...props}>
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">
                                Click or drag file to this area to upload
                            </p>
                        </Dragger>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default ManageSevices;
