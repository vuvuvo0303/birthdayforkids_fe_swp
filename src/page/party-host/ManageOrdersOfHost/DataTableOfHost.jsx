import React, { useEffect } from "react";
import { Space, Table, Tag, Button } from "antd";
import { useState } from "react";

import { format } from "date-fns";
import api from "../../../config/axios";
import { useSelector } from "react-redux";
import { login } from "../../../redux/features/userSlice";

const DataTableOfHost = () => {
  const [data, setData] = useState([]);

  const [rerenderKey, setRerenderKey] = useState(0);
  const handleAccept = async (orderID) => {
    const response = await api.post(`api/orders/host/accept-order/${orderID}`);
    console.log(response.data);
    forceRerender();
  };
  const handleRefuse = async (orderID) => {
    const response = await api.post(`api/orders/host/refuse-orders/${orderID}`);
    console.log(response.data);
    forceRerender();
  };
  const loggedUser = useSelector((store) => store.user);
  const forceRerender = () => {
    setRerenderKey(rerenderKey + 1);
  };

  const columns = [
    {
      title: "Customer",
      dataIndex: "customer",
      key: "customer",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "customerPhone",
    },
    {
      title: "Package",
      dataIndex: "package",
      key: "packageName",
    },

    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Total price",
      dataIndex: "totalPrice",
      key: "totalPrice",
    },
    {
      title: "Order date",
      dataIndex: "orderDate",
      key: "orderDate",
    },
    {
      title: "Status",
      key: "orderStatus",
      dataIndex: "status",
      render: (_, record) => {
        let color = "green";
        if (record.status === "cancel") {
          color = "volcano";
        }
        if (record.status === "deposit") {
          color = "processing";
        }
        return (
          <Tag color={color} key={`status-${record.id}-${record.status}`}>
            {record.status?.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          {record.status === "ORDERED" && (
            <Space size="middle">
              <Button
                type="primary"
                onClick={() => {
                  handleAccept(record.id);
                }}
              >
                accept
              </Button>
              <Button
                onClick={() => {
                  handleRefuse(record.id);
                }}
              >
                Refuse
              </Button>
            </Space>
          )}
        </>
      ),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get(`api/orders/host/${loggedUser.accountID}`);
      const responseData = response.data;
      setData(
        responseData.map((item) => {
          return {
            id: item.orderID,
            customer: item.account.name,
            phone: item.account.phone,
            package: item.packageEntity.name,
            quantity: item.quantity,
            totalPrice: item.totalPrice,
            orderDate: format(item.createAt, "dd/MM/yyyy"),
            status: item.status,
          };
        })
      );
    };
    fetchData();
  }, [rerenderKey, setRerenderKey]);
  return <Table columns={columns} dataSource={data} />;
};
export default DataTableOfHost;
