import React from "react";
import "./index.css";
import { getAuth, signInWithPopup } from "firebase/auth";
import { provider } from "../../config/firebase";
import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import api from "../../config/axios";
import { toast } from "react-toastify";
export const LoginPage = () => {
  const navigate = useNavigate();

  const loginGoogle = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        toast.success("Login successfully");
        navigate("/DashBoard/admin");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const onFinish = async (values) => {
    const response = await api.post("/authentication/login", values);
    console.log(response);
    if (response.data) {
      toast.success("Login successfully");
      navigate("/dashboard/party-host/service");
    } else {
      toast.error("Login fail");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className=" login">
      <div className="background">
        <div className="background__left"></div>
        <div className="background__right">
          <h1>Sign-In</h1>
          <div className="background__right-input">
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
                label="Username"
                name="userName"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
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

            <Button className="w-100" onClick={loginGoogle}>
              Login with Google
            </Button>
            <div>
              <p>
                Don't have an account?
                <Link to={"/register"}>
                  <strong>Signup Here</strong>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
