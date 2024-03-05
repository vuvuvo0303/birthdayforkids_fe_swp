import { Breadcrumb, Button, Form, Input, Modal, Space, Table, Tag, message } from "antd";
import Dragger from "antd/es/upload/Dragger";
import React, { useEffect, useState } from "react";
import { InboxOutlined, HomeOutlined, UserOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import api from "../../../config/axios";
import uploadFile from "../../../utils/upload";
import { toast } from "react-toastify";
export const ManagePackageAndService = () => {
  const [form] = useForm();
  const [showAddPackage, setShowPackage] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  const fetchPackage = async () => {
    try {
      const response = await api.get("api/packages/hostPackages");
      setDataSource(response.data);
    } catch (error) {
      console.error("Error fetching packages:", error);
    }
  };

  const onSubmit = async (values) => {
    if (values.picture.file) {
      const url = await uploadFile(values.picture.file.originFileObj);
      values.picture = url;
    }

    try {
      const response = await api.post("/api/packages/addPackage", {
        ...values,
      });
      console.log(response.data);
      form.resetFields();
      setShowPackage(false);
      fetchPackage();
      toast.success("Add successfully");
    } catch (error) {
      console.error("Error submitting package:", error);
    }
  };

  useEffect(() => {
    fetchPackage();
  }, []);
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
      title: "Picture",
      dataIndex: "picture",
      key: "picture",
      render: (text, record) => <img src={record.picture} alt="Package" style={{ width: 100, height: 100 }} />,
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
  // const data = [
  //   {
  //     key: 1,
  //     name: "John Brown",
  //     age: 32,
  //     address: "New York No. 1 Lake Park",
  //     description: "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
  //   },
  //   {
  //     key: 2,
  //     name: "Jim Green",
  //     age: 42,
  //     address: "London No. 1 Lake Park",
  //     description: "My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.",
  //   },
  //   {
  //     key: 3,
  //     name: "Not Expandable",
  //     age: 29,
  //     address: "Jiangsu No. 1 Lake Park",
  //     description: "This not expandable",
  //   },
  //   {
  //     key: 4,
  //     name: "Joe Black",
  //     age: 32,
  //     address: "Sydney No. 1 Lake Park",
  //     description: "My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.",
  //   },
  // ];
  const handleDelete = async (record) => {
    try {
      const response = await api.delete(`/api/packages/${record.packageID}`);
      console.log(response.data);

      const newData = dataSource.filter((item) => item.packageID !== record.packageID);
      setDataSource(newData);
      message.success("Deleted successfully");
    } catch (error) {
      console.error("Error deleting packageID:", error);
      message.error("Failed to delete packageID");
    }
  };
  useEffect(() => {
    fetchPackage();
  }, []);
  const props = {
    name: "file",
    multiple: false,
    action: "URL_API_UPLOAD_IMAGE",
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
        dataSource={dataSource}
        expandable={{
          expandedRowRender: (record) => <Service />,
        }}
      />
      <Modal
        open={showAddPackage}
        title="Create Package"
        okText="Add"
        onOk={() => form.submit()}
        onCancel={() => setShowPackage(false)}
      >
        <Form
          onFinish={onSubmit}
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
          <Form.Item label="Picture" name="picture" rules={[{ required: true, message: "Image must not be blank" }]}>
            <Dragger maxCount={1} {...props}>
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
  const [showAddPackage, setShowService] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  // const data = [
  //   {
  //     key: "1",
  //     name: "John Brown",
  //     age: 32,
  //     address: "New York No. 1 Lake Park",
  //     tags: ["nice", "developer"],
  //   },
  //   {
  //     key: "2",
  //     name: "Jim Green",
  //     age: 42,
  //     address: "London No. 1 Lake Park",
  //     tags: ["loser"],
  //   },
  //   {
  //     key: "3",
  //     name: "Joe Black",
  //     age: 32,
  //     address: "Sydney No. 1 Lake Park",
  //     tags: ["cool", "teacher"],
  //   },
  // ];
  const onSubmit = async (values) => {
    if (values.picture.file) {
      const url = await uploadFile(values.picture.file.originFileObj);
      values.picture = url;
    }
    try {
      values.packageId = data.id;
      const response = await api.post(`/api/services/addService/${values.packageId}`, {
        ...values,
      });
      console.log(response.data);
      form.resetFields();
      setShowService(false);
      fetchPackage();
      toast.success("Add successfully");
    } catch (error) {
      console.error("Error submitting Service:", error);
    }
  };

  useEffect(() => {
    fetchService();
  }, []);
  const fetchService = async () => {
    try {
      const response = await api.get("api/services");

      setDataSource(response.data.filter((item) => !item.deleted));
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching services:", error);
      message.error("Error fetching services. Please try again later.");
    }
  };

  useEffect(() => {
    fetchService();
  }, []);

  const handleDelete = async (record) => {
    try {
      const response = await api.delete(`/api/services/${record.serviceID}`);
      console.log(response.data);

      const newData = dataSource.filter((item) => item.serviceID !== record.serviceID);
      setDataSource(newData);
      message.success("Deleted successfully");
    } catch (error) {
      console.error("Error deleting serviceID:", error);
      message.error("Failed to delete serviceID");
    }
  };
  useEffect(() => {
    fetchService();
  }, []);

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
      title: "Picture",
      dataIndex: "picture",
      key: "picture",
      render: (text, record) => <img src={record.picture} alt="Service" style={{ width: 100, height: 100 }} />,
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
  const props = {
    name: "file",
    multiple: false,
    action: "URL_API_UPLOAD_IMAGE",
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
        onClick={() => setShowService(true)}
      >
        Add Service
      </Button>
      <Table columns={columns} dataSource={dataSource} />
      <Modal
        visible={showAddPackage}
        title="Create Service"
        okText="Add"
        onCancel={() => setShowService(false)}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              setShowService(false);
              message.success("Service added successfully!");
            })
            .catch((errorInfo) => {
              console.log("Failed:", errorInfo);
            });
        }}
      >
        <Form form={form} name="basic" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} onFinish={onSubmit}>
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
          <Form.Item label="Image" name="picture" rules={[{ required: true, message: "Image must not be blank" }]}>
            <Dragger maxCount={1} {...props}>
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
