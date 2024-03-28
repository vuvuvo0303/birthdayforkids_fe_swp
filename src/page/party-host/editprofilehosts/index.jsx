import React, { useState, useEffect } from "react";
import {
    Breadcrumb,
    List,
    Avatar,
    Skeleton,
    Button,
    Modal,
    Form,
    Upload,
    Input,
    Radio,
    Image,
} from "antd";
import { HomeOutlined, UploadOutlined } from "@ant-design/icons";
import "./index.css"; // Import tập tin CSS
import { useDispatch, useSelector } from "react-redux";
import api from "../../../config/axios";
import { login } from "../../../redux/features/userSlice";
import uploadFile from "../../../utils/upload";

const EditProfileHosts = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [initLoading, setInitLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [avatarFile, setAvatarFile] = useState(null);
    const loggedUser = useSelector((store) => store.user);
    const [editUser, setEditUser] = useState({});
    const dispatch = useDispatch();
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = () => {
        setLoading(true);
        setTimeout(() => {
            const mockData = [
                {
                    id: 1,
                    name: "John Doe",
                    avatar: "https://via.placeholder.com/150",
                    username: "john.doe",
                    email: "john.doe@example.com",
                    password: "password123",
                    phone: "xxxxxxxxxx",
                    gender: "Male",
                },
            ];
            setData(mockData);
            setLoading(false);
            setInitLoading(false);
        }, 1000);
    };

    const handleEdit = () => {
        form.setFieldsValue(loggedUser);
        setEditUser(loggedUser);
        setModalVisible(true);
    };

    const handleCancel = () => {
        setModalVisible(false);
    };

    const handleSave = () => {
        form.submit();
    };

    const handleAvatarChange = (info) => {
        console.log(info);
        if (info.file.status === "uploading") {
            setAvatarFile(info.file.originFileObj);
        }
    };

    const uploadProps = {
        name: "avatar",
        action: "#",
        onChange: handleAvatarChange,
        showUploadList: false,
    };

    // if (avatarFile) {
    //   setEditUser((state) => {
    //     return { ...state, avatar: URL.createObjectURL(avatarFile) };
    //   });
    // }

    // const onSubmit = async (values) => {
    // if (values.picture.file) {
    //   const url = await uploadFile(values.picture.file.originFileObj);
    //   values.picture = url;
    // // }
    // try {
    //   const response = await api.put(`auth/${loggedUser.accountID}`, {
    //     ...values,
    //   });
    //   console.log(response.data);
    // } catch (error) {
    //   console.error("Error:", error);
    // }
    // };

    const handleUpdateProfile = async (values) => {
        console.log(values);
        if (values.avatar.file) {
            const url = await uploadFile(values.avatar.file.originFileObj);
            values.avatar = url;
        }
        const response = await api.put(`auth/${loggedUser.accountID}`, values);
        setModalVisible(false);
        dispatch(login(response.data));
    };

    useEffect(() => {
        handleUpdateProfile();
    }, []);

    return (
        <>
            <Breadcrumb
                style={{ margin: "16px 0" }}
                items={[
                    { href: "/", title: <HomeOutlined /> },
                    { href: "", title: "Hosts" },
                    { title: "Update Profile" },
                ]}
            />
            <div style={{ padding: "0 24px" }}>
                <h1>Update Profile</h1>
                <List
                    className="demo-loadmore-list"
                    loading={initLoading}
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={(item) => (
                        <List.Item
                            actions={[
                                <Button
                                    key="edit"
                                    onClick={() => handleEdit(item)}
                                >
                                    Edit
                                </Button>,
                            ]}
                        >
                            <Skeleton
                                avatar
                                title={false}
                                loading={loading}
                                active
                            >
                                <List.Item.Meta
                                    avatar={<Avatar src={loggedUser.avatar} />}
                                    title={loggedUser.name}
                                    description={
                                        <div className="description-container">
                                            <div className="description-item Name">
                                                Name: {loggedUser.name}
                                            </div>
                                            <div className="description-item email">
                                                Email: {loggedUser.email}
                                            </div>

                                            <div className="description-item gender">
                                                Gender: {loggedUser.gender}
                                            </div>
                                            <div className="description-item phone">
                                                Phone: {loggedUser.phone}
                                            </div>
                                        </div>
                                    }
                                />
                            </Skeleton>
                            <img
                                src={loggedUser.avatar}
                                alt="Avatar"
                                style={{ width: 100, marginLeft: 20 }}
                            />
                        </List.Item>
                    )}
                />
                <Modal
                    title="Edit Profile"
                    visible={modalVisible}
                    onCancel={handleCancel}
                    onOk={handleSave}
                >
                    <Form
                        form={form}
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        onFinish={(values) => handleUpdateProfile(values)}
                    >
                        <Form.Item label="Name" name="name">
                            <Input name="name" />
                        </Form.Item>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your email!",
                                },
                            ]}
                        >
                            <Input name="email" />
                        </Form.Item>

                        <Form.Item
                            label="Gender"
                            name="gender"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Gender!",
                                },
                            ]}
                        >
                            <Radio.Group defaultValue={"MALE"}>
                                <Radio value={"MALE"}>Male</Radio>
                                <Radio value={"FEMALE"}>Female</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item
                            label="Phone Number"
                            name="phone"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your phone!",
                                },
                            ]}
                        >
                            <Input name="phone" />
                        </Form.Item>

                        <Form.Item
                            label="avatar"
                            name="avatar"
                            rules={[
                                {
                                    required: false,
                                },
                            ]}
                        >
                            <Upload {...uploadProps}>
                                <Button icon={<UploadOutlined />}>
                                    Upload Avatar
                                </Button>
                            </Upload>
                        </Form.Item>
                        {avatarFile ? (
                            <Image
                                src={URL.createObjectURL(avatarFile)}
                                alt="Avatar Preview"
                                width="30"
                            />
                        ) : (
                            <Image src={loggedUser.avatar} width="30" />
                        )}
                        <Form.Item name="id" noStyle>
                            <Input type="hidden" />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </>
    );
};

export default EditProfileHosts;
