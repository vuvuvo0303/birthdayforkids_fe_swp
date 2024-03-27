import React, { useEffect, useState } from "react";
import {
  DesktopOutlined,
  TeamOutlined,
  ClockCircleOutlined,
  BarChartOutlined,
  EditOutlined,
  TableOutlined,
  CommentOutlined,
  WalletOutlined,
  AppstoreAddOutlined,
} from "@ant-design/icons";
import { Avatar, Breadcrumb, Button, Dropdown, Layout, Menu, Row, theme } from "antd";
import Table from "../table";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/features/userSlice";
import { Box } from "@chakra-ui/react";
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
  const user = useSelector((store) => store.user);
  const loggedUser = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  function loadItems() {
    if (loggedUser?.role === "Host") {
      setItems([
        getItem("Manage Package ", "/dashboard/party-host/manage-package-service", <DesktopOutlined />),
        getItem("Manage Service", "/dashboard/party-host/manage-services", <AppstoreAddOutlined />),
        getItem("Manage Report", "/dashboard/party-host/report", <BarChartOutlined />),
        getItem("Update Profile", "/dashboard/party-host/edit-ptofile-hosts", <EditOutlined />),
        getItem("Manage Schedule", "/dashboard/party-host/manage-schedule", <ClockCircleOutlined />),
        getItem("Manage Busy Date", "/dashboard/party-host/manage-busy-date", <ClockCircleOutlined />),
        getItem("Manage Orders", "/dashboard/party-host/manage-orders-of-hosts", <TableOutlined />),
        getItem("Manage FeedBacks", "/dashboard/party-host/manage-feedbacks-of-host", <CommentOutlined />),
      ]);
    } else if (loggedUser?.role === "Admin") {
      setItems([
        getItem("Manage accounts", "/dashboard/admin/manage-accounts", <TeamOutlined />),
        getItem("Report Admin", "/dashboard/admin/report-admin", <BarChartOutlined />),
        getItem("Manage Orders", "/dashboard/admin/manage-orders", <TableOutlined />),
        getItem("Manage FeedBacks", "/dashboard/admin/manage-feedbacks", <CommentOutlined />),
        getItem("Admin Wallet", "/dashboard/admin/admin-wallet", <WalletOutlined />),
      ]);
    }
  }

  useEffect(loadItems, []);

  const [collapsed, setCollapsed] = useState(false);
  // const loggedUser = JSON.parse(localStorage.getItem("logged-user"));
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const menu = [
    {
      key: "1",
      label: <Link to={"/yourProfile"}>Your Profile</Link>,
    },
    {
      key: "2",
      label: (
        <p
          onClick={() => {
            dispatch(logout());
          }}
        >
          Logout
        </p>
      ),
    },
    {
      key: "3",
      label: <p>Role:{user?.role}</p>,
    },
  ];
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
        style={{ paddingTop: "2.5rem" }}
        width="250px"
      >
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline" items={items} />
      </Sider>
      <Layout>
        <Box p="2rem" bgColor="white" shadow="lg" mb={8}>
          <Row
            align={"middle"}
            justify={"end"}
            style={{
              height: "100%",
            }}
          >
            <Dropdown menu={{ items: menu }} placement="bottomRight">
              <Row
                align={"middle"}
                style={{
                  marginRight: 10,
                }}
              >
                <Avatar
                  style={{
                    marginRight: 10,
                  }}
                  size={40}
                  src={user?.avatar}
                />
                <p
                  style={{
                    fontSize: 18,
                  }}
                >
                  {user?.name}
                </p>
              </Row>
            </Dropdown>
          </Row>
        </Box>

        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <div
            style={{
              padding: "5px 20px",
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
