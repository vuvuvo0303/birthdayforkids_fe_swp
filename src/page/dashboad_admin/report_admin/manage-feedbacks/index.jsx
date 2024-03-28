import React, { useState, useEffect } from "react";
import { Table, Space, Button, Modal, Rate, Breadcrumb } from "antd";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";

import api from "../../../../config/axios";

const ManageFeedBacks = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await api.get("/api/feedbacks");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const columns = [
    {
      title: "Customer Name",
      dataIndex: "guest",
      key: "guest",
      render: (guest) => guest.name,
    },
    {
      title: "Host Name",
      dataIndex: "host",
      key: "host",
      render: (host) => host.name,
    },
    {
      title: "Content Feedbacks",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Feedback Date",
      dataIndex: "feedbackDate",
      key: "feedbackDate",
      width: "120px",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (rating) => <Rate disabled defaultValue={rating} count={5} />,
      width: "200px",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" danger onClick={() => handleDelete(record.feedbackID)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const handleDelete = async (feedbackID) => {
    Modal.confirm({
      title: "Confirm",
      content: "Are you sure you want to delete this feedback?",
      onOk: async () => {
        try {
          await api.delete(`/api/feedbacks/${feedbackID}`);
          const newData = data.filter((item) => item.feedbackID !== feedbackID);
          setData(newData);
          fetchData();
        } catch (error) {
          console.error("Error deleting feedback:", error);
        }
      },
    });
  };

  return (
    <>
      <Breadcrumb
        style={{ margin: "16px 0" }}
        items={[
         
          {
            href: "",
            title: (
              <>
                <UserOutlined />
                <span>Admin</span>
              </>
            ),
          },
          {
            title: "Manange Feedback",
          },
        ]}
      />

      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default ManageFeedBacks;
