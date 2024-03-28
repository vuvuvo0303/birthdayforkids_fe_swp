import React, { useEffect, useState } from "react";
import { Button, Col, Row, Statistic, Card, Breadcrumb } from "antd";
import {
    UserOutlined,
    CreditCardOutlined,
    HomeOutlined,
    UnorderedListOutlined,
} from "@ant-design/icons";
import { Chart } from "../../../component/chart/index";

import api from "../../../config/axios";
const ReportPageAdmin = () => {
    // const options = {
    //   responsive: true,
    //   plugins: {
    //     legend: {
    //       position: "top",
    //     },
    //     title: {
    //       display: true,
    //       text: "Chart.js Line Chart",
    //     },
    //   },
    // };
    // const labels = [
    //   "January",
    //   "February",
    //   "March",
    //   "April",
    //   "May",
    //   "June",
    //   "July",
    // ];
    // const data = {
    //   labels,
    //   datasets: [
    //     {
    //       label: "Dataset 1",
    //       data: labels.map(() => Math.floor(Math.random() * 1000) + 1),
    //       borderColor: "rgb(255, 99, 132)",
    //       backgroundColor: "rgba(255, 99, 132, 0.5)",
    //     },
    //     {
    //       label: "Dataset 2",
    //       data: labels.map(() => Math.floor(Math.random() * 1000) + 1),
    //       borderColor: "rgb(53, 162, 235)",
    //       backgroundColor: "rgba(53, 162, 235, 0.5)",
    //     },
    //   ],
    // };

    const [statistics, setStatistics] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("/api/dashboard/admin/detail");
                console.log(response);
                setStatistics(response.data);
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu đơn hàng:", error);
            }
        };

        fetchData();
    }, []);

    const labels = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const [data, setData] = useState({
        labels,
        datasets: [
            {
                label: "Revenue",
                data: labels.map(() => Math.floor(Math.random() * 1000) + 1),
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
            {
                label: " Orders",
                data: labels.map(() => Math.floor(Math.random() * 100) + 1),
                borderColor: "rgb(53, 162, 235)",
                backgroundColor: "rgba(53, 162, 235, 0.5)",
            },
        ],
    });

    useEffect(() => {
        if (statistics) {
            setData({
                labels: statistics.months,
                datasets: [
                    {
                        label: "Revenue",
                        data: statistics.monthlyRevenue,
                        borderColor: "rgb(255, 99, 132)",
                        backgroundColor: "rgba(255, 99, 132, 0.5)",
                    },
                    {
                        label: " Orders",
                        data: statistics.monthlyOrders,
                        borderColor: "rgb(53, 162, 235)",
                        backgroundColor: "rgba(53, 162, 235, 0.5)",
                    },
                ],
            });
        }
    }, [statistics]);

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
                        title: "Report Admin",
                    },
                ]}
            />
            <Row gutter={18}>
                <Col span={6}>
                    <Card title=" Total Guest " bordered={false}>
                        <Statistic
                            value={statistics?.totalGuest}
                            prefix={<UserOutlined />}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card title=" Total Host" bordered={false}>
                        <Statistic
                            value={statistics?.totalHost}
                            prefix={<UserOutlined />}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card title="System's placed orders " bordered={false}>
                        <Statistic
                            value={statistics?.systemPlacedOrder}
                            prefix={<UnorderedListOutlined />}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card title=" Total System revenue(VND)" bordered={false}>
                        <Statistic
                            value={statistics?.systemTotalRevenue}
                            prefix={<CreditCardOutlined />}
                        />
                    </Card>
                </Col>
            </Row>
            <Chart data={data} />
        </>
    );
};

export default ReportPageAdmin;
