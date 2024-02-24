import React from "react";
import "./index.css";
import { HeaderLogin } from "../../component/HeaderLogin";
import { Sidebar } from "../../component/Sidebar";
export const ViewProfile = () => {
    return (
        <div>
            <HeaderLogin />
            <Sidebar />
        </div>
    );
};

export default ViewProfile;
