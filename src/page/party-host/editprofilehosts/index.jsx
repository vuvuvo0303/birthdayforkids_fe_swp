import React, { useState, useEffect } from "react";
import { Breadcrumb, List, Avatar, Skeleton, Button, Modal, Form, Upload, Input } from "antd";
import { HomeOutlined, UploadOutlined } from "@ant-design/icons";
import "./index.css"; // Import tập tin CSS

const EditProfileHosts = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initLoading, setInitLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [avatarFile, setAvatarFile] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    setTimeout(() => {
      const mockData = [
        {
          id: 1,
          name: "John Doe",
          avatar: "https://via.placeholder.com/150",
          username: "john.doe",
          email: "john.doe@example.com",
          password: "password123",
          phone: "xxxxxxxxxx",
          gender: "Male",
        },
      ];
      setData(mockData);
      setLoading(false);
      setInitLoading(false);
    }, 1000);
  };

  const handleEdit = (item) => {
    form.setFieldsValue(item);
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const handleSave = () => {
    form.validateFields().then((values) => {
      const newData = data.map((item) => (item.id === values.id ? { ...item, ...values } : item));
      setData(newData);
      setModalVisible(false);
    });
  };

  const handleAvatarChange = (info) => {
    if (info.file.status === "done") {
      setAvatarFile(info.file.originFileObj);
    }
  };

  const uploadProps = {
    name: "avatar",
    action: "#",
    onChange: handleAvatarChange,
    showUploadList: false,
  };

  return (
    <>
      <Breadcrumb
        style={{ margin: "16px 0" }}
        items={[
          { href: "/homepage", title: <HomeOutlined /> },
          { href: "", title: "Hosts" },
          { title: "Update Profile" },
        ]}
      />
      <div style={{ padding: "0 24px" }}>
        <h1>Update Profile</h1>
        <List
          className="demo-loadmore-list"
          loading={initLoading}
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Button key="edit" onClick={() => handleEdit(item)}>
                  Edit
                </Button>,
              ]}
            >
              <Skeleton avatar title={false} loading={loading} active>
                <List.Item.Meta
                  avatar={<Avatar src={item.avatar} />}
                  title={item.username} // Thay đổi phần này
                  description={
                    <div className="description-container">
                      <div className="description-item username">Username: {item.username}</div>
                      <div className="description-item email">Email: {item.email}</div>
                      <div className="description-item password">Password: {item.password}</div>
                      <div className="description-item gender">Gender: {item.gender}</div>
                      <div className="description-item phone">Phone: {item.phone}</div>
                    </div>
                  }
                />
              </Skeleton>
              <img src={item.avatar} alt="Avatar" style={{ width: 100, marginLeft: 20 }} />
            </List.Item>
          )}
        />
        <Modal title="Edit Profile" visible={modalVisible} onCancel={handleCancel} onOk={handleSave}>
          <Form
            form={form}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={(values) => console.log("Received values:", values)}
          >
            <Form.Item label="Username" name="username">
              <Input />
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
              label="Gender"
              name="gender"
              rules={[
                {
                  required: true,
                  message: "Please input your Gender!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Phone Number"
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Please input your phone!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />}>Upload Avatar</Button>
            </Upload>
            {avatarFile && (
              <img src={URL.createObjectURL(avatarFile)} alt="Avatar Preview" style={{ width: 100, marginTop: 10 }} />
            )}
            <Form.Item name="id" noStyle>
              <Input type="hidden" />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
};

export default EditProfileHosts;
