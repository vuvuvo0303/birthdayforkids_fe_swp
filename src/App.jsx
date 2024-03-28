import "./App.css";
import { LoginPage } from "./page/login/index.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashBoard from "./component/dashboard/index.jsx";
import { HomePage } from "./page/homepage/HomePage.jsx";
import { Layout } from "./component/Layout/Layout.jsx";
import ViewProfile from "./page/profile/AboutOfHost.jsx";
import { Package } from "./page/packagehost/Package.jsx";
import { Service } from "./page/packagehost/Service.jsx";
import { YourProfile } from "./page/profile/YourProfile.jsx";
import { UpdateProfile } from "./page/profile/updateProfile.jsx";
import { Hostpage } from "./page/HostPage/Hostpage.jsx";
import { HostProfile } from "./page/profile/HostProfile.jsx";
import EditProfileHosts from "./page/party-host/editprofilehosts/index.jsx";
import ReportPage from "./page/party-host/report/index.jsx";
import ManageAccounts from "./page/dashboad_admin/report_admin/manage_accounts/index.jsx";
import ReportPageAdmin from "./page/dashboad_admin/report_admin/index.jsx";
import React from "react";
import { GuestDetail } from "./page/GuestProfile/GuestDetail.jsx";
import { GuestProfile } from "./page/GuestProfile/GuestProfile.jsx";
import { AboutNoLogin } from "./page/profile/AboutNoLogin.jsx";
import { PackageNoLogin } from "./page/packagehost/PackageNoLogin.jsx";
import ManagePackageAndService from "./page/party-host/manage_package_service/index.jsx";
import { ServiceNoLogin } from "./page/packagehost/ServiceNoLogin.jsx";
import ManageSchedule from "./page/party-host/manage_schedule/ManageSchedule.jsx";

import ViewListServices from "./component/list/ViewListServices.jsx";
import ServiceDecription from "./component/decription/ServiceDecription.jsx";
import PackageDecription from "./component/decription/PackageDecription.jsx";
import StepProgress from "./page/step_progress/index.jsx";
import SuccessPage from "./page/success/index.jsx";
import ManageOrder from "./page/dashboad_admin/report_admin/manage-orders/ManageOrder";

import { Wallet } from "./page/Wallet/Wallet.jsx";
import { Policy } from "./page/Privacy Policy/Policy.jsx";
import ManageOrdersOfHost from "./page/party-host/ManageOrdersOfHost/ManageOrderOfHost";

import { ViewInfoOfHost } from "./page/HostPage/ViewInfoOfHost";
import FailedPage from "./page/failpayment/index";
import ManageFeedBacks from "./page/dashboad_admin/report_admin/manage-feedbacks/index";
import AdminWallet from "./page/dashboad_admin/report_admin/admin-wallet/index";
import BusyDate from "./page/party-host/busydate/index";
import ManageFeedbackOfHost from "./page/party-host/manage_feedbacks_of_host/index";
import ManageServices from "./page/party-host/manaege_services/index";
function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            children: [
                {
                    path: "",
                    element: <HomePage />,
                },
                {
                    path: "abc",
                    element: <h1>abc</h1>,
                },
            ],
        },
        
        {
            path: "/login",
            element: <LoginPage />,
        },
        {
            path: "/register",
            element: <LoginPage isRegister />,
        },
        {
            path: "/dashboard",
            children: [
                {
                    path: "party-host",
                    element: <DashBoard role={"PARTY_HOST"} />,
                    children: [
                        {
                            path: "manage-package-service",
                            element: <ManagePackageAndService />,
                        },
                        {
                            path: "report",
                            element: <ReportPage />,
                        },
                        {
                            path: "edit-ptofile-hosts",
                            element: <EditProfileHosts />,
                        },
                        {
                            path: "manage-schedule",
                            element: <ManageSchedule />,
                        },
                        {
                            path: "manage-orders-of-hosts",
                            element: <ManageOrdersOfHost />,
                        },
                        {
                            path: "manage-busy-date",
                            element: <BusyDate />,
                        },
                        {
                            path: "manage-feedbacks-of-host",
                            element: <ManageFeedbackOfHost />,
                        },
                        {
                            path: "manage-services",
                            element: <ManageServices />,
                        },
                    ],
                },
                {
                    path: "admin",
                    element: <DashBoard role={"ADMIN"} />,
                    children: [
                        {
                            path: "manage-accounts",
                            element: <ManageAccounts />,
                        },
                        {
                            path: "report-admin",
                            element: <ReportPageAdmin />,
                        },
                        {
                            path: "manage-orders",
                            element: <ManageOrder />,
                        },
                        {
                            path: "wallet",
                            element: <Wallet />,
                        },
                        {
                            path: "manage-feedbacks",
                            element: <ManageFeedBacks />,
                        },
                        {
                            path: "admin-wallet",
                            element: <AdminWallet />,
                        },
                    ],
                },
            ],
        },
        {
            path: "/booking/:accountID",
            element: <StepProgress />,
        },
        {
            path: "/about/:id",
            element: <ViewProfile />,
        },
        {
            path: "/package/:id",
            element: <Package />,
        },
        {
            path: "/service/:id",
            element: <Service />,
        },
        {
            path: "/yourProfile",
            element: <YourProfile />,
        },
        {
            path: "/updateProfile",
            element: <UpdateProfile />,
        },
        {
            path: "/hostpage",
            element: <Hostpage />,
        },
        {
            path: "/viewInfoOfHost",
            element: <ViewInfoOfHost />,
        },
        {
            path: "/guestDetail",
            element: <GuestDetail />,
        },
        {
            path: "/guestProfile/:id",
            element: <GuestProfile />,
        },
        {
            path: "/HostProfile",
            element: <HostProfile />,
        },
        //Guest khi nhin about Profile cua Host
        {
            path: "/host/:id",
            element: <AboutNoLogin />,
        },
        {
            path: "/packageNoLogin/:id",
            element: <PackageNoLogin />,
        },
        {
            path: "/serviceNoLogin/:id",
            element: <ServiceNoLogin />,
        },
        {
            path: "/ViewListService",
            element: <ViewListServices />,
        },

        {
            path: "/serviceDetail/:id",
            element: <ServiceDecription />,
        },
        {
            path: "/packageDetail/:id",
            element: <PackageDecription />,
        },
        {
            path: "/success",
            element: <SuccessPage />,
        },
        {
            path: "/failed",
            element: <FailedPage />,
        },
        {
            path: "/Policy",
            element: <Policy />,
        },
        {
            path: "/Wallet",
            element: <Wallet />,
        },
    ]);
    return (
        <>
            <ToastContainer />
            <RouterProvider router={router} />
        </>
    );
}

export default App;
