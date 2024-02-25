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
            element: <DashBoard />,
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
    ]);
    return (
        <>
            <ToastContainer />
            <RouterProvider router={router} />
        </>
    );
}

export default App;
