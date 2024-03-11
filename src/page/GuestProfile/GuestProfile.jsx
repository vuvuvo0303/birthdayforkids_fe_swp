import React, { useState } from "react";
import { useEffect } from "react";
import { HeaderLogin } from "../../component/HeaderLogin";
import { Footer } from "../../component/Footer";
import { PlusOutlined } from "@ant-design/icons";

import {
    Button,
    Cascader,
    Checkbox,
    ColorPicker,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Radio,
    Select,
    Slider,
    Switch,
    TreeSelect,
    Upload,
} from "antd";
import { red } from "@mui/material/colors";
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const normFile = (e) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};
export const GuestProfile = () => {
    const [componentDisabled, setComponentDisabled] = useState(false);
    const [userData, setUserData] = useState({
        name: "",
        password: "",
        email: "",
        phone: "",
        gender: "",
        avatar: "",
    });

    useEffect(() => {
        if (!componentDisabled) {
            fetchUserProfile();
        }
    }, [componentDisabled]);

    const fetchUserProfile = async () => {
        try {
            const response = await fetch(
                "http://birthdayblitzhub.online:8080/auth/getUser/97",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.ok) {
                const userDataFromApi = await response.json();
                setUserData(userDataFromApi);
            } else {
                console.error("Can't use the info of User");
            }
        } catch (error) {
            console.error("Error", error);
        }
    };

    const handleUpdateProfile = async () => {
        try {
            const response = await fetch(
                "http://birthdayblitzhub.online:8080/auth/updateUser/97",
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(userData),
                }
            );

            if (response.ok) {
                console.log("Update Success");
            } else {
                console.error("Can't use the info of User");
            }
        } catch (error) {
            console.error("Error", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevUserData) => ({
            ...prevUserData,
            [name]: value,
        }));
    };
    return (
        <div>
            <HeaderLogin />
            <div className="container ">
                <section className="user-profile">
                    <h1 className="heading">your profile</h1>
                    <section className="form-container">
                        <div className="info">
                            {/* Display user profile data */}
                            <div className="user">
                                <img src={`${userData.avatar}`} alt="" />
                                <h3>{userData.name}</h3>
                                <p>{userData.email}</p>
                                <Checkbox
                                    checked={componentDisabled}
                                    onChange={(e) =>
                                        setComponentDisabled(e.target.checked)
                                    }
                                >
                                    Form disabled
                                </Checkbox>
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
                                        maxWidth: 1000,
                                    }}
                                >
                                    <Form.Item label="Name">
                                        <Input
                                            name="name"
                                            value={userData.name}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Item>
                                    <Form.Item label="Password">
                                        <Input
                                            name="password"
                                            value={userData.password}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Item>
                                    <Form.Item label="Email">
                                        <Input
                                            name="email"
                                            value={userData.email}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Item>
                                    <Form.Item label="Phone Numb ">
                                        <Input
                                            name="phone"
                                            value={userData.phone}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Item>
                                    <Form.Item label="Gender">
                                        <Radio.Group
                                            name="gender"
                                            value={userData.gender}
                                            onChange={handleInputChange}
                                        >
                                            <Radio value="apple"> Male </Radio>
                                            <Radio value="pear"> Female </Radio>
                                        </Radio.Group>
                                    </Form.Item>

                                    <Form.Item
                                        label="Upload"
                                        valuePropName="fileList"
                                        getValueFromEvent={normFile}
                                    >
                                        <Upload
                                            action="/upload.do"
                                            listType="picture-card"
                                        >
                                            <button
                                                style={{
                                                    border: 0,
                                                    background: "none",
                                                }}
                                                type="button"
                                            >
                                                <PlusOutlined />
                                                <div
                                                    style={{
                                                        marginTop: 8,
                                                    }}
                                                >
                                                    Upload
                                                </div>
                                            </button>
                                        </Upload>
                                    </Form.Item>
                                </Form>

                                <Button
                                    type="primary"
                                    onClick={handleUpdateProfile}
                                >
                                    Update Profile
                                </Button>
                            </div>
                        </div>
                    </section>
                </section>
            </div>
            <Footer />
        </div>
    );
};
