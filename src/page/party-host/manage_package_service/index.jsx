import { Breadcrumb, Button, Form, Input, Modal, Space, Table, Tag } from "antd";
import Dragger from "antd/es/upload/Dragger";
import React, { useState } from "react";
import { InboxOutlined, HomeOutlined, UserOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
export const ManagePackageAndService = () => {
  const [form] = useForm();
  const [showAddPackage, setShowPackage] = useState(false);
  const fetchAccount = async () => {
    const reponse = await api.post("");
    console.log(reponse.data);
    
  };
  const columns = [
    {
      title: "Nam",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" danger onClick={() => handleDelete(record)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];
  const [dataSource, setDataSource] = useState([
    {
      key: 1,
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      description: "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
    },
    {
      key: 2,
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      description: "My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.",
    },
    {
      key: 3,
      name: "Not Expandable",
      age: 29,
      address: "Jiangsu No. 1 Lake Park",
      description: "This not expandable",
    },
    {
      key: 4,
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      description: "My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.",
    },
  ]);
  const handleDelete = (record) => {
    const newData = dataSource.filter((item) => item.key !== record.key);
    setDataSource(newData);
    message.success("Package deleted successfully!");
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
      />{" "}
      <Button
        style={{
          marginBottom: 10,
        }}
        type="primary"
        onClick={() => setShowPackage(true)}
      >
        Add Package
      </Button>
      <Table
        columns={columns}
        expandable={{
          expandedRowRender: (record) => <Service />,
          // rowExpandable: (record) => record.name !== "Not Expandable",
        }}
        dataSource={dataSource}
      />
      <Modal
        open={showAddPackage}
        title="Create Package"
        okText="Add"
        onOk={() => form.submit()}
        onCancel={() => setShowPackage(false)}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          //   onFinish={onFinish}
          //   onFinishFailed={onFinishFailed}
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
        </Form>
      </Modal>
    </>
  );
};

const Service = () => {
  const [form] = Form.useForm();
  const [showAddPackage, setShowPackage] = useState(false);

  const [dataSource, setDataSource] = useState([
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
  ]);

  const handleDelete = (record) => {
    const newData = dataSource.filter((item) => item.key !== record.key);
    setDataSource(newData);
    message.success("Package deleted successfully!");
  };

  const propsUpload = {
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
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" danger onClick={() => handleDelete(record)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

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
          {
            title: "Service",
          },
        ]}
      />
      <Button
        style={{
          marginBottom: 10,
        }}
        type="primary"
        onClick={() => setShowPackage(true)}
      >
        Add Service
      </Button>
      <Table columns={columns} dataSource={dataSource} />
      <Modal
        visible={showAddPackage}
        title="Create Service"
        okText="Add"
        onCancel={() => setShowPackage(false)}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              setShowPackage(false);
              message.success("Service added successfully!");
            })
            .catch((errorInfo) => {
              console.log("Failed:", errorInfo);
            });
        }}
      >
        <Form form={form} name="basic" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
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
            <Dragger {...propsUpload}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
            </Dragger>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ManagePackageAndService;
