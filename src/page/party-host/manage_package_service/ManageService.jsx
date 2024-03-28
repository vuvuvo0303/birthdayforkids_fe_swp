import { InboxOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Space, Table, message } from "antd";
import Dragger from "antd/es/upload/Dragger";
import { useEffect, useState } from "react";
import api from "../../../config/axios";
import uploadFile from "../../../utils/upload";
import { toast } from "react-toastify";
import UpdateServiceButton from "./UpdateServiceButton";
const ManageService = ({ packageID, fetchPakage }) => {
    const [form] = Form.useForm();
    const [showAddPackage, setShowService] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    const [rerenderKey, setRerenderKey] = useState(0);
    const forceRerender = () => {
        setRerenderKey(rerenderKey + 1);
    };
    // const data = [
    //   {
    //     key: "1",
    //     name: "John Brown",
    //     age: 32,
    //     address: "New York No. 1 Lake Park",
    //     tags: ["nice", "developer"],
    //   },
    //   {
    //     key: "2",
    //     name: "Jim Green",
    //     age: 42,
    //     address: "London No. 1 Lake Park",
    //     tags: ["loser"],
    //   },
    //   {
    //     key: "3",
    //     name: "Joe Black",
    //     age: 32,
    //     address: "Sydney No. 1 Lake Park",
    //     tags: ["cool", "teacher"],
    //   },
    // ];
    const onSubmit = async (values) => {
        console.log(values);
        if (values.picture.file) {
            const url = await uploadFile(values.picture.file.originFileObj);
            values.picture = url;
        }
        try {
            values.packageId = packageID;
            const response = await api.post(
                `/api/services/addServiceToPackage/${values.packageId}`,
                {
                    ...values,
                }
            );
            console.log(response.data);
            form.resetFields();
            setShowService(false);
            fetchService();
            fetchPakage && fetchPakage();
            toast.success("Add successfully");
        } catch (error) {
            console.error("Error submitting Service:", error);
        }
    };
    const fetchService = async () => {
        try {
            const response = await api.get(
                `/api/services/package/${packageID}`
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

    useEffect(() => {
        fetchService();
    }, [rerenderKey]);

    const handleDelete = async (record) => {
        console.log(record);
        try {
            const confirmed = window.confirm(
                "Are you sure you want to delete this service?"
            );
            if (!confirmed) {
                return;
            }
            const response = await api.delete(
                `/api/services/${record.serviceID}/${packageID}`
            );
            console.log(response.data);

            const newData = dataSource.filter(
                (item) => item.serviceID !== record.serviceID
            );
            setDataSource(newData);
            toast.success("Delete Service successfully!");
            fetchService();
            fetchPakage && fetchPakage();
        } catch (error) {
            console.error("Error deleting serviceID:", error);
            message.error("Failed to delete serviceID");
        }
    };
    useEffect(() => {
        fetchService();
    }, []);

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
                // Định dạng giá thành VND
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
                    alt="Service"
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
    const props = {
        name: "file",
        multiple: false,
        action: "URL_API_UPLOAD_IMAGE",
    };
    return (
        <>
            <Button
                style={{
                    marginBottom: 10,
                }}
                type="primary"
                onClick={() => setShowService(true)}
            >
                Add Service
            </Button>
            <Table columns={columns} dataSource={dataSource} />
            <Modal
                visible={showAddPackage}
                title="Create Service"
                okText="Add"
                onCancel={() => setShowService(false)}
                onOk={() => {
                    form.submit();
                }}
            >
                <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    onFinish={onSubmit}
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
                        <Input
                            addonAfter="VND" // Hiển thị tiền tệ là VND bên phải trường nhập liệu
                            type="number" // Để đảm bảo chỉ có thể nhập số
                        />
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
                    <Form.Item
                        label="Image"
                        name="picture"
                        rules={[
                            {
                                required: true,
                                message: "Image must not be blank",
                            },
                        ]}
                    >
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

export default ManageService;
