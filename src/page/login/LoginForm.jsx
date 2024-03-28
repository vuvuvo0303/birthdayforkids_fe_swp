/* eslint-disable react/prop-types */
import { getAuth, signInWithPopup } from "firebase/auth";
import { provider } from "../../config/firebase";
import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import api from "../../config/axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "../../redux/features/userSlice";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginGoogle = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const token = await result.user.getIdToken();
        const response = await api.post("/authentication/logingg", {
          token: token,
        });
        dispatch(login(response.data));
        toast.success("Login successfully");
        navigate("/dashboard");
        localStorage.setItem("token", response.data.token);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const onFinish = async (values) => {
    try {
      const response = await api.post("http://birthdayblitzhub.online:8080/auth/login", values);
      console.log(response.data);
      localStorage.setItem("logged-user", JSON.stringify(response.data));
      localStorage.setItem("token", JSON.stringify(response.data.tokens));
      dispatch(login(response.data));
      toast.success("Login successfully");
      if (response.data.role === "Guest" || response.data.role === "Host") {
        navigate("/");
      } else if (response.data.role === "Admin") {
        navigate("/dashboard/admin");
      }
    } catch (e) {
      toast.error("Login fail");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <h1>Sign-In</h1>
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
            label="Email"
            name="email"
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
          <Flex justifyContent="center">
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ width: "300px" }}>
                Login
              </Button>
            </Form.Item>
          </Flex>
        </Form>
        {/* <Flex
          onClick={loginGoogle}
          cursor="pointer"
          bgColor="white"
          p={1}
          justifyContent="center"
          borderRadius="5px"
          alignItems="center"
          gap="5px"
        >
          <Image src="https://cdn.iconscout.com/icon/free/png-256/free-google-1772223-1507807.png" h="15px"></Image>
          Login with Google
        </Flex> */}
        <Box mt="10px">
          <Text fontSize="small" textAlign="center">
            Don&apos;t have an account?&nbsp;
            <Link to="/register">
              <Box as="strong" cursor="pointer">
                Sign up Here
              </Box>
            </Link>
          </Text>
        </Box>
      </div>
    </div>
  );
};

export default LoginForm;
