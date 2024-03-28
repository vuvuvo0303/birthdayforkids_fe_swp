import React, { useEffect, useState } from "react";
import { Button, Table, Breadcrumb, Space, message, Tag, Avatar } from "antd";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
const { Column } = Table;
import api from "../../../../config/axios";

const data = [];

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
            const response = await api.delete(
                `/auth/delete/${record.accountID}`
            );
            console.log(response.data);
            const newData = dataSource.filter(
                (item) => item.accountID !== record.accountID
            );
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
        const response = await api.get(`/auth/verify/${record.email}`);
        console.log(response.data);
        fetchAccount();

        console.log("Accepting record:", record);
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
        const reponse = await api.delete(`/auth/refuse/${record.accountID}`);
        console.log(reponse.data);

        // const newData = dataSource.filter((item) => item.key !== record.key);
        // setDataSource(newData);
        fetchAccount();

        message.error(`Host account "${record.name}" has been denied`);
    };

    return (
        <>
            <Breadcrumb
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
                        title: "Manage Accounts",
                    },
                ]}
            />
            <h1>List Accounts</h1>

            <Space style={{ marginBottom: "16px" }}>
                <Button
                    type={filter === "ALL" ? "primary" : "default"}
                    onClick={() => handleFilterChange("ALL")}
                >
                    All
                </Button>
                <Button
                    type={filter === "GUEST" ? "primary" : "default"}
                    onClick={() => handleFilterChange("GUEST")}
                >
                    Guest
                </Button>
                <Button
                    type={filter === "HOST" ? "primary" : "default"}
                    onClick={() => handleFilterChange("HOST")}
                >
                    Host
                </Button>
            </Space>

            <Table dataSource={dataSource}>
                <Column title="Name" dataIndex="name" key="name" />
                <Column title="Email" dataIndex="email" key="email" />
                <Column title="Role" dataIndex="role" key="role" />
                <Column title="Phone Number" dataIndex="phone" key="phone" />
                <Column title=" Status" dataIndex="status" key="status" />

                <Column
                    title="Avatar"
                    dataIndex="avatar"
                    key="avatar"
                    render={(avatar) => <Avatar src={avatar} />}
                />

                <Column
                    title="Actions"
                    key="action"
                    render={(text, record) => (
                        <>
                            {record.role === "Guest" && (
                                <Button
                                    type="primary"
                                    danger
                                    onClick={() => handleDelete(record)}
                                >
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
                                                onClick={() =>
                                                    handleAccept(record)
                                                }
                                            >
                                                Accept
                                            </Button>
                                            <Button
                                                type="primary"
                                                danger
                                                onClick={() =>
                                                    handleRefuse(record)
                                                }
                                            >
                                                Refuse
                                            </Button>
                                        </Space>
                                    )}
                                    {record.status === "Activated" && (
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
                        </>
                    )}
                />
            </Table>
        </>
    );
};

export default ManageAccounts;
