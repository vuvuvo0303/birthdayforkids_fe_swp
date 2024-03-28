import React, { useEffect } from "react";
import { Space, Table, Tag } from "antd";
import { Button } from "@chakra-ui/react";
import { useState } from "react";
import api from "../../../../config/axios";
import { format } from "date-fns";

const DataTable = () => {
  const [data, setData] = useState([]);
  const [rerenderKey, setRerenderKey] = useState(0);
  const forceRerender = () => {
    setRerenderKey(rerenderKey + 1);
  };
  // const handleDelete = async (id) => {
  //   const response = await api.delete(`api/orders/${id}`);
  //   forceRerender();
  // };
  const columns = [
    {
      title: "Customer",
      dataIndex: "customer",
      key: "customerName",
    },
    {
      title: "Host Name",
      dataIndex: "hostname",
      key: "customerName",
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
      title: "Total price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (text, record) => (
        <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(record.totalPrice)}</span>
      ),
    },
    {
      title: "Deposited",
      dataIndex: "depositedMoney",
      key: "depositedMoney",
      render: (text, record) => (
        <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(record.depositedMoney)}</span>
      ),
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
    // {
    //   title: "Action",
    //   key: "action",
    //   render: (_, record) => (
    //     <Space size="middle">
    //       <Button
    //         onClick={() => {
    //           handleDelete(record.id);
    //         }}
    //       >
    //         Delete
    //       </Button>
    //     </Space>
    //   ),
    // },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get("api/orders");
      const responseData = response.data;
      setData(
        responseData.map((item) => {
          return {
            id: item.orderID,
            customer: item.customerName,
            hostname: item.packageEntity.account.name,
            phone: item.phone,
            package: item.packageEntity.name,
            totalPrice: item.totalPrice,
            depositedMoney: item.depositedMoney,
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
export default DataTable;
