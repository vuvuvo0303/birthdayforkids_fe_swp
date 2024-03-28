import React, { useEffect, useState } from "react";
import { HeaderLogin } from "../../component/HeaderLogin";
import { Sidebar } from "../../component/Sidebar";
import { HeaderLoginOfHost } from "../profile/HeaderLoginOfHost";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
export const Service = () => {
    const [services, setServices] = useState([]);
    const params = useParams();
    const fetchPackage = async () => {
        const response = await axios.get(
            `http://birthdayblitzhub.online:8080/api/services/host/${params.id}`
        );
        setServices(response.data);
    };

    useEffect(() => {
        fetchPackage();
    }, []);
    return (
        <div>
            <HeaderLoginOfHost />
            <div className="container ">
                <section className="packages">
                    <h1 className="heading">Our Service</h1>

                    <div className="box-container">
                        {services.map((serviceItem, index) => (
                            <div className="box-package" key={index}>
                                <div className="tutor">
                                    <img
                                        src={serviceItem.account.avatar}
                                        alt={serviceItem.name}
                                    />
                                    <div className="info">
                                        <h3>{serviceItem.name}</h3>
                                    </div>
                                </div>
                                <div className="thumb">
                                    <img
                                        src={serviceItem.picture}
                                        alt={serviceItem.name}
                                    />
                                </div>
                                <h3 className="title">
                                    {new Intl.NumberFormat("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                    }).format(serviceItem.price)}
                                </h3>
                                <Link
                                    to={`http://localhost:5173/serviceDetail/${serviceItem.serviceID}`}
                                    className="btn"
                                >
                                    View detail
                                </Link>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};
