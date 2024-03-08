import { useState } from "react";
import React from "react";
import "./wallet.css";
import { WalletOutlined } from "@ant-design/icons";
import { HeaderLogin } from "../../component/HeaderLogin";

export const Wallet = () => {
    const [balance, setBalance] = useState(0);
    const [transactionHistory, setTransactionHistory] = useState([]);

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
                    <ul>
                        {transactionHistory.map((transaction, index) => (
                            <li key={index}>{transaction}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};
