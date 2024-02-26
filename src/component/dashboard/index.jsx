import React, { useEffect, useState } from "react";
import {
  DesktopOutlined,
  TeamOutlined,
  PieChartOutlined,
  BarChartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import Table from "../table";
import { Link, Outlet } from "react-router-dom";
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label: <Link to={key}>{label}</Link>,
  };
}

const DashBoard = ({ role }) => {
  const [items, setItems] = useState([]);

  function loadItems() {
    if (role === "PARTY_HOST") {
      setItems([
        getItem(
          "Manage package",
          "/dashboard/party-host/package",
          <PieChartOutlined />
        ),
        getItem(
          "Manage services",
          "/dashboard/party-host/service",
          <DesktopOutlined />
        ),
        getItem(
          "Manage Report",
          "/dashboard/party-host/report",
          <DesktopOutlined />
        ),
      ]);
    } else if (role === "ADMIN") {
      setItems([
        getItem(
          "Manage accounts",
          "/dashboard/admin/manage-accounts",
          <TeamOutlined />
        ),
        getItem(
          "Report Admin",
          "/dashboard/admin/report-admin",
          <BarChartOutlined />
        ),
      ]);
    }
  }

  useEffect(loadItems, []);

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        ></Footer>
      </Layout>
    </Layout>
  );
};
export default DashBoard;
