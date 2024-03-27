/* eslint-disable react/prop-types */
import { useState } from "react";
import "./index.css";
import React from "react";
// import { getAuth, signInWithPopup } from "firebase/auth";
// import { provider } from "../../config/firebase";
import { Button, Form, Input, Modal, Radio, Upload } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import api from "../../config/axios";
import { toast } from "react-toastify";
import uploadFile from "../../utils/upload";
import { Box, Text, Flex } from "@chakra-ui/layout";
import { Checkbox, CheckboxGroup } from "@chakra-ui/react";
import PolicyButton from "./PolicyButton";
const Register = () => {
    const navigate = useNavigate();

    // const loginGoogle = () => {
    //   const auth = getAuth();
    //   signInWithPopup(auth, provider)
    //     .then((result) => {
    //       console.log(result);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // };

    const onFinish = async (values) => {
        let url = "";
        if (values.avatar.file) {
            url = await uploadFile(values.avatar.file.originFileObj);
        }
        console.log("VALUE " + JSON.stringify(values));
        const response = await api.post("/auth/register", {
            ...values,
            avatar: url,
        });
        toast.success("successfully register accounts!");
        navigate("/login");
    };
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [previewTitle, setPreviewTitle] = useState("");
    const [fileList, setFileList] = useState([]);
    const handleCancel = () => setPreviewOpen(false);
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(
            file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
        );
    };
    const handleChange = ({ fileList: newFileList }) =>
        setFileList(newFileList);
    const uploadButton = (
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
    );

    return (
        <div>
            <div>
                <h1>Sign-Up</h1>
                <div>
                    <Form
                        name="basic"
                        labelCol={{
                            span: 24,
                        }}
                        wrapperCol={{
                            span: 24,
                        }}
                        style={{
                            maxWidth: 600,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Name",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your password!",
                                },
                            ]}
                        >
                            <Input.Password />
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
              <Input />
            </Form.Item>
            <Form.Item
              label="Phone Number"
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Please input your Phone Number",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Gender"
              name="gender"
              rules={[
                {
                  required: true,
                  message: "Please input gender!",
                },
              ]}
            >
              <Radio.Group defaultValue={"MALE"}>
                <Radio value={"MALE"}>Male</Radio>
                <Radio value={"FEMALE"}>Female</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              label="Role"
              name="role"
              rules={[
                {
                  required: true,
                  message: "Please choose your role",
                },
              ]}
            >
              <Radio.Group defaultValue={"Guest"}>
                <Radio value={"Guest"}>Guest</Radio>
                <Radio value={"Host"}>Host</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              label="Avatar"
              name="avatar"
              // rules={[
              //   {
              //     required: true,
              //     message: "Please upload your Avatar",
              //   },
              // ]}
            >
              <Upload
                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                maxCount={1}
              >
                {fileList.length >= 8 ? null : uploadButton}
              </Upload>
            </Form.Item>
            <Form.Item
              name="policy"
              valuePropName="checked" 
              rules={[
                {
                  validator: (_, value) => {
                    if (!value) {
                      return Promise.reject("Please tick policy");
                    } else {
                      return Promise.resolve();
                    }
                  },
                },
              ]}
            >
              <Flex justifyContent="center" mb={5}>
                <Checkbox w="fit-content" size="lg" fontWeight="normal">
                  Agree to Terms and Conditions
                </Checkbox>
                &nbsp; <PolicyButton />
              </Flex>
            </Form.Item>

                        <Flex justifyContent="center">
                            <Form.Item
                                wrapperCol={{
                                    span: 16,
                                }}
                            >
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    style={{ width: "300px" }}
                                >
                                    Sign up
                                </Button>
                            </Form.Item>
                        </Flex>
                    </Form>
                    <div>
                        <Text fontSize="small" textAlign="center">
                            Have an account?&nbsp;
                            <Link to="/login">
                                <Box as="strong" cursor="pointer">
                                    Login Here
                                </Box>
                            </Link>
                        </Text>
                    </div>
                </div>
            </div>
            <Modal
                open={previewOpen}
                title={previewTitle}
                footer={null}
                onCancel={handleCancel}
            >
                <img
                    alt="example"
                    style={{
                        width: "100%",
                    }}
                    src={previewImage}
                />
            </Modal>
        </div>
    );
};
export default Register;

function getBase64(originFileObj) {
    throw new Error("Function not implemented.");
}
