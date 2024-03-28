import { Button, Calendar, DatePicker, Form, Input, Select, theme } from "antd";
import Item from "antd/es/list/Item";
import React, { useEffect, useState } from "react";
import api from "../../config/axios";
import { useDispatch, useSelector } from "react-redux";
import { updateInformation } from "../../redux/features/bookingSlice";
import { useParams } from "react-router-dom";
import moment from "moment";

export const FillInformation = ({ form, setCurrent, current }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [dateError, setDateError] = useState("");
  const [schedule, setSchedule] = useState([]);
  const [busy, setBusy] = useState();
  const dispatch = useDispatch();
  const { accountID } = useParams();

  const info = useSelector((store) => store.booking.information);
  const fetchSchedule = async () => {
    const response = await api.get(`/api/schedules/${accountID}`);
    console.log(response);
    setSchedule(
      response.data.map((item) => {
        return {
          label: item.time,
          value: item.id,
        };
      })
    );
  };

  const fetchBusyDate = async () => {
    const response = await api.get(`/api/schedulebusy/getAllBusySchedule/${accountID}`);
    setBusy(response.data.map((item) => moment(item.date)));
  };

  useEffect(() => {
    fetchSchedule();
    fetchBusyDate();
    form.setFieldsValue(info);
  }, []);

  const onFinish = (values) => {
    values.dateString = moment(values.date.$d).format("DD-MM-YYYY");
    values.timeString = schedule.filter((item) => item.value === values.scheduleId)[0].label;
    console.log(values);
    dispatch(updateInformation(values));
    setCurrent(current + 1);
  };
  const { token } = theme.useToken();
  const wrapperStyle = {
    width: 300,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };
  const onPanelChange = (value, mode) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };
  return (
    <>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Email" name="email" rules={[{ required: true, message: "Please input your Email!" }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Phone Number"
          name="phoneNumber"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item label="Venue" name="venue" rules={[{ required: true, message: "Please input your Venue" }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Note" name="note" rules={[{ required: true, message: "Please input your Note" }]}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="time" name={"scheduleId"} rules={[{ required: true, message: "Please input your time" }]}>
          <Select
            style={{
              width: 120,
            }}
            options={schedule}
          />
        </Form.Item>
        <Form.Item
          label="Schedule"
          name="date"
          rules={[
            {
              required: true,
              message: "Please input your reservation date",
            },
          ]}
        >
          <DatePicker
            disabledDate={(currentDate) => {
              console.log(busy);

              if (busy) {
                for (let i = 0; i < busy.length; i++) {
                  if (busy[i].valueOf() === currentDate.startOf("d").valueOf()) {
                    return true;
                  }
                }
              }

              let expirationDate = moment(moment.now()).add(7, "d");
              if (currentDate.startOf("d").valueOf() < expirationDate.valueOf()) {
                return true;
              }
              return false;
            }}
            fullscreen={false}
            onPanelChange={onPanelChange}
          />
        </Form.Item>
      </Form>
    </>
  );
};
export default FillInformation;
