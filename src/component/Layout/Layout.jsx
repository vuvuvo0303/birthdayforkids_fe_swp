import React from "react";
import { Header } from "../Header";
import { HeaderLogin } from "../HeaderLogin";
import { HeaderLoginOfHost } from "../../page/profile/HeaderLoginOfHost";
import { Footer } from "../Footer";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export const Layout = () => {
    const loggedUser = useSelector((store) => store.user);
    return (
        <>
            {!loggedUser?.role && <Header />}
            {loggedUser?.role === "Guest" && <HeaderLogin />}
            {loggedUser?.role === "Host" && <HeaderLoginOfHost />}
            <Outlet />
            <Footer />
        </>
    );
};
