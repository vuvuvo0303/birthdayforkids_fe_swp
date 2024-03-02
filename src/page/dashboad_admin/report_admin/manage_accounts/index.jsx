import React, { useEffect, useState } from "react";
import { Button, Table, Breadcrumb, Space, message, Tag, Avatar } from "antd";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
const { Column } = Table;
import api from "../../../../config/axios";

const data = [
  {
    key: "1",
    packageid: "1",
    hostid: "sd",
    name: "birth",
    price: "100000",
    description: "KFC always selected on top for customer to   ",
    phone: "xxxxxxxxxxxx",
    role: "GUEST",
    avatar:
      "data:image/jpeg;base64,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", // Add avatar URL
  },
  {
    key: "2",
    packageid: "2",
    hostid: "KFCggd01",
    name: "thday1",
    price: "100000",
    description: "KFC always selected on top for customer to ....",
    phone: "xxxxxxxxxxxx",
    role: "HOST",
    avatar: "https://example.com/avatar2.jpg", // Add avatar URL
  },
  {
    key: "3",
    packageid: "1",
    hostid: "KFCdd01",
    name: "birthday1",
    price: "100000",
    description: "KFC always selected o for customer to ....",
    phone: "xxxxxxxxxxxx",
    role: "GUEST",
    avatar: "src={user?.avatar}", // Add avatar URL
  },
  {
    key: "4",
    packageid: "2",
    hostid: "KFCsdds01",
    name: "birthday1",
    price: "100000",
    phone: "xxxxxxxxxxxx",
    description: "KFC aon top for customer to ....",
    role: "HOST",
    avatar: "https://example.com/avatar4.jpg", // Add avatar URL
  },
];

const ManageAccounts = () => {
  const [all, setAll] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [filter, setFilter] = useState("ALL");

  const fetchAccount = async () => {
    const reponse = await api.get("/auth/getAlluser");
    setAll(reponse.data);
    setDataSource(reponse.data);
  };

  useEffect(() => {
    fetchAccount();
  }, []);

  const handleFilterChange = (role) => {
    setFilter(role);
    let filteredData = [];
    if (role === "ALL") {
      filteredData = all;
    } else {
      if (role === "GUEST") {
        filteredData = all.filter((item) => item.role === "Guest");
      }

      if (role === "HOST") {
        filteredData = all.filter((item) => {
          console.log(item.role);
          return item.role === "Host";
        });
      }
    }
    setDataSource(filteredData);
  };

  const handleDelete = async (record) => {
    try {
      const response = await api.delete(`/auth/delete/${record.accountID}`);
      console.log(response.data);
      const newData = dataSource.filter((item) => item.accountID !== record.accountID);
      setDataSource(newData);
      message.success("Deleted successfully");
    } catch (error) {
      console.error("Error deleting account:", error);
      message.error("Failed to delete account");
    }
  };
  useEffect(() => {
    fetchAccount();
  }, []);

  const handleAccept = async (record) => {
    const response = await api.post(`/auth/verify/${record.email}`);
    console.log(response.data);
    console.log("Accepting record:", record);
    fetchAccount();
    const newData = dataSource.map((item) => {
      if (item.key === record.key) {
        return { ...item, accepted: true };
      }
      return item;
    });

    // console.log("New data after accept:", newData);
    // setDataSource(newData.filter((item) => !item.refused));
    message.success(`Host account "${record.email}" has been accepted`);
  };

  const handleRefuse = async (record) => {
    const reponse = await api.delete(`/auth/${record.accountID}`);
    console.log(reponse.data);

    const newData = dataSource.filter((item) => item.key !== record.key);
    setDataSource(newData);
    message.error(`Host account "${record.name}" has been denied`);
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
        <Column title="Email" dataIndex="email" key="email" />
        <Column title="Role" dataIndex="role" key="role" />
        <Column title="Phone Number" dataIndex="phone" key="phone" />
        <Column title=" Status" dataIndex="status" key="status" />

        <Column title="Avatar" dataIndex="avatar" key="avatar" render={(avatar) => <Avatar src={avatar} />} />

        <Column
          title="Actions"
          key="action"
          render={(text, record) => (
            <>
              {record.role === "Guest" && (
                <Button type="primary" danger onClick={() => handleDelete(record)}>
                  Delete
                </Button>
              )}
              {record.role === "Host" && (
                <>
                  {record.status === "Inactivated" && (
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
                  {record.status === "Activated" && (
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
