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
<<<<<<< HEAD
import { Demo } from "./page/demo/index.jsx";
import { HomePage } from "./page/homepage/index.jsx";
import { Layout } from "./component/Layout/Layout.jsx";
import ViewProfile from "./page/Profile/index.jsx";
=======
>>>>>>> 9871afd45089b398d6c76320302ce4a360ea97da

import ServicePage from "./page/party-host/service/index.jsx";
import PackagePage from "./page/party-host/package/index.jsx";
// import ReportPage from "./page/party-host/report/index.jsx";
function App() {
<<<<<<< HEAD
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
            path: "/profile",
            element: <ViewProfile />,
        },
    ]);
    return (
        <>
            <ToastContainer />
            <RouterProvider router={router} />
        </>
    );
=======
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage />,
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
            // {
            //   path: "report",
            //   element: <ReportPage />,
            // },
          ],
        },
      ],
    },
  ]);
  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
>>>>>>> 9871afd45089b398d6c76320302ce4a360ea97da
}

export default App;
