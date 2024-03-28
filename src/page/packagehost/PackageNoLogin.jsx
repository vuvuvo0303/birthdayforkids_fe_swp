import React, { useEffect, useState } from "react";
import { Header } from "../../component/Header";
import { HeaderLogin } from "../../component/HeaderLogin";
import { HeaderLoginOfHost } from "../../page/profile/HeaderLoginOfHost";
import { SidebarNoLogin } from "../profile/SidebarNoLogin";
import { useParams } from "react-router";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
export const PackageNoLogin = () => {
    const { id } = useParams();
    const [packages, setPackages] = useState([]);
    const loggedUser = useSelector((store) => store.user);
    const params = useParams();
    const fetchPackage = async () => {
        const response = await axios.get(
            `http://birthdayblitzhub.online:8080/api/packages/packages-of-host/${params.id}`
        );
        setPackages(response.data);
    };

    useEffect(() => {
        fetchPackage();
    }, []);
    return (
        <div>
            {!loggedUser?.role && <Header />}
            {loggedUser?.role === "Guest" && <HeaderLogin />}
            {loggedUser?.role === "Host" && <HeaderLoginOfHost />}
            <div className="container container-profile">
                <section className="packages">
                    <h1 className="heading">Our packages</h1>

                    <div className="box-container">
                        {packages.map((packageItem, index) => (
                            <div className="box-package" key={index}>
                                <div className="tutor">
                                    <img
                                        src={packageItem.account.avatar}
                                        alt={packageItem.name}
                                    />
                                    <div className="info">
                                        <h3>{packageItem.name}</h3>
                                    </div>
                                </div>
                                <div className="thumb">
                                    <img
                                        src={packageItem.picture}
                                        alt={packageItem.name}
                                    />
                                </div>
                                <h3 className="title">
                                    {new Intl.NumberFormat("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                    }).format(packageItem.price)}
                                </h3>
                                <Link
                                    to={`http://localhost:5173/packageDetail/${packageItem.packageID}`}
                                    className="btn"
                                >
                                    View detail
                                </Link>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
            <SidebarNoLogin id={id} />
        </div>
    );
};
