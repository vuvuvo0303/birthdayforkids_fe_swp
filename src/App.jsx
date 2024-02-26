import axios from "axios";
import "./App.css";
import { useEffect } from "react";
import FormLogin from "./component/form.jsx";
import { LoginPage } from "./page/login/index.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Register } from "./page/register/index.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashBoard from "./component/dashboard/index.jsx";
import { HomePage } from "./page/homepage/index.jsx";
import { Layout } from "./component/Layout/Layout.jsx";
import ViewProfile from "./page/profile/index.jsx";
import { Package } from "./page/packagehost/Package.jsx";
import { Service } from "./page/packagehost/Service.jsx";
import { YourProfile } from "./page/profile/YourProfile.jsx";
import { UpdateProfile } from "./page/profile/updateProfile.jsx";
import { HomepageLogin } from "./page/homepage/HomepageLogin.jsx";
import { Hostpage } from "./page/HostPage/Hostpage.jsx";

import ServicePage from "./page/party-host/service/index.jsx";
import PackagePage from "./page/party-host/package/index.jsx";
import ReportPage from "./page/party-host/report/index.jsx";
import ManageAccounts from "./page/dashboad_admin/manage_accounts/index.jsx";
import ReportPageAdmin from "./page/dashboad_admin/report_admin/index.jsx";
import StepProgress from "./page/step_progress/index.jsx";
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
            element: <Register />,
        },
        {
            path: "/dashboard",
            children: [
                {
                    path: "party-host",
                    element: <DashBoard role={"PARTY_HOST"} />,
                    children: [
                        {
                            path: "service",
                            element: <ServicePage />,
                        },
                        {
                            path: "package",
                            element: <PackagePage />,
                        },
                        {
                            path: "report",
                            element: <ReportPage />,
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
                    ],
                },
            ],
        },
        {
            path: "/step-progress",
            element: <StepProgress />,
        },
        {
            path: "/about",
            element: <ViewProfile />,
        },
        {
            path: "/package",
            element: <Package />,
        },
        {
            path: "/service",
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
            path: "/homepageLogin",
            element: <HomepageLogin />,
        },
        {
            path: "/hostpage",
            element: <Hostpage />,
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
