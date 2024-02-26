import React, { useState } from "react";
import {
  Button,
  Form,
  Input,
  Modal,
  Space,
  Table,
  Tag,
  Breadcrumb,
  message,
} from "antd";
import Dragger from "antd/es/upload/Dragger";
import { InboxOutlined, HomeOutlined, UserOutlined } from "@ant-design/icons";
import axios from "axios";
import api from "../../../config/axios";
const { Column } = Table;
[
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Price",
    key: "price",
    dataIndex: "price",
  },
  {
    title: "Description",
    key: "description",
    dataIndex: "description",
  },
  {
    title: "Status",
    key: "status",
    dataIndex: "status",
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "loser") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "Actionas",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>Delete</a>
      </Space>
    ),
  },
  {
    title: "Image",
    key: "image",
    render: (_, record) => (
      <img
        src="data:image/jpeg;base64,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"
        alt="Image"
        style={{ width: "50px", height: "50px" }}
      />
    ),
  },
];
const data = [
  {
    key: "1",
    packageid: "1",
    hostid: "KFC01",
    name: "birthday1",
    price: "100000",
    description: "KFC always selected on top for customer to ....",

    tags: ["Best Package", "Top1"],
  },
  {
    key: "2",
    packageid: "2",
    hostid: "KFC01",
    name: "birthday1",
    price: "100000",
    description: "KFC always selected on top for customer to ....",

    tags: ["Best Package", "Top1"],
  },
];
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
      const imageUrl = info.file.response.url;
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
            href: "/homepages",
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
          render={(text, record) => (
            <img
              src={record.image}
              alt="Image"
              style={{ width: "50px", height: "50px" }}
            />
          )}
        />
        <Column
          title="Actions"
          key="action"
          render={(text, record) => (
            <Space size="middle">
              <a onClick={() => handleDelete(record)}>
                {" "}
                <Button type="primary" danger>
                  Delete
                </Button>
              </a>
            </Space>
          )}
        />
      </Table>
      <Modal
        title="Create Package"
        visible={open}
        onCancel={() => setOpen(false)}
        footer={null}
      >
        <Form
          name="basic"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Name not must be blank" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Price not must be blank" }]}
          >
            <Input suffix="VND" />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Description not must be blank" },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            label="Image"
            name="image"
            rules={[{ required: true, message: "Image not must be blank" }]}
          >
            <Dragger {...props}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
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
