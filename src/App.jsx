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

import ServicePage from "./page/party-host/service/index.jsx";
import PackagePage from "./page/party-host/package/index.jsx";
// import ReportPage from "./page/party-host/report/index.jsx";
function App() {
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
}

export default App;
