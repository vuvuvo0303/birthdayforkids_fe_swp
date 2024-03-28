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
            {(!loggedUser?.role || loggedUser?.role != "Guest" && loggedUser?.role != "Host") && <Header />}
            {loggedUser?.role === "Guest" && <HeaderLogin />}
            {loggedUser?.role === "Host" && <HeaderLoginOfHost />}
            {/* if({loggedUser?.role === "Guest"}){
                <HeaderLogin />
            } else if ({loggedUser?.role === "Host"}){
                <HeaderLoginOfHost />
            } else {
                <Header />
            } */}
            <Outlet />
            <Footer />
        </>
    );
};
