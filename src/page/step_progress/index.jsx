import React, { useState } from "react";
import { Button, message, Steps, Form, Input } from "antd";
import { LoadingOutlined, CheckOutlined } from "@ant-design/icons";

const { Step } = Steps;
const { Item } = Form;

const StepProgress = () => {
  const [current, setCurrent] = useState(0);
  const [step2Completed, setStep2Completed] = useState(false); // State để kiểm tra hoàn thành bước thứ hai

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const onFinishStep1 = (values) => {
    console.log("Received values of form:", values);
    next(); // Chuyển sang bước tiếp theo sau khi hoàn thành bước thứ nhất
  };

  const onFinishStep2 = (values) => {
    console.log("Received values of form:", values);
    setStep2Completed(true); // Đánh dấu bước thứ hai đã hoàn thành
    next(); // Chuyển sang bước tiếp theo sau khi hoàn thành bước thứ hai
  };

  const steps = [
    {
      title: "First",
      content: (
        <Form onFinish={onFinishStep1} layout="vertical">
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
              Next
            </Button>
          </Item>
        </Form>
      ),
    },
    {
      title: "Second",
      content: (
        <Form onFinish={onFinishStep2} layout="vertical">
          <Item
            label="Additional Information"
            name="additionalInfo"
            rules={[
              {
                required: true,
                message: "Please provide additional information!",
              },
            ]}
          >
            <Input />
          </Item>
          <Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Item>
        </Form>
      ),
    },
    {
      title: "Last",
      content: <h3>Step 3</h3>,
    },
  ];

  return (
    <>
      <Steps current={current}>
        {steps.map((item, index) => (
          <Step
            key={item.title}
            title={item.title}
            icon={
              index === 1 ? (
                step2Completed ? (
                  <CheckOutlined />
                ) : (
                  <LoadingOutlined />
                )
              ) : null
            }
          />
        ))}
      </Steps>
      <div className="steps-content">{steps[current].content}</div>
      <div className="steps-action">
        {current < steps.length - 1 && (
          <Button type="primary" onClick={next}>
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
          <Button style={{ margin: "0 8px" }} onClick={prev}>
            Previous
          </Button>
        )}
      </div>
    </>
  );
};

export default StepProgress;
