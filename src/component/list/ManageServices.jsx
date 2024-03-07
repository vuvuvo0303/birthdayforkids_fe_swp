import "../list.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HeaderLogin } from "../HeaderLogin";
import { Box } from "@mui/material";
// import { Header } from '../Header';
import { Alert, Flex, Spin } from "antd";

export default function ManageService() {
    const [services, setServices] = useState([]);
    const [packages, setPackages] = useState([]);
    const [data, setData] = useState({
        id: 0,
        name: "",
        price: 0,
        description: "",
        picture: "",
    });
    const [isOpen, setIsOpen] = useState(false);

    const handleUpdate = (ID) => {
        // if (Object.keys(updatedData).length === 0) {
        //     alert('Please provide at least one field to update.');
        //     return;
        // }
        fetch(`http://birthdayblitzhub.online:8080/api/services/${ID}`, {
            method: "PUT", // or PATCH
            headers: { "content-type": "application/json" },
            body: JSON.stringify(data),
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                // handle error
            })
            .then((task) => {
                // Do something with updated task
                console.log("check data: ", task);
            })
            .catch((error) => {
                // handle error
            });
    };

    const handleUpdatePackage = (ID) => {
        // if (Object.keys(updatedData).length === 0) {
        //     alert('Please provide at least one field to update.');
        //     return;
        // }
        fetch(`http://birthdayblitzhub.online:8080/api/packages/${ID}`, {
            method: "PUT", // or PATCH
            headers: { "content-type": "application/json" },
            body: JSON.stringify(data),
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                // handle error
            })
            .then((task) => {
                // Do something with updated task
                console.log("check data: ", task);
            })
            .catch((error) => {
                // handle error
            });
    };

    const handleDeleteService = (ServiceID) => {
        // alert('Do you want to Delete?');
        const url =
            "http://birthdayblitzhub.online:8080/api/services/" + ServiceID;
        fetch(url, {
            method: "DELETE",
        })
            .then(async (data) => {
                console.log(ServiceID);
                const newArray = services.filter(
                    (item) => item.serviceID !== ServiceID
                );
                setServices(newArray);
            })
            .catch((error) => {
                // handle error
            });
    };

    const handleDeletePackage = (PackageID) => {
        const url =
            "http://birthdayblitzhub.online:8080/api/packages/" + PackageID;
        fetch(url, {
            method: "DELETE",
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch data");
                }
                if (res.ok) {
                    return res.json();
                }
                // handle error
            })
            .then((data) => {
                // Do something with deleted task
                if (data?.packageID) {
                    const newArray = packages.filter(
                        (item) => item.packageID !== data.packageID
                    );
                    setPackages(newArray);
                } else {
                    alert("wrong ID");
                }
                return data;
            })
            .catch((error) => {
                // handle error
            });
    };

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
                setServices(data);
                return data;
            })
            .catch((error) => {
                // handle error
            });
    };

    const hanldeGetPackage = () => {
        fetch("http://birthdayblitzhub.online:8080/api/packages/allPackages", {
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
                setPackages(data);
                return data;
            })
            .catch((error) => {
                // handle error
            });
    };

    // const handleTest = (e) => {
    //     setData(prevState => ({
    //         ...prevState,
    //         name: e.target.value
    //     }))
    // }
    useEffect(() => {
        hanldeGetService();
        hanldeGetPackage();
    }, []);

    // useEffect(() => {
    //     localStorage.setItem('service', JSON.stringify(services));
    // }, [services])

    // useEffect(() => {
    //     localStorage.setItem('packages', JSON.stringify(packages));
    // }, [packages])

    return (
        <Box>
            {/* <Header /> */}
            <HeaderLogin />
            {services.length !== 0 ? (
                <h3>List Services</h3>
            ) : (
                <h2>
                    {/* <Spin tip="Loading" size="large">
                        <div className="content" />
                    </Spin> */}
                </h2>
            )}
            <div className="list">
                {services.map((item, index) =>
                    item?.serviceID ? (
                        <div className="servicee" key={item.serviceID}>
                            <img src={item.picture} alt="Service Picture" />
                            <div className="content">
                                <h5>Service Name: {item.name} </h5>
                                <p>Host: {item.account.name}</p>
                                <p>{item.description}</p>
                                <p className="price">Price: {item.price}$</p>
                                <div>
                                    <Link
                                        to={`http://localhost:5173/serviceDetail/${item.serviceID}`}
                                    >
                                        <button>Detail</button>
                                    </Link>
                                    <button
                                        onClick={() => {
                                            setIsOpen(true);
                                            setData(item);
                                        }}
                                    >
                                        <a href="#popup1" id="openPopUp">
                                            Update
                                        </a>
                                    </button>
                                    <button
                                        onClick={() => {
                                            handleDeleteService(item.serviceID);
                                            hanldeGetService();
                                        }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p></p>
                    )
                )}
            </div>
            {isOpen ? (
                <div id="popup1" className="overlay">
                    <div className="popup">
                        <a className="close" href="#">
                            &times;
                        </a>
                        <img src={data.picture} alt="Service Picture" />
                        <form className="content">
                            <div>
                                <label htmlFor="newName">Service Name:</label>
                                <input
                                    type="text"
                                    id="newName"
                                    value={data.name}
                                    onChange={(e) => {
                                        setData((prevState) => ({
                                            ...prevState,
                                            name: e.target.value,
                                        }));
                                    }}
                                />
                            </div>
                            <div>
                                <label htmlFor="newPrice">Price:</label>
                                <input
                                    type="number"
                                    id="newPrice"
                                    value={data.price}
                                    onChange={(e) => {
                                        setData((prevState) => ({
                                            ...prevState,
                                            price: e.target.value,
                                        }));
                                    }}
                                />
                                $
                            </div>
                            <div>
                                <label htmlFor="newDescription">
                                    Description:
                                </label>
                                <textarea
                                    id="newDescription"
                                    value={data.description}
                                    onChange={(e) => {
                                        setData((prevState) => ({
                                            ...prevState,
                                            description: e.target.value,
                                        }));
                                    }}
                                />
                            </div>
                            <button
                                className="buttUpdate"
                                type="submit"
                                onClick={() => {
                                    handleUpdate(data?.serviceID);
                                    hanldeGetService();
                                }}
                            >
                                Update
                            </button>
                            <button
                                className="Close"
                                onClick={() => {
                                    setIsOpen(false);
                                }}
                            >
                                Close
                            </button>
                        </form>
                    </div>
                </div>
            ) : (
                <p></p>
            )}

            {packages.length !== 0 ? (
                <h3>List Packages</h3>
            ) : (
                <h3>
                    <Spin tip="Loading" size="large">
                        <div className="content" />
                    </Spin>
                </h3>
            )}
            <div className="list">
                {packages.map((item, index) =>
                    item?.packageID ? (
                        <div className="servicee" key={item.packageID}>
                            <img src={item.picture} alt="Service Picture" />
                            <div className="content">
                                <h5>Package Name: {item.name} </h5>
                                <p>Host: {item.account.name}</p>
                                <p>{item.description}</p>
                                <p>Price: {item.price}$</p>
                                <div>
                                    <Link
                                        to={`http://localhost:5173/packageDetail/${item.packageID}`}
                                    >
                                        <button>Detail</button>
                                    </Link>
                                    <button
                                        onClick={() => {
                                            setIsOpen(true);
                                            setData(item);
                                        }}
                                    >
                                        <a href="#popup2" id="openPopUp">
                                            Update
                                        </a>
                                    </button>
                                    <button
                                        onClick={() => {
                                            handleDeletePackage(item.packageID);
                                        }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p></p>
                    )
                )}
            </div>
            {isOpen ? (
                <div id="popup2" className="overlay">
                    <div className="popup">
                        <a className="close" href="#">
                            &times;
                        </a>
                        <img src={data.picture} alt="Service Picture" />
                        <form className="content">
                            <div>
                                <label htmlFor="newName">Service Name:</label>
                                <input
                                    type="text"
                                    id="newName"
                                    value={data.name}
                                    onChange={(e) => {
                                        setData((prevState) => ({
                                            ...prevState,
                                            name: e.target.value,
                                        }));
                                    }}
                                />
                            </div>
                            <div>
                                <label htmlFor="newPrice">Price:</label>
                                <input
                                    type="number"
                                    id="newPrice"
                                    value={data.price}
                                    onChange={(e) => {
                                        setData((State) => ({
                                            ...State,
                                            price: e.target.value,
                                        }));
                                    }}
                                />
                                $
                            </div>
                            <div>
                                <label htmlFor="newDescription">
                                    Description:
                                </label>
                                <textarea
                                    id="newDescription"
                                    value={data.description}
                                    onChange={(e) => {
                                        setData((prevState) => ({
                                            ...prevState,
                                            description: e.target.value,
                                        }));
                                    }}
                                />
                            </div>
                            <button
                                className="buttUpdate"
                                type="submit"
                                onClick={() => {
                                    handleUpdatePackage(data?.packageID);
                                    setIsOpen(false);
                                    hanldeGetService();
                                }}
                            >
                                Update
                            </button>
                            <button
                                className="Close"
                                onClick={() => {
                                    setIsOpen(false);
                                }}
                            >
                                Close
                            </button>
                        </form>
                    </div>
                </div>
            ) : (
                <p></p>
            )}
        </Box>
    );
}
