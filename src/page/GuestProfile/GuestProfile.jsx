import React, { useState, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
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
} from "antd";
import {
    Cascader,
    Checkbox,
    ColorPicker,
    DatePicker,
    InputNumber,
    Select,
    Slider,
    Switch,
    TreeSelect,
} from "antd";
import { HomeOutlined, UploadOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import api from "../../config/axios";
import { login } from "../../redux/features/userSlice";
import { HeaderLogin } from "../../component/HeaderLogin";
import { Image } from "antd";
import uploadFile from "../../utils/upload";
export const GuestProfile = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [initLoading, setInitLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [avatarFile, setAvatarFile] = useState(null);
    const loggedUser = useSelector((store) => store.user);
    const [editUser, setEditUser] = useState({});
    const dispatch = useDispatch();

    const { RangePicker } = DatePicker;
    const { TextArea } = Input;

    const [componentDisabled, setComponentDisabled] = useState(true);

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

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
    //     setEditUser((state) => {
    //         return { ...state, avatar: URL.createObjectURL(avatarFile) };
    //     });
    // }

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
        <div>
            <HeaderLogin />
            <div className="container update-userProfile">
                <Breadcrumb
                    style={{ margin: "16px 0" }}
                    items={[
                        { href: "/", title: <HomeOutlined /> },

                        { title: "Update Profile" },
                    ]}
                />
                <div style={{ padding: "0 24px" }}>
                    <h1 className="heading">Your Profile</h1>
                    <div className="list-infoProfile">
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
                                    <Form
                                        labelCol={{
                                            span: 4,
                                        }}
                                        wrapperCol={{
                                            span: 14,
                                        }}
                                        layout="horizontal"
                                        disabled={componentDisabled}
                                        style={{
                                            maxWidth: 600,
                                        }}
                                    >
                                        <Form.Item label="Name">
                                            <Input value={loggedUser.name} />
                                        </Form.Item>
                                        <Form.Item label="Email">
                                            <Input value={loggedUser.email} />
                                        </Form.Item>
                                        <Form.Item label="Gender">
                                            <Input value={loggedUser.gender} />
                                        </Form.Item>
                                        <Form.Item label="Phone">
                                            <Input value={loggedUser.phone} />
                                        </Form.Item>
                                    </Form>
                                    <Image
                                        width={200}
                                        src={loggedUser.avatar}
                                        alt="Avatar"
                                        // style={{ width: 100, marginLeft: 20 }}
                                    />
                                    <img />
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
                                onFinish={(values) =>
                                    handleUpdateProfile(values)
                                }
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
                                            message:
                                                "Please input your Gender!",
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
                </div>
            </div>
        </div>
    );
};
