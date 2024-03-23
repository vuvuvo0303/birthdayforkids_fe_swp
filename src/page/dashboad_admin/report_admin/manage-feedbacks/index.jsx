import React, { useState } from "react";
import { Table, Space, Button, Modal, Rate } from "antd";

const ManageFeedBacks = () => {
  const [data, setData] = useState([
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No",
      rating: 5,
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      rating: 4,
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      rating: 5,
    },
  ]);

  const columns = [
    {
      title: "Customer Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Customer Host",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Content Feedbacks",
      dataIndex: "contentfeedbacks",
      key: "contentfeedbacks",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (rating) => <Rate disabled defaultValue={rating} count={5} />,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" danger onClick={() => handleDelete(record.key)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const handleDelete = (key) => {
    Modal.confirm({
      title: "Confirm",
      content: "Are you sure you want to delete this feedback?",
      onOk: () => {
        const newData = data.filter((item) => item.key !== key);
        setData(newData);
      },
    });
  };

  return <Table columns={columns} dataSource={data} />;
};

export default ManageFeedBacks;
