import "../decription/description.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Header } from "../Header";
import { HeaderLogin } from "../HeaderLogin";
import { HeaderLoginOfHost } from "../../page/profile/HeaderLoginOfHost";
import { Footer } from "../../component/Footer";
import { Space, Typography } from "antd";
import { Helmet } from "react-helmet";
import { FacebookOutlined } from "@ant-design/icons";

export default function ServiceDecription() {
    const [service, setService] = useState(null);
    const userName = useParams();
    const [feedback, setFeedback] = useState(null);
    const { Text, Link } = Typography;

    const navigate = useNavigate();

    const [data, setData] = useState({
        id: 0,
        name: "",
        price: 0,
        description: "",
        picture: "",
    });
    const loggedUser = useSelector((store) => store.user);

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
        <div className="viewSerivceDetail">
            <Helmet>
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css"
                />
            </Helmet>
            {!loggedUser?.role && <Header />}
            {loggedUser?.role === "Guest" && <HeaderLogin />}
            {loggedUser?.role === "Host" && <HeaderLoginOfHost />}
            <div className="container">
                <div className="Detail">
                    <img
                        src={service?.picture}
                        alt="Service Picture"
                        className="viewSerivceDetail__img"
                    />
                    <div className="content">
                        <h3 className="Name">Service Name: {service?.name} </h3>
                        {/* <p>Host: {service?.account.name}</p> */}
                        <Text type="success">
                            Service || <i class="fa-solid fa-star"> </i>{" "}
                            <i class="fa-solid fa-star"> </i>{" "}
                            <i class="fa-solid fa-star"> </i>{" "}
                            <i class="fa-solid fa-star"> </i>{" "}
                            <i class="fa-solid fa-star"> </i>
                        </Text>
                        <br />
                        <div className="viewSerivceDetail__desc">
                            <h2 className="descrip">Description:</h2>
                            <ul className="descrip_cont">
                                <li>Provided by: {service?.account.name}</li>
                                <li>Detail: {service?.description}</li>
                            </ul>

                            <p className="price">
                                {new Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                }).format(service?.price)}{" "}
                            </p>
                            <p>
                                Share:{" "}
                                <i class="fa-brands fa-facebook fa-icon">
                                    {" "}
                                    <i class="fa-brands fa-twitter fa-icon"></i>
                                </i>
                                <i class="fa-brands fa-pinterest fa-icon"></i>
                                <i class="fa-brands fa-facebook-messenger fa-icon"></i>
                            </p>
                            <div className="viewSerivceDetail__button">
                                {/* <button>Buy now</button> */}

                                <button className="btn viewSerivceDetail__btn">
                                    <a href="/ViewListService">Cancel</a>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
