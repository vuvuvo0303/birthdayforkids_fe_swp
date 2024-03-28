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
import ManageService from "./ManageService";
import UpdatePackageButton from "./UpdatePackageButton";

export const ManagePackageAndService = () => {
    const [form] = useForm();
    const [showAddPackage, setShowPackage] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    const [rerenderKey, setRerenderKey] = useState(0);
    const forceRerender = () => {
        setRerenderKey(rerenderKey + 1);
    };

    const fetchPackage = async () => {
        try {
            const response = await api.get(
                "api/packages/packages-of-host/no-variable"
            );
            console.log(response);
            setDataSource(
                response.data.map((item) => {
                    return {
                        ...item,
                        key: item.packageID,
                    };
                })
            );
        } catch (error) {
            console.error("Error fetching packages:", error);
        }
    };

    const onSubmit = async (values) => {
        if (values.picture.file) {
            const url = await uploadFile(values.picture.file.originFileObj);
            values.picture = url;
        }

        try {
            const response = await api.post("/api/packages/addPackage", {
                ...values,
            });
            console.log(response.data);
            form.resetFields();
            setShowPackage(false);
            fetchPackage();
            toast.success("Add successfully");
        } catch (error) {
            console.error("Error submitting package:", error);
        }
    };

    useEffect(() => {
        fetchPackage();
    }, [rerenderKey]);
    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Original Price",
            dataIndex: "price",
            key: "price",
            render: (price) => {
                // Định dạng giá ban đầu thành VND
                const formattedPrice = new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                }).format(price);
                return formattedPrice;
            },
        },
        {
            title: "Discount Percent",
            dataIndex: "discountPercentage",
            key: "discountPercentage",
            render: (discountPercentage) => {
                // Định dạng phần trăm giảm giá thành VND
                const formattedDiscountPercentage = discountPercentage + "%";
                return formattedDiscountPercentage;
            },
        },
        {
            title: "Discounted Price",
            dataIndex: "discountedPrice",
            key: "discountedPrice",
            render: (discountedPrice) => {
                // Định dạng giá đã giảm thành VND
                const formattedDiscountedPrice = new Intl.NumberFormat(
                    "vi-VN",
                    { style: "currency", currency: "VND" }
                ).format(discountedPrice);
                return formattedDiscountedPrice;
            },
        },

        {
            title: "Description",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Number of Slot",
            dataIndex: "maximumSlot",
            key: "maximumSlot",
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
                    <UpdatePackageButton
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
                "Are you sure you want to delete this package?"
            );
            if (!confirmed) {
                return;
            }
            const response = await api.delete(
                `/api/packages/${record.packageID}`
            );
            console.log(response.data);

            const newData = dataSource.filter(
                (item) => item.packageID !== record.packageID
            );
            setDataSource(newData);
            toast.success("Delete Package successfully!");
            fetchPackage();
        } catch (error) {
            console.error("Error deleting packageID:", error);
            message.error("Failed to delete packageID");
        }
    };
    useEffect(() => {
        fetchPackage();
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
                        title: "Package",
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
                Add Package
            </Button>
            <Table
                columns={columns}
                dataSource={dataSource}
                expandable={{
                    expandedRowRender: (record) => (
                        <ManageService
                            fetchPakage={fetchPackage}
                            packageID={record.packageID}
                        />
                    ),
                }}
            />
            <Modal
                open={showAddPackage}
                title="Create Package"
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
                        label="Discount Percentage"
                        name="discountPercentage"
                        rules={[
                            {
                                required: true,
                                message: "Price must not be blank",
                            },
                        ]}
                    >
                        <Input suffix="%" type="number" />
                    </Form.Item>
                    {/* <Form.Item label="Price" name="price" rules={[{ required: true, message: "Price must not be blank" }]}>
            <Input suffix="VND" />
          </Form.Item> */}
                    <Form.Item
                        label="Number of slot"
                        name="slot"
                        rules={[
                            {
                                required: true,
                                message: "Number of SLot must not be blank",
                            },
                        ]}
                    >
                        <Input type="number" />
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

export default ManagePackageAndService;
