import "../list.css";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import { Header } from "../Header";

export default function ServiceDecription() {
    const [service, setService] = useState(null);
    const userName = useParams();
    const [feedback, setFeedback] = useState(null);
    const [data, setData] = useState({
        id: 0,
        name: "",
        price: 0,
        description: "",
        picture: "",
    });

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

    const hanldeGetService = async (id = userName.id) => {
        const url = "http://birthdayblitzhub.online:8080/api/services/" + id;
        await fetch(url, {
            method: "GET",
            headers: { "content-type": "application/json" },
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch data");
                }
                if (res.ok) {
                    // console.log('checkData: ', res.json());
                    // setService(res.json());
                    return res.json();
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
    const hanldeGetFeedBackService = async (id = userName.id) => {
        const url = `http://birthdayblitzhub.online:8080/api/feedbacks/service/${id}`;
        await fetch(url, {
            method: "GET",
            headers: { "content-type": "application/json" },
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch data");
                }
                if (res.ok) {
                    // console.log('checkData: ', res.json());

                    // setService(res.json());
                    return res.json();
                }
                // handle error
            })
            .then((data) => {
                // Do something with the list of tasks
                console.log("real data: ", data);
                setFeedback(data);
                return data;
            })
            .catch((error) => {
                // handle error
            });
    };

    useEffect(() => {
        hanldeGetService();
        hanldeGetFeedBackService();
    }, []);

    return (
        <Box>
            <Header />
            <div className="Detail">
                <img src={service?.picture} alt="Service Picture" />
                <div className="content">
                    <h3>Service Name: {service?.name} </h3>
                    {/* <p>Host: {service?.account.name}</p> */}
                    <p>
                        Description:
                        <br /> {service?.description}
                    </p>
                    <p className="price">Price: {service?.price}$</p>
                    <div>
                        {/* <button>Buy now</button> */}
                        <button
                            onClick={() => {
                                // setIsOpen(true)
                                setData(service);
                            }}
                        >
                            <a href="#popup1" id="openPopUp">
                                Update
                            </a>
                        </button>
                        <button>
                            <Link to={"/ManageService"}>Cancel</Link>
                        </button>
                    </div>
                </div>
            </div>
            <div className="container_feedback">
                {feedback && feedback.length > 0 ? (
                    feedback.map((item) => (
                        <div className="feedback" key={item?.serviceID}>
                            <div className="head">
                                <p>User: {item?.account.name}</p>
                                <p>Date: {item?.feedbackDate} </p>
                            </div>
                            <p className="Reviewed">
                                Reviewed: {item?.description}{" "}
                            </p>
                        </div>
                    ))
                ) : (
                    <strong className="feedback">HAVE NO FEEDBACK</strong>
                )}
            </div>

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
                            <label htmlFor="newDescription">Description:</label>
                            <br />
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
                        {/* <button onClick={() => { setIsOpen(false) }}>Close</button> */}
                    </form>
                </div>
            </div>
        </Box>
    );
}
