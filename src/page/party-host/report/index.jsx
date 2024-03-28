import React, { useEffect, useState } from "react";
import { Button, Col, Row, Statistic, Card, Breadcrumb } from "antd";
import {
    UserOutlined,
    CreditCardOutlined,
    HomeOutlined,
    UnorderedListOutlined,
} from "@ant-design/icons";
import { Chart } from "../../../component/chart";
import { useSelector } from "react-redux";
import { login } from "../../../redux/features/userSlice";

import api from "../../../config/axios";
const ReportPage = () => {
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
    const [rerenderKey, setRerenderKey] = useState(0);
    const loggedUser = useSelector((store) => store.user);
    const forceRerender = () => {
        setRerenderKey(rerenderKey + 1);
    };
    const [statistics, setStatistics] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(
                    `/api/dashboard/host/detail/${loggedUser.accountID}`
                );
                console.log(response);
                setStatistics(response.data);
            } catch (error) {
                console.error("Error when retrieving order data:", error);
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

    const dataTest = [1000];

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
                        data: statistics.monthlyOrder,
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
                        href: "/",
                        title: <HomeOutlined />,
                    },
                    {
                        href: "",
                        title: (
                            <>
                                <UserOutlined />
                                <span>Hosts</span>
                            </>
                        ),
                    },
                    {
                        title: "Report",
                    },
                ]}
            />
            <Row gutter={16}>
                <Col span={8}>
                    <Card title=" Placed Finish orders " bordered={false}>
                        <Statistic
                            value={statistics?.totalOrder}
                            prefix={<UnorderedListOutlined />}
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title=" Total customers " bordered={false}>
                        <Statistic
                            value={statistics?.totalGuest}
                            prefix={<UserOutlined />}
                        />
                    </Card>
                </Col>
                {/* <Col span={6}> */}
                {/* <Card title=" Daily revenue (VND)" bordered={false}>
            <Statistic value={1001000} prefix={<CreditCardOutlined />} />
          </Card> */}
                {/* </Col> */}
                <Col span={8}>
                    <Card title=" Monthly revenue(VND)" bordered={false}>
                        <Statistic
                            value={statistics?.totalRevenue}
                            prefix={<CreditCardOutlined />}
                        />
                    </Card>
                </Col>
            </Row>
            <Chart data={data} />
        </>
    );
};

export default ReportPage;
