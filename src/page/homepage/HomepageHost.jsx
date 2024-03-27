import React from "react";
import { HeaderLoginOfHost } from "../../page/profile/HeaderLoginOfHost";
import { HomePage } from "./HomePage";
import { Footer } from "../../component/Footer";

export const HomepageHost = () => {
    return (
        <div>
            <HeaderLoginOfHost />
            <HomePage />
            <Footer />
        </div>
    );
};
