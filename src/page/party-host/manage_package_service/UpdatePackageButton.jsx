import { CloudUploadOutlined, UploadOutlined } from "@ant-design/icons";
import { Flex } from "@chakra-ui/react";
import { Button, Form, Input, Modal, Upload } from "antd";
import React, { useEffect, useState } from "react";
import api from "../../../config/axios";

const UpdatePackageButton = ({ record, forceRerender }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    form.submit();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = async (values) => {
    const response = await api.put(`api/packages/${record.packageID}`, values);
    console.log("Success:", response);
    forceRerender();
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Update
      </Button>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Flex justifyContent={"center"}>
          <img src={record.picture} alt="Package" style={{ width: 100, height: 100 }} />
        </Flex>
        <Form form={form} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} onFinish={onFinish}>
          <Form.Item label="Name" name="name" initialValue={record.name}>
            <Input name="name" />
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[
              {
                required: true,
                message: "Please input your Price!",
              },
            ]}
            initialValue={record.price}
          >
            <Input name="price" />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please input your Description!",
              },
            ]}
            initialValue={record.description}
          >
            <Input name="description" />
          </Form.Item>
          <Form.Item label="Picture" name="picture" initialValue={record.picture} hidden>
            <Input name="picture" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UpdatePackageButton;
