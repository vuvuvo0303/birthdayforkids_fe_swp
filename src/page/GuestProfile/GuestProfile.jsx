import React from "react";
import { HeaderLogin } from "../../component/HeaderLogin";
import { SidebarGuest } from "./SidebarGuest";
import { Button, Form, Input, Radio } from "antd";

export const GuestProfile = () => {
    return (
        <div>
            <HeaderLogin />
            <div className="container ">
                <section class="user-profile">
                    <h1 class="heading">your profile</h1>
                    <section className="form-container">
                        <div class="info">
                            <div class="user">
                                <img src="img/pic-1.jpg" alt="" />
                                <h3>shaikh anas</h3>
                                <p>student</p>
                                <Form.Item
                                    label="Name"
                                    name="name"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please input your FullName",
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
                                            message:
                                                "Please input your password!",
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

                                <a href="#!" class="btn">
                                    update profile
                                </a>
                            </div>
                        </div>
                    </section>
                </section>
            </div>
            <SidebarGuest />
        </div>
    );
};
