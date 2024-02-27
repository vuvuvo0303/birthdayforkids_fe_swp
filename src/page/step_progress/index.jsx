import React, { useState, useContext } from "react";
import { Button, message, Steps, ConfigProvider, Form, Input } from "antd";
import { HeaderLogin } from "../../component/HeaderLogin";

import "./index.css";
import { Calendar, theme } from "antd";
const { Step } = Steps;
const { Item } = Form;

const steps = [
    {
        title: "Fill information",
        content: () => <FirstStepContent />,
    },
    {
        title: "Checkout",
        content: "Second-content",
    },
    {
        title: "Payment",
        content: "Last-content",
    },
];

const onPanelChange = (value, mode) => {
    console.log(value.format("YYYY-MM-DD"), mode);
};

const StepProgress = () => {
    const [current, setCurrent] = useState(0);
    const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
    const prefixCls = getPrefixCls("steps", "ant-steps");

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    return (
        <div>
            <HeaderLogin />
            <div className="container container-progress">
                <Steps current={current} className={prefixCls}>
                    {steps.map((item) => (
                        <Step key={item.title} title={item.title} />
                    ))}
                </Steps>
                <div className={`${prefixCls}-content`}>
                    {typeof steps[current].content === "function"
                        ? steps[current].content()
                        : steps[current].content}
                </div>
                <div style={{ marginTop: 24 }}>
                    {current < steps.length - 1 && (
                        <Button type="primary" onClick={() => next()}>
                            Next
                        </Button>
                    )}
                    {current === steps.length - 1 && (
                        <Button
                            type="primary"
                            onClick={() =>
                                message.success("Processing complete!")
                            }
                        >
                            Done
                        </Button>
                    )}
                    {current > 0 && (
                        <Button
                            style={{ margin: "0 8px" }}
                            onClick={() => prev()}
                        >
                            Previous
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

const FirstStepContent = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [dateError, setDateError] = useState("");
    const onPanelChange = (value) => {
        // Perform your custom validation here
        // For example, you can check if the selected date is in the future
        const currentDate = new Date();
        if (value.isBefore(currentDate, "day")) {
            setDateError("Please select a future date.");
        } else {
            setDateError("");
            setSelectedDate(value);
        }
    };

    const { token } = theme.useToken();
    const wrapperStyle = {
        width: 300,
        border: `1px solid ${token.colorBorderSecondary}`,
        borderRadius: token.borderRadiusLG,
    };
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log("Received values of form:", values);
    };

    return (
        <Form form={form} onFinish={onFinish} layout="vertical">
            <Item
                label="Username"
                name="username"
                rules={[
                    { required: true, message: "Please input your username!" },
                ]}
            >
                <Input />
            </Item>

            <Item
                label="Email"
                name="email"
                rules={[
                    { required: true, message: "Please input your Email!" },
                ]}
            >
                <Input />
            </Item>
            <Item
                label="Phone Number"
                name="phoneNumber"
                rules={[
                    { required: true, message: "Please input your password!" },
                ]}
            >
                <Input />
            </Item>
            <Item
                label="Address"
                name="address"
                rules={[
                    { required: true, message: "Please input your address" },
                ]}
            >
                <Input />
            </Item>
            <Item
                label="Date"
                name={"date"}
                rules={[{ required: true, message: "Please input your date" }]}
            >
                <Calendar fullscreen={false} onPanelChange={onPanelChange} />
            </Item>

            <Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Item>
        </Form>
    );
};

export default StepProgress;
