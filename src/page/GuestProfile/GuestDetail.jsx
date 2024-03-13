import React from "react";
import { HeaderLogin } from "../../component/HeaderLogin";
import { Footer } from "../../component/Footer";
import { OrderHistory } from "./OrderHistory";
import "./index.css";
export const GuestDetail = () => {
    return (
        <div>
            <HeaderLogin />
            <OrderHistory />
        </div>
    );
};
