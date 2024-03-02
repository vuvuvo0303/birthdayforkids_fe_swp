import React, { useState } from "react";
import { Button, Form, Input, Modal, Space, Table, Tag, Breadcrumb, message } from "antd";
import Dragger from "antd/es/upload/Dragger";
import { HomeOutlined, InboxOutlined, UserOutlined } from "@ant-design/icons";
import uploadFile from "../../../utils/upload";
const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
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
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a onClick={() => handleDelete(record)}>Delete</a>
      </Space>
    ),
  },
  {
    title: "Image",
    key: "image",
    render: (_, record) => (
      <img
        src="https://firebasestorage.googleapis.com/v0/b/swp391-bb0b2.appspot.com/o/dcspass.png?alt=media&token=aa3d0fdd-b321-455d-82de-7f3e44b88d67"
        alt="Image"
        style={{ width: "50px", height: "50px" }}
      />
    ),
  },
];
const data = [
  // {
  //   key: "1",
  //   name: "John Brown",
  //   age: 32,
  //   address: "New York No. 1 Lake Park",
  //   tags: ["nice", "developer"],
  // },
  // {
  //   key: "2",
  //   name: "Jim Green",
  //   age: 42,
  //   address: "London No. 1 Lake Park",
  //   tags: ["loser"],
  // },
  // {
  //   key: "3",
  //   name: "Joe Black",
  //   age: 32,
  //   address: "Sydney No. 1 Lake Park",
  //   tags: ["cool", "teacher"],
  // },
];
const ServicePage = () => {
  const [open, setOpen] = useState(false);
  const [dataSource, setDataSource] = useState(data);
  const handleDelete = (record) => {
    const newData = dataSource.filter((item) => item.key !== record.key);
    setDataSource(newData);
    message.success("Item deleted successfully!");
  };

  const onFinish = (values) => {
    console.log("Success:", values);
    const newItem = { ...values, key: dataSource.length + 1 };
    setDataSource([...dataSource, newItem]);
    setOpen(false);
    message.success("Item added successfully!");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const props = {
    name: "file",
    multiple: true,
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    onChange: async (info) => {
      const { status } = info.file;
      if (status === "done") {
        console.log(info);
        const reponse = await uploadFile(info.file.originFileObj);
        console.log(reponse);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
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
            title: "Services",
          },
        ]}
      />
      <h1>Service</h1>
      <Button
        type="primary"
        onClick={() => {
          setOpen(true);
        }}
      >
        Add
      </Button>
      <Table columns={columns} dataSource={dataSource} />
      <Modal title="Create Services" visible={open} onCancel={() => setOpen(false)} footer={null}>
        <Form
          name="basic"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item label="Name" name="name" rules={[{ required: true, message: "Name not must be blank" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Price" name="price" rules={[{ required: true, message: "Price not must be blank" }]}>
            <Input suffix="VND" />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Description not must be blank" }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item label="Image" name="image" rules={[{ required: true, message: "Image not must be blank" }]}>
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
export default ServicePage;
