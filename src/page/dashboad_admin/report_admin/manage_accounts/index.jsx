import React, { useState } from "react";
import { Button, Table, Tag, Breadcrumb, message, Space } from "antd";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
const { Column } = Table;

const data = [
  {
    key: "1",
    packageid: "1",
    hostid: "sd",
    name: "birth",
    price: "100000",
    description: "KFC always selected on top for customer to ....",
    tags: ["Best Package", "Top1"],
  },
  {
    key: "2",
    packageid: "2",
    hostid: "KFCggd01",
    name: "thday1",
    price: "100000",
    description: "KFC always selected on top for customer to ....",
    tags: ["Best Package", "Top1"],
  },
  {
    key: "3",
    packageid: "1",
    hostid: "KFCdd01",
    name: "birthday1",
    price: "100000",
    description: "KFC always selected o for customer to ....",
    tags: ["Best Package", "Top1"],
  },
  {
    key: "4",
    packageid: "2",
    hostid: "KFCsdds01",
    name: "birthday1",
    price: "100000",
    description: "KFC aon top for customer to ....",
    tags: ["Best Package", "Top1"],
  },
];

const ManageAccounts = () => {
  const [dataSource, setDataSource] = useState(data);

  const handleDelete = (record) => {
    const newData = dataSource.filter((item) => item.key !== record.key);
    setDataSource(newData);
    message.success("Account deleted successfully");
  };

  const handleAccept = (record) => {
    message.success("Account approved successfully");
    // Show delete button and remove accept and refuse buttons
    const newData = dataSource.map((item) => {
      if (item.key === record.key) {
        return { ...item, accepted: true, refused: false };
      }
      return item;
    });
    setDataSource(newData);
  };

  const handleRefuse = (record) => {
    message.error("Account refused");
    // Remove the record from dataSource when refused
    const newData = dataSource.filter((item) => item.key !== record.key);
    setDataSource(newData);
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
                <span>Admin</span>
              </>
            ),
          },
          {
            title: "Manage Accounts",
          },
        ]}
      />
      <h1>List Accounts</h1>
      <Table dataSource={dataSource}>
        <Column title="Name" dataIndex="name" key="name" />
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
            <>
              {!record.accepted && !record.refused && (
                <Space>
                  <Button
                    style={{
                      backgroundColor: "#7FFF00", // Mã HEX cho màu xanh lá cây sáng
                      borderColor: "#7FFF00",
                      color: "white",
                    }}
                    onClick={() => handleAccept(record)}
                  >
                    Accept
                  </Button>

                  <Button
                    type="primary"
                    danger
                    onClick={() => handleRefuse(record)}
                  >
                    Refuse
                  </Button>
                </Space>
              )}
              {record.accepted && (
                <Button
                  type="primary"
                  danger
                  onClick={() => handleDelete(record)}
                >
                  Delete
                </Button>
              )}
              {record.refused && (
                <Button
                  type="primary"
                  danger
                  onClick={() => handleDelete(record)}
                >
                  Delete
                </Button>
              )}
            </>
          )}
        />
      </Table>
    </>
  );
};

export default ManageAccounts;
