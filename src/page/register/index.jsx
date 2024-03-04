import React, { useState } from "react";
import "./index.css";
import { getAuth, signInWithPopup } from "firebase/auth";
import { provider } from "../../config/firebase";
import { Button, Form, Input, Modal, Radio, Select, Upload } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import api from "../../config/axios";
import { toast } from "react-toastify";
import uploadFile from "../../utils/upload";
export const Register = () => {
  const navigate = useNavigate();

  const loginGoogle = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf("/") + 1));
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
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
    <div class=" login">
      <div class="background">
        <div className="background__left"></div>
        <div class="background__right">
          <div className="wrapper">
            <h1>Sign-Up</h1>
            <div class="background__right-input">
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
                  <Select
                    style={{ width: "100%" }}
                    options={[
                      { value: "MALE", label: "Male" },
                      { value: "FEMALE", label: "Female" },
                    ]}
                  />
                </Form.Item>
                <Form.Item
                  label="Role"
                  name="role"
                  rules={[
                    {
                      required: true,
                      message: "Please choose your Hosts",
                    },
                  ]}
                >
                  <Radio.Group>
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
                  wrapperCol={{
                    offset: 8,
                    span: 16,
                  }}
                >
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
              <div>
                <p>
                  Have an account?
                  <Link to={"/login"}>
                    <strong>Login Here</strong>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
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
