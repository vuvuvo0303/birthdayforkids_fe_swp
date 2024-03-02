import React, { useState } from "react";
import { Button, Table, Breadcrumb, Space, message, Tag } from "antd";
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
    status: "ACTIVE",
    role: "GUEST",
  },
  {
    key: "2",
    packageid: "2",
    hostid: "KFCggd01",
    name: "thday1",
    price: "100000",
    description: "KFC always selected on top for customer to ....",
    status: "PENDING", // Change status to PENDING
    role: "HOST",
  },
  {
    key: "3",
    packageid: "1",
    hostid: "KFCdd01",
    name: "birthday1",
    price: "100000",
    description: "KFC always selected o for customer to ....",
    status: "ACTIVE",
    role: "GUEST",
  },
  {
    key: "4",
    packageid: "2",
    hostid: "KFCsdds01",
    name: "birthday1",
    price: "100000",
    description: "KFC aon top for customer to ....",
    status: "ACTIVE",
    role: "HOST",
  },
];

const ManageAccounts = () => {
  const [dataSource, setDataSource] = useState(data);
  const [filter, setFilter] = useState("GUEST");

  const handleFilterChange = (role) => {
    setFilter(role);
    let filteredData = [];
    if (role === "ALL") {
      filteredData = data;
    } else {
      filteredData =
        role === "GUEST"
          ? data.filter((item) => item.role === role && !item.accepted && !item.refused)
          : data.filter((item) => item.role === role);
    }
    setDataSource(filteredData);
  };

  const handleDelete = (record) => {
    const newData = dataSource.filter((item) => item.key !== record.key);
    setDataSource(newData);
    message.success("Đã xóa thành công");
  };

  const handleAccept = (record) => {
    const newData = dataSource.map((item) => {
      if (item.key === record.key && item.status === "PENDING") {
        // Change status to ACTIVE only if status is PENDING
        return { ...item, status: "ACTIVE", accepted: true };
      }
      return item;
    });
    setDataSource(newData.filter((item) => !item.refused)); // Remove refused items
    message.success(`Tài khoản host "${record.name}" đã được chấp nhận`);
  };

  const handleRefuse = (record) => {
    const newData = dataSource.map((item) => {
      if (item.key === record.key) {
        return { ...item, status: "VOCALNO", refused: true };
      }
      return item;
    });
    setDataSource(newData.filter((item) => item.status !== "PENDING")); // Remove pending items
    message.error("Tài khoản đã bị từ chối");
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

      <Space style={{ marginBottom: "16px" }}>
        <Button type={filter === "ALL" ? "primary" : "default"} onClick={() => handleFilterChange("ALL")}>
          All
        </Button>
        <Button type={filter === "GUEST" ? "primary" : "default"} onClick={() => handleFilterChange("GUEST")}>
          Guest
        </Button>
        <Button type={filter === "HOST" ? "primary" : "default"} onClick={() => handleFilterChange("HOST")}>
          Host
        </Button>
      </Space>

      <Table dataSource={dataSource}>
        <Column title="Name" dataIndex="name" key="name" />
        <Column title="Description" dataIndex="description" key="description" />
        <Column
          title="Status"
          dataIndex="status"
          key="status"
          render={(status) => (
            <Tag color={status === "VOCALNO" ? "volcano" : "green"}>
              {status === "VOCALNO" ? "Chưa được phê duyệt" : "Active"}
            </Tag>
          )}
        />
        <Column
          title="Actions"
          key="action"
          render={(text, record) => (
            <>
              {record.role === "GUEST" && (
                <Button type="primary" danger onClick={() => handleDelete(record)}>
                  Delete
                </Button>
              )}
              {record.role === "HOST" && (
                <>
                  {!record.accepted && !record.refused && (
                    <Space>
                      <Button
                        style={{
                          backgroundColor: "#7FFF00",
                          borderColor: "#7FFF00",
                          color: "white",
                        }}
                        onClick={() => handleAccept(record)}
                      >
                        Accept
                      </Button>
                      <Button type="primary" danger onClick={() => handleRefuse(record)}>
                        Refuse
                      </Button>
                    </Space>
                  )}
                  {(record.accepted || record.refused) && (
                    <Button type="primary" danger onClick={() => handleDelete(record)}>
                      Delete
                    </Button>
                  )}
                </>
              )}
            </>
          )}
        />
      </Table>
    </>
  );
};

export default ManageAccounts;
