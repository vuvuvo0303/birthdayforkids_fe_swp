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
import { HostProfile } from "./page/profile/HostProfile.jsx";
import EditProfileHosts from "./page/party-host/editprofilehosts/index.jsx";
import ServicePage from "./page/party-host/service/index.jsx";
import PackagePage from "./page/party-host/package/index.jsx";
import ReportPage from "./page/party-host/report/index.jsx";
import ManageAccounts from "./page/dashboad_admin/report_admin/manage_accounts/index.jsx";
import ReportPageAdmin from "./page/dashboad_admin/report_admin/index.jsx";
import StepProgress from "./page/step_progress/index.jsx";
import { GuestDetail } from "./page/GuestProfile/GuestDetail.jsx";
import { GuestProfile } from "./page/GuestProfile/GuestProfile.jsx";
import { AboutNoLogin } from "./page/profile/AboutNoLogin.jsx";
import { PackageNoLogin } from "./page/packagehost/PackageNoLogin.jsx";
import ManagePackageAndService from "./page/party-host/manage_package_service/index.jsx";
import { ServiceNoLogin } from "./page/packagehost/ServiceNoLogin.jsx";

import ManageService from "./component/list/ManageServices.jsx";
import ViewListServices from "./component/list/ViewListServices.jsx";
import ServiceDecription from "./component/decription/ServiceDecription.jsx";
import PackageDecription from "./component/decription/PackageDecription.jsx";

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
    {
      path: "/guestDetail",
      element: <GuestDetail />,
    },
    {
      path: "/guestProfile",
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
      path: "/packageNoLogin",
      element: <PackageNoLogin />,
    },
    {
      path: "/serviceNoLogin",
      element: <ServiceNoLogin />,
    },
    {
      path: "/ViewListService",
      element: <ViewListServices />
    },
    {
      path: "/ManageService",
      element: <ManageService />
    },
    {
      path: '/serviceDetail/:id',
      element: <ServiceDecription />
    },
    {
      path: '/packageDetail/:id',
      element: <PackageDecription />
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
