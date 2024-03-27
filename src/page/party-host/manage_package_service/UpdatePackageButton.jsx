import { CloudUploadOutlined, UploadOutlined } from "@ant-design/icons";
import { Flex, Image } from "@chakra-ui/react";
import { Button, Form, Input, Modal, Upload } from "antd";
import React, { useEffect, useState } from "react";
import api from "../../../config/axios";
import uploadFile from "../../../utils/upload";
import { toast } from "react-toastify";

const UpdatePackageButton = ({ record, forceRerender }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pictureFile, setPictureFile] = useState(null);
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
      const response = await api.put(`api/packages/${record.packageID}`, e);
      console.log("Success:", response);
      forceRerender();
      toast.success("Update successfully!");
    } catch (error) {
      toast.error(e.message);
    }
  };

  const handlePackageImageChange = (e) => {
    if (e.file.status === "uploading") {
      setPictureFile(e.file.originFileObj);
    }
  };

  const uploadProps = {
    name: "picture",
    action: "#",
    onChange: handlePackageImageChange,
    showUploadList: false,
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Update
      </Button>
      <Modal title="Update package" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Flex justifyContent={"center"} p={5} mb={5}>
          {pictureFile ? (
            <Image src={URL.createObjectURL(pictureFile)} alt="Package Image Preview" width="100%" />
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
          <Form.Item label="Package image" name="picture"  rules={[
              {
                required: true,
                message: "Please input your Package image!",
              },
            ]} initialValue={record.picture}>
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />}>Upload new package image</Button>
            </Upload>
          </Form.Item>

          <Form.Item label="Name" name="name"   rules={[
              {
                required: true,
                message: "Please input your Package Name!",
              },
            ]} initialValue={record.name}>
            <Input name="name" />
          </Form.Item>

          <Form.Item
            label="Number of Slot"
            name="maximumSlot"
            rules={[
              {
                required: true,
                message: "Please input your Number of Slot!",
              },
            ]}
            initialValue={record.maximumSlot}
          >
            <Input type="number" name="maximumSlot" />
          </Form.Item>
          <Form.Item
            label="DiscountPercent"
            name="discountPercentage"
            rules={[
              {
                required: true,
                message: "Please input your Discount Percentagece!",
              },
            ]}
            initialValue={record.discountPercentage}
          >
            <Input type="number" name="discountPercentage" />
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
          {/* <Form.Item label="Picture" name="picture" initialValue={record.picture} hidden>
            <Input name="picture" />
          </Form.Item> */}
        </Form>
      </Modal>
    </>
  );
};

export default UpdatePackageButton;
