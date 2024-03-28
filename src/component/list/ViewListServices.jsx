import "../list/list.css";
// import '../App.css'
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import { Header } from "../Header";
import { HeaderLogin } from "../HeaderLogin";
import { HeaderLoginOfHost } from "../../page/profile/HeaderLoginOfHost";
import { Button, Select } from "antd";
import { Footer } from "../Footer";
import { useSelector } from "react-redux";

export default function ViewListServices() {
    const [service, setService] = useState([]);
    const [packages, setPackage] = useState([]);
    const [sortBy, setSortBy] = useState("none");
    const [displayType, setDisplayType] = useState("all");
    const loggedUser = useSelector((store) => store.user);

    const hanldeGetService = () => {
        fetch("http://birthdayblitzhub.online:8080/api/services", {
            method: "GET",
            headers: { "content-type": "application/json" },
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch data");
                }
                if (res.ok) {
                    // console.log('checkData: ', res.json());
                    return res.json();
                    // setData(res.json());
                }
                // handle error
            })
            .then((data) => {
                // Do something with the list of tasks
                // console.log('real data: ', data);
                setService(data);
                return data;
            })
            .catch((error) => {
                // handle error
            });
    };

    const hanldeGetPackage = () => {
        fetch("http://birthdayblitzhub.online:8080/api/packages/available", {
            method: "GET",
            headers: { "content-type": "application/json" },
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch data");
                }
                if (res.ok) {
                    // console.log('checkData: ', res.json());
                    return res.json();
                    // setData(res.json());
                }
                // handle error
            })
            .then((data) => {
                // console.log('real data: ', data);
                setPackage(data);
                return data;
            })
            .catch((error) => {
                // handle error
            });
    };

    const handleChange = (event) => {
        console.log(event);
        setSortBy(event);
        handleSortServiceByPrice(event);
    };

    const handleSortServiceByPrice = (sortBy) => {
        console.log("Sort by:", sortBy);
        if (sortBy === "Desc") {
            const sortedServices = [...service];
            sortedServices.sort((a, b) => b.price - a.price);
            console.log("sortedServices", sortedServices);
            setService(sortedServices);
            console.log("data service: ", service);

            const sortedPackage = [...packages];
            sortedPackage.sort((a, b) => b.price - a.price);
            // console.log('sortedPackage', sortedPackage);
            setPackage(sortedPackage);
            // console.log("data package: ", packages);
        } else if (sortBy === "Asc") {
            const sortedServices = [...service];
            sortedServices.sort((a, b) => a.price - b.price);
            setService(sortedServices);

            const sortedPackage = [...packages];
            sortedPackage.sort((a, b) => a.price - b.price);
            setPackage(sortedPackage);
        }
    };

    const handleDisplayService = () => {
        setDisplayType("service");
    };

    const handleDisplayPackage = () => {
        setDisplayType("package");
    };

    const handleDisplayAll = () => {
        setDisplayType("all");
    };

    useEffect(() => {
        if (displayType === "service") {
            hanldeGetService();
        } else if (displayType === "package") {
            hanldeGetPackage();
        } else {
            hanldeGetService();
            hanldeGetPackage();
        }
    }, [displayType]);

    return (
        <div className="viewListServices">
            {!loggedUser?.role && <Header />}
            {loggedUser?.role === "Guest" && <HeaderLogin />}
            {loggedUser?.role === "Host" && <HeaderLoginOfHost />}

            <div className="viewListServices__feature">
                <div className="viewListServices__feature-container">
                    <div>
                        <button
                            onClick={handleDisplayService}
                            className="btn viewListServices__feature-button "
                        >
                            List all service
                        </button>
                        <button
                            onClick={handleDisplayPackage}
                            className="btn viewListServices__feature-button"
                        >
                            List all package
                        </button>

                        <button
                            onClick={handleDisplayAll}
                            className="btn viewListServices__feature-button"
                        >
                            All
                        </button>
                    </div>
                    <Select
                        // defaultValue="Desc"
                        style={{
                            width: 200,
                        }}
                        status="warning"
                        placeholder="Select"
                        onChange={handleChange}
                        options={[
                            {
                                label: <span>Sort by Price</span>,
                                title: "Sort by Price",
                                options: [
                                    {
                                        label: <span>Descending</span>,
                                        value: "Desc",
                                    },
                                    {
                                        label: <span>Ascending</span>,
                                        value: "Asc",
                                    },
                                ],
                            },
                        ]}
                    />
                </div>
            </div>
            <div className="container">
                {/* {
                    packages.length !== 0 ?
                        <p></p>
                        :
                        <h3></h3>
                } */}

                {(displayType === "all" || displayType === "package") && (
                    <div className="viewListServices__list">
                        {/* <h1>Package</h1> */}
                        {packages.map((item, index) =>
                            item?.packageID ? (
                                <div className="viewListServices__items">
                                    <div
                                        key={item.packageID}
                                        className="viewListServices__content"
                                    >
                                        <img
                                            src={item.picture}
                                            alt="Service Picture"
                                            className="viewListServices__img"
                                        />
                                        <div>
                                            <h3 className="viewListServices__heading">
                                                Package Name: {item.name}{" "}
                                            </h3>
                                            <div className="viewListServices__desc">
                                                <p className="viewListServices__host">
                                                    Host:{" "}
                                                    <span className="viewListServices__host-name">
                                                        {item.account.name}
                                                    </span>
                                                </p>
                                                {item.maximumSlot && (
                                                    <p>
                                                        Maximum Slot:
                                                        {item.maximumSlot}
                                                    </p>
                                                )}
                                                <p className="viewListServices__price">
                                                    {/* Price:{" "} */}
                                                    <span className="viewListServices__price-value">
                                                        {new Intl.NumberFormat(
                                                            "vi-VN",
                                                            {
                                                                style: "currency",
                                                                currency: "VND",
                                                            }
                                                        ).format(item.price)}
                                                    </span>
                                                </p>
                                                <Link
                                                    to={`/packageDetail/${item.packageID}`}
                                                >
                                                    <button className="btn viewListServices__button">
                                                        Detail
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <p>None</p>
                            )
                        )}
                    </div>
                )}
                {/* {
                    service.length !== 0 ?
                        <p></p>
                        :
                        <h2>Waiting...</h2>
                } */}
                {(displayType === "all" || displayType === "service") && (
                    <div className="viewListServices__list">
                        {service.map((item, index) =>
                            item?.serviceID ? (
                                <div className="viewListServices__items">
                                    <div
                                        key={item.serviceID}
                                        className="viewListServices__content"
                                    >
                                        <img
                                            src={item.picture}
                                            alt="Service Picture"
                                            className="viewListServices__img"
                                        />
                                        <div>
                                            <h3 className="viewListServices__heading">
                                                Service Name: {item.name}{" "}
                                            </h3>
                                            <div className="viewListServices__desc">
                                                <p className="viewListServices__host">
                                                    Host:{" "}
                                                    <span className="viewListServices__host-name">
                                                        {item.account.name}
                                                    </span>
                                                </p>
                                                <p className="viewListServices__price">
                                                    {/* Price:{" "} */}
                                                    <span className="viewListServices__price-value">
                                                        {new Intl.NumberFormat(
                                                            "vi-VN",
                                                            {
                                                                style: "currency",
                                                                currency: "VND",
                                                            }
                                                        ).format(item.price)}
                                                    </span>
                                                </p>
                                                <Link
                                                    to={`/serviceDetail/${item.serviceID}`}
                                                >
                                                    <button className="btn viewListServices__button">
                                                        Detail
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <p>None</p>
                            )
                        )}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}
