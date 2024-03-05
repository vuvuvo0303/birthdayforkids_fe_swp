import { Button, Calendar, Form, Input, theme } from "antd";
import Item from "antd/es/list/Item";
import React, { useState } from "react";
// const onPanelChange = (value, mode) => {
//   console.log(value.format("YYYY-MM-DD"), mode);
// };

export const FillInformation = () => {
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
    <>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Email" name="email" rules={[{ required: true, message: "Please input your Email!" }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Phone Number"
          name="phoneNumber"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Venue" name="venue" rules={[{ required: true, message: "Please input your Venue" }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Venue" name="venue" rules={[{ required: true, message: "Please input your Venue" }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Note" name="note" rules={[{ required: true, message: "Please input your Note" }]}>
          <Input.TextArea />
        </Form.Item>
        <Item label="Date" name={"date"} rules={[{ required: true, message: "Please input your date" }]}>
          <Calendar fullscreen={false} onPanelChange={onPanelChange} />
        </Item>

        <Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Item>
      </Form>
    </>
  );
};
export default FillInformation;
