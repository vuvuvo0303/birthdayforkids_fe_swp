import React, { useState, useEffect } from "react";
import { Table, Space, Button, Modal, Rate, Breadcrumb } from "antd";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import api from "../../../config/axios";

const ManageFeedbackOfHost = () => {
    const [data, setData] = useState([]);
    const loggedUser = useSelector((store) => store.user);
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await api.get(
                `/api/feedbacks/host/${loggedUser.accountID}`
            );
            console.log(response);
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
            title: "Package Name",
            dataIndex: "apackage",
            key: "apackage",
            render: (account) => account.name,
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
        },
        {
            title: "Rating",
            dataIndex: "rating",
            key: "rating",
            render: (rating) => (
                <Rate disabled defaultValue={rating} count={5} />
            ),
            width: "200px",
        },
    ];

    return (
        <>
            <Breadcrumb
                style={{ margin: "16px 0" }}
                items={[
                    {
                        href: "/",
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
                        title: "Manange Feedback",
                    },
                ]}
            />

            <Table columns={columns} dataSource={data} />
        </>
    );
};

export default ManageFeedbackOfHost;
