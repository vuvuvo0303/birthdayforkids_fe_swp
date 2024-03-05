import { Button, Calendar, Form, Input, Select, theme } from "antd";
import Item from "antd/es/list/Item";
import React, { useEffect, useState } from "react";
import api from "../../config/axios";
import { useDispatch, useSelector } from "react-redux";
import { updateInformation } from "../../redux/features/bookingSlice";

export const FillInformation = ({ form, setCurrent, current }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [dateError, setDateError] = useState("");
  const [schedule, setSchedule] = useState([]);
  const dispatch = useDispatch();
  const { token } = theme.useToken();
  const info = useSelector((store) => store.booking.information);
  const fetchSchedule = async () => {
    const response = await api.get(`/api/schedules/68`);
    setSchedule(
      response.data.map((item) => {
        return {
          label: item.time,
          value: item.scheduleID,
        };
      })
    );
  };

  useEffect(() => {
    fetchSchedule();
    form.setFieldsValue(info);
  }, []);

  const onFinish = (values) => {
    console.log("Received values of form:", values);
    dispatch(updateInformation(values));
    setCurrent(current + 1);
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
        <Form.Item label="Note" name="note" rules={[{ required: true, message: "Please input your Note" }]}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="time" name={"scheduleId"} rules={[{ required: true, message: "Please input your date" }]}>
          {/* <Calendar
            onChange={(value) => {
              console.log(value);
              form.setFieldValue("date", value.$d);
            }}
            fullscreen={false}
            onPanelChange={onPanelChange}
          /> */}
          <Select
            style={{
              width: 120,
            }}
            options={schedule}
          />
        </Form.Item>
      </Form>
    </>
  );
};
export default FillInformation;
