import React, { useEffect, useState } from "react";
import { Header } from "../../component/Header";
import { SidebarNoLogin } from "../profile/SidebarNoLogin";
import { useParams } from "react-router";
import axios from "axios";
import { Link } from "react-router-dom";
export const ServiceNoLogin = () => {
    const { id } = useParams();
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
            <Header />
            <div className="container container-profile">
                <section className="services">
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
                                    {serviceItem.price} VNĐ
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
            <SidebarNoLogin id={id} />
        </div>
    );
};
