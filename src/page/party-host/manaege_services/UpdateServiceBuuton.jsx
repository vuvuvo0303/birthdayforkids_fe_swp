import { CloudUploadOutlined, UploadOutlined } from "@ant-design/icons";
import { Flex, Image } from "@chakra-ui/react";
import { Button, Form, Input, Modal, Upload } from "antd";
import React, { useEffect, useState } from "react";
import api from "../../../config/axios";
import { toast } from "react-toastify";
import uploadFile from "../../../utils/upload";
import { useSelector } from "react-redux";

const UpdateServiceButton = ({ record, forceRerender }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [servicePictureFile, setServicePictureFile] = useState(null);
  const loggedUser = useSelector((store) => store.user);
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

  const onFinish = async (e) => {
    try {
      if (e.picture.file) {
        const url = await uploadFile(e.picture.file.originFileObj);
        e.picture = url;
      }
      const response = await api.put(`api/services/${record.serviceID}`, e);
      forceRerender();
      toast.success("Update successfully!");
    } catch (error) {
      toast.error(e.message);
    }
    forceRerender();
  };

  const handleServiceImageChange = (e) => {
    if (e.file.status === "uploading") {
      setServicePictureFile(e.file.originFileObj);
    }
  };

  const uploadProps = {
    name: "picture",
    action: "#",
    onChange: handleServiceImageChange,
    showUploadList: false,
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Update
      </Button>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Flex justifyContent={"center"} p={5} mb={5}>
          {servicePictureFile ? (
            <Image src={URL.createObjectURL(servicePictureFile)} alt="Serivce Image Preview" width="100%" />
          ) : (
            <Image src={record.picture} width="100%" />
          )}
        </Flex>
        <Form
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={(e) => {
            onFinish(e);
          }}
        >
          <Form.Item label="Serivce image" name="picture"  rules={[
              {
                required: true,
                message: "Please input your Serivce image!",
              },
            ]} initialValue={record.picture}>
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />}>Upload new service image</Button>
            </Upload>
          </Form.Item>

          <Form.Item label="Name" name="name"  rules={[
              {
                required: true,
                message: "Please input your Serivce Name!",
              },
            ]}initialValue={record.name}>
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
            <Input name="price" type="number" addonAfter="VND"/>
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

export default UpdateServiceButton;
