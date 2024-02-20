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
import { Demo } from "./page/demo/index.jsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <div>Hello world!</div>,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    // {
    //   path: "/dashboard",
    //   children: [
    //     {
    //       path: "host",
    //       element: <DashBoard role={"PARTY_HOST"} />,
    //     },
    //     {
    //       path: "admin",
    //       element: <DashBoard role={"ADMIN"} />,
    //     },
    //   ],
    // },
    {
      path: "/dashboard",
      element: <DashBoard />,
    },
    {
      path: "/demo",
      element: <Demo />,
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
