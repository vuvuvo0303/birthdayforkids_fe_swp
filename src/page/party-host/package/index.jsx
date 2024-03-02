import React, { useState } from "react";
import { Button, Form, Input, Modal, Space, Table, Tag, Breadcrumb, message } from "antd";
import Dragger from "antd/es/upload/Dragger";
import { InboxOutlined, HomeOutlined, UserOutlined } from "@ant-design/icons";
import axios from "axios";

const { Column } = Table;

const PackagePage = () => {
  const [open, setOpen] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  const handleDelete = (record) => {
    const newData = dataSource.filter((item) => item.key !== record.key);
    setDataSource(newData);
    message.success("Package deleted successfully!");
  };

  const onFinish = async (values) => {
    try {
      const response = await axios.post("/api/packages", values);
      console.log(response);
      const newData = [...dataSource, response.data];
      setDataSource(newData);
      setOpen(false);
      message.success("Package added successfully!");
    } catch (error) {
      console.error("Error creating package:", error);
      message.error("Failed to add package. Please try again.");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const props = {
    name: "file",
    multiple: false,
    action: "URL_API_UPLOAD_IMAGE",
    onChange(info) {
      const { status } = info.file;
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <>
      <Breadcrumb
        items={[
          {
            href: "/homepage",
            title: <HomeOutlined />,
          },
          {
            href: "",
            title: (
              <>
                <UserOutlined />
                <span>Hosts</span>
              </>
            ),
          },
          {
            title: "Package",
          },
        ]}
      />
      <h1>Package</h1>
      <Button type="primary" onClick={() => setOpen(true)}>
        Add
      </Button>
      <Table dataSource={dataSource}>
        <Column title="Name" dataIndex="name" key="name" />
        <Column title="Price" dataIndex="price" key="price" />
        <Column title="Description" dataIndex="description" key="description" />
        <Column
          title="Image"
          dataIndex="image"
          key="image"
          render={(text, record) => <img src={record.image} alt="Image" style={{ width: "50px", height: "50px" }} />}
        />
        <Column
          title="Actions"
          key="action"
          render={(text, record) => (
            <Space size="middle">
              <Button type="primary" danger onClick={() => handleDelete(record)}>
                Delete
              </Button>
            </Space>
          )}
        />
      </Table>
      <Modal title="Create Package" visible={open} onCancel={() => setOpen(false)} footer={null}>
        <Form
          name="basic"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item label="Name" name="name" rules={[{ required: true, message: "Name must not be blank" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Price" name="price" rules={[{ required: true, message: "Price must not be blank" }]}>
            <Input suffix="VND" />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Description must not be blank" }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item label="Image" name="image" rules={[{ required: true, message: "Image must not be blank" }]}>
            <Dragger {...props}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
            </Dragger>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Space>
              <Button onClick={() => setOpen(false)} type="primary" danger>
                Cancel
              </Button>{" "}
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default PackagePage;
