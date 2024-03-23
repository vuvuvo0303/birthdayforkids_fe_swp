import { useEffect, useState } from "react";
import React from "react";
import "./wallet.css";
import { WalletOutlined } from "@ant-design/icons";
import { HeaderLogin } from "../../component/HeaderLogin";
import api from "../../config/axios";
import { Table } from "antd";
import { formatDistance } from "date-fns/formatDistance";

export const Wallet = () => {
    const [balance, setBalance] = useState(0);
    const [transactions, setTransaction] = useState([]);
    const [transactionHistory, setTransactionHistory] = useState([]);

    const fetchWallet = async () => {
        const response = await api.get("/api/wallets");
        setBalance(response.data.totalMoney);
    };

    const fetchTransaction = async () => {
        const response = await api.get("/api/transactions");
        setTransaction(
            response.data.sort(
                (item1, item2) =>
                    new Date(item2.createAt) - new Date(item1.createAt)
            )
        );
    };

    useEffect(() => {
        fetchWallet();
        fetchTransaction();
    }, []);

    const addMoney = () => {
        const amount = parseFloat(prompt("Enter the amount to add:"));

        if (isNaN(amount) || amount <= 0) {
            alert(
                "Invalid amount. Please enter a valid number greater than zero."
            );
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
            dataIndex: "order",
            key: "order",
            render: (value) => value.status,
        },
        {
            title: "Value",
            dataIndex: "order",
            key: "order",
            render: (value) => value.totalPrice,
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
            <HeaderLogin />
            <div className="wallet-container">
                <div className="wallet-first">
                    <div className="wallet-header">
                        <WalletOutlined />
                        <h2>Your Wallet</h2>
                    </div>
                    <div className="wallet-balance">
                        Balance: ${balance.toFixed(2)}
                    </div>
                    <div className="wallet-actions">
                        <button className="wallet-button" onClick={addMoney}>
                            Add Money
                        </button>
                        <button className="wallet-button">Withdraw</button>
                    </div>
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
