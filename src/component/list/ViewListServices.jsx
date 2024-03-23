// import "../list.css";
// import '../App.css'
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import { Header } from "../Header";
import { Select } from "antd";
import { Footer } from "../Footer";

export default function ViewListServices() {
    const [service, setService] = useState([]);
    const [packages, setPackage] = useState([]);
    const [sortBy, setSortBy] = useState("none");
    const [displayType, setDisplayType] = useState("all");

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
                // Do something with the list of tasks
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
        // Gọi hàm xử lý sắp xếp dịch vụ ở đây
        handleSortServiceByPrice(event);
    };

    const handleSortServiceByPrice = (sortBy) => {
        // Viết logic sắp xếp dịch vụ ở đây
        console.log("Sort by:", sortBy);
        if (sortBy === "Desc") {
            const sortedServices = [...service]; // Tạo một bản sao của mảng service để tránh ảnh hưởng đến state gốc
            sortedServices.sort((a, b) => b.price - a.price); // Sắp xếp mảng các dịch vụ theo giá giảm dần
            console.log("sortedServices", sortedServices);
            setService(sortedServices); // Cập nhật state service với mảng đã được sắp xếp
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
    // const handleDisplayAll = () => {
    //     setDisplayType('all');
    // };

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
        <Box>
            
            <div className="choose">
                <div className="choose_button">
                    <button className="Display" onClick={handleDisplayService}>
                        List all service
                    </button>
                    <button className="Display" onClick={handleDisplayPackage}>
                        List all package
                    </button>
                </div>
                <Select
                    // defaultValue="Desc"
                    style={{
                        width: 200,
                        // marginTop: 100,
                        // marginLeft: 100,
                    }}
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

            {/* {
                packages.length !== 0 ?
                    <p></p>
                    :
                    <h3></h3>
            } */}
            {(displayType === "all" || displayType === "package") && (
                <div className="list">
                    {packages.map((item, index) =>
                        item?.packageID ? (
                            <div className="servicee" key={item.packageID}>
                                <img src={item.picture} alt="Service Picture" />
                                <div className="content">
                                    <h5 className="NameIntoList">
                                        Package Name: {item.name}{" "}
                                    </h5>
                                    <p>Host: {item.account.name}</p>
                                    {/* <p>{item.description}</p> */}
                                    <p className="price">
                                        Price: {item.price} VNĐ
                                    </p>
                                    <Link
                                        to={`http://localhost:5173/packageDetail/${item.packageID}`}
                                    >
                                        <button>Detail</button>
                                    </Link>
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
                <div className="list">
                    {service.map((item, index) =>
                        item?.serviceID ? (
                            <div className="servicee" key={item.serviceID}>
                                <img src={item.picture} alt="Service Picture" />
                                <div className="content">
                                    <h5 className="NameIntoList">
                                        Service Name: {item.name}{" "}
                                    </h5>
                                    <p>Host: {item.account.name}</p>
                                    <p className="price">
                                        Price: {item.price} VNĐ
                                    </p>
                                    <Link
                                        to={`http://localhost:5173/serviceDetail/${item.serviceID}`}
                                    >
                                        <button>Detail</button>
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <p>None</p>
                        )
                    )}
                </div>
            )}
            <Footer />
        </Box>
    );
}
