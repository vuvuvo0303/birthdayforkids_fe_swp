import React from "react";
import "./index.css";
import { getAuth, signInWithPopup } from "firebase/auth";
import { provider } from "../../config/firebase";
import { Button, Form, Input, Radio } from "antd";
import { Link, useNavigate } from "react-router-dom";
import api from "../../config/axios";
import { toast } from "react-toastify";
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
    const response = await api.post("/auth/register", values);
    console.log(response);
    toast.success("successfully register accounts!");
    navigate("/login");
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div class=" login">
      <div class="background">
        <div className="background__left"></div>
        <div class="background__right">
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
                    message: "Please input your FullName",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              {/* <Form.Item
                label="Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              >
                <Input />
              </Form.Item> */}

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
                  <Radio value={"Hosts"}>Hosts</Radio>
                </Radio.Group>
              </Form.Item>

              {/* <Form.Item
                label="Phone Number"
                name="phoneNumber"
                rules={[
                  {
                    required: true,
                    message: "Please input your Phone Number",
                  },
                ]}
              >
                <Input />
              </Form.Item> */}
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
    </div>
  );
};
