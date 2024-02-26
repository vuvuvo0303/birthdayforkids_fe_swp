import React, { useState, useContext } from "react";
import { Button, message, Steps, ConfigProvider, Form, Input } from "antd";

const { Step } = Steps;
const { Item } = Form;

const steps = [
  {
    title: "First",
    content: () => <FirstStepContent />,
  },
  {
    title: "Second",
    content: "Second-content",
  },
  {
    title: "Last",
    content: "Last-content",
  },
  {
    title: "Last",
    content: "Last-content",
  },
  {
    title: "Last",
    content: "Last-content",
  },
  {
    title: "Last",
    content: "Last-content",
  },
];

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
    <>
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
            onClick={() => message.success("Processing complete!")}
          >
            Done
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div>
    </>
  );
};

const FirstStepContent = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Received values of form:", values);
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Item>
      <Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
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
