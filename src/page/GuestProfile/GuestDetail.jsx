import React from "react";
import { HeaderLogin } from "../../component/HeaderLogin";
import { SidebarGuest } from "./SidebarGuest";
import { OrderHistory } from "./OrderHistory";
import "./index.css";
export const GuestDetail = () => {
    return (
        <div>
            <HeaderLogin />
            <OrderHistory />
            <SidebarGuest />
        </div>
    );
};
