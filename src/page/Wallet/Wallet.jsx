import { useEffect, useState } from "react";
import React from "react";
import "./wallet.css";
import { WalletOutlined } from "@ant-design/icons";
// import { Header } from "../../component/Header";
import { HeaderLogin } from "../../component/HeaderLogin";
import { HeaderLoginOfHost } from "../../page/profile/HeaderLoginOfHost";
import api from "../../config/axios";
import { Table, Tag } from "antd";
import { formatDistance } from "date-fns/formatDistance";
import { useDispatch, useSelector } from "react-redux";
import { CheckCircleOutlined, ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";

export const Wallet = () => {
  const [balance, setBalance] = useState(0);
  const [wallet, setWallet] = useState(null);
  const [transactions, setTransaction] = useState([]);
  const [transactionHistory, setTransactionHistory] = useState([]);
  const loggedUser = useSelector((store) => store.user);

  const fetchWallet = async () => {
    const response = await api.get("/api/wallets");
    // console.log("wallet", response.data);
    setBalance(response.data.totalMoney);
    setWallet(response?.data);
    // console.log("wallet", response?.data);
  };

  const fetchTransaction = async (id) => {
    const response = await api.get(`/api/transactions/wallet/${id}`);
    console.log("fetchTransaction", response?.data);
    setTransaction(response.data.sort((item1, item2) => new Date(item2.createAt) - new Date(item1.createAt)));
  };

  useEffect(() => {
    fetchWallet();
    fetchTransaction(wallet?.walletID);
    // loggedUser?.accountID
  }, []);

  useEffect(() => {
    fetchTransaction(wallet?.walletID);
    // loggedUser?.accountID
  }, [wallet]);

  const addMoney = () => {
    const amount = parseFloat(prompt("Enter the amount to add:"));

    if (isNaN(amount) || amount <= 0) {
      alert("Invalid amount. Please enter a valid number greater than zero.");
      return;
    } else {
    }

    const updatedBalance = balance + amount;
    setBalance(updatedBalance);
    addTransaction(`Added $${amount.toFixed(2)}`);
  };

  const addTransaction = (description) => {
    setTransactionHistory([...transactionHistory, description]);
  };

    const columns = [
        {
            title: "Order Id",
            dataIndex: "order",
            key: "order",
            render: (value) => {
                return value.orderID;
            },
        },
        {
            title: "Status",
            // dataIndex: "transactionStatus",
            // key: "transactionStatus",
            render: (value) =>
                value.transactionStatus === "SENDING" ? (
                    <Tag
                        icon={<ArrowUpOutlined />}
                        color="success"
                        style={{ fontSize: 15 }}
                    >
                        Sending
                    </Tag>
                ) : (
                    <Tag
                        icon={<ArrowDownOutlined />}
                        color="Green"
                        style={{ fontSize: 15.5 }}
                    >
                        Receive
                    </Tag>
                ),
        },
        {
            title: "Account",
            dataIndex: "order",
            key: "order",
            render: (value) => value.customerName,
        },
        {
            title: "Value",
            // dataIndex: "order",
            // key: "order",
            render: (value) =>
            //  value.totalPrice
                new Intl.NumberFormat(
                    "vi-VN",
                    {
                        style: "currency",
                        currency: "VND",
                    }
                ).format(value.totalPrice),
        },
        {
            title: "Create At",
            dataIndex: "createAt",
            key: "createAt",
            render: (value) =>
                formatDistance(new Date(value), new Date(), {
                    addSuffix: true,
                }),
        },
    ];
    return (
        <div>
            {loggedUser?.role === "Guest" && <HeaderLogin />}
            {loggedUser?.role === "Host" && <HeaderLoginOfHost />}
            {!loggedUser?.role && <HeaderLogin />}
            <div className="wallet-container">
                <div className="wallet-first">
                    <div className="wallet-header">
                        <WalletOutlined />
                        <h2>{loggedUser?.name}'s Wallet</h2>
                    </div>
                    <div className="wallet-balance">
                        Balance:{" "}
                        {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                        }).format(balance.toFixed(2))}
                    </div>
                    {/* <div className="wallet-actions">
                        <button className="wallet-button" onClick={addMoney}>
                            Add Money
                        </button>
                        <button className="wallet-button">Withdraw</button>
                    </div> */}
        </div>
        <div className="transaction-history">
          <h3>Transaction History</h3>
          <Table dataSource={transactions} columns={columns} />

          {/* <ul>
                        {transactions.map((transaction, index) => (
                            <li key={index}>{transaction.transactionID}</li>
                        ))}
                    </ul> */}
        </div>
      </div>
    </div>
  );
};
