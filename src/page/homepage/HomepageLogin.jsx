import React from "react";
import { HeaderLogin } from "../../component/HeaderLogin";
import { HomePage } from ".";
import { Footer } from "../../component/Footer";

export const HomepageLogin = () => {
    return (
        <div>
            <HeaderLogin />
            <HomePage />
            <Footer />
        </div>
    );
};