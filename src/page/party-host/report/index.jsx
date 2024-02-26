import React, { useEffect } from "react";
import { Button, Col, Row, Statistic, Card, Breadcrumb } from "antd";
import {
  UserOutlined,
  CreditCardOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Chart } from "../../../component/chart";
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
                <span>Hosts</span>
              </>
            ),
          },
          {
            title: "Report",
          },
        ]}
      />
      <Row gutter={18}>
        <Col span={6}>
          <Card title=" Total customers today" bordered={false}>
            <Statistic value={100} prefix={<UserOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card title=" Total customers " bordered={false}>
            <Statistic value={1000} prefix={<UserOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card title=" Daily revenue (VND)" bordered={false}>
            <Statistic value={1001000} prefix={<CreditCardOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card title=" Monthly revenue(VND)" bordered={false}>
            <Statistic value={1000000000000} prefix={<CreditCardOutlined />} />
          </Card>
        </Col>
      </Row>
      <Chart />
    </>
  );
};

export default ReportPage;
