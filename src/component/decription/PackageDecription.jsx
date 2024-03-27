import "../decription/description.css";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Box } from "@mui/material";
// import { Header } from "../Header";
import { Header } from "../Header";
import { HeaderLogin } from "../HeaderLogin";
import { HeaderLoginOfHost } from "../../page/profile/HeaderLoginOfHost";
import { useDispatch, useSelector } from "react-redux";
import { updatePackage } from "../../redux/features/bookingSlice";
import { Footer } from "../../component/Footer";
import { Helmet } from "react-helmet";
import { Space, Typography } from "antd";

export default function PackageDecription() {
    const [packages, setPackage] = useState(null);
    const [services, setServices] = useState(null);
    const userName = useParams();
    const { Text, Link } = Typography;

    const [data, setData] = useState({
        id: 0,
        name: "",
        price: 0,
        description: "",
        picture: "",
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loggedUser = useSelector((store) => store.user);
    const handleLogRedux = (redux) => {
        // console.log("redux", redux);
        console.log("account", packages?.account.accountID);
    };

    const hanldeGetPackage = async (id = userName.id) => {
        const url = "http://birthdayblitzhub.online:8080/api/packages/" + id;
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
                    return res.json();
                    // setData(res.json());
                }
                // handle error
            })
            .then((data) => {
                // Do something with the list of tasks
                console.log("real data: ", data);
                setPackage(data);
                return data;
            })
            .catch((error) => {
                // handle error
            });
    };
    const hanldeGetServiceByPackageId = async (id = userName.id) => {
        const url = `http://birthdayblitzhub.online:8080/api/services/package/${id}`;
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
                console.log("real data sv by pkID: ", data);
                // setFeedback(data[0]);
                setServices(data);
                return data;
            })
            .catch((error) => {
                // handle error
            });
    };
    useEffect(() => {
        hanldeGetPackage();
        hanldeGetServiceByPackageId();
        handleLogRedux(loggedUser);
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
                        src={packages?.picture}
                        alt="Package Picture"
                        className="viewSerivceDetail__img"
                    />
                    <div className="content">
                        <h3 className="Name">
                            Package Name: {packages?.name}{" "}
                        </h3>
                        <Text type="success">
                            Package || <i class="fa-solid fa-star"> </i>{" "}
                            <i class="fa-solid fa-star"> </i>{" "}
                            <i class="fa-solid fa-star"> </i>{" "}
                            <i class="fa-solid fa-star"> </i>{" "}
                            <i class="fa-solid fa-star"> </i>
                        </Text>
                        <br />
                        <div className="viewSerivceDetail__desc">
                            <h2 className="descrip">Description:</h2>
                            <ul className="descrip_cont">
                                <li>Provided by: {packages?.account.name}</li>
                                <li>Detail: {packages?.description}</li>
                                {packages?.maximumSlot && (
                                    <li>
                                        Maximum Slot:{packages?.maximumSlot}
                                    </li>
                                )}
                                {services?.length !== 0 && (
                                    <li className="summ">
                                        <details>
                                            <summary>
                                                Including services:
                                            </summary>
                                            <ul className="details">
                                                {services &&
                                                    services.map((item) =>
                                                        item?.serviceID ? (
                                                            <li
                                                                key={
                                                                    item?.serviceID
                                                                }
                                                            >
                                                                {item?.name}
                                                            </li>
                                                        ) : (
                                                            <p>None</p>
                                                        )
                                                    )}
                                            </ul>
                                        </details>
                                    </li>
                                )}
                            </ul>
                            <p className="price">{packages?.price} VNĐ</p>
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
                                <button className="btn viewSerivceDetail__btn">
                                    <Link
                                        onClick={() => {
                                            dispatch(updatePackage(packages));
                                            navigate(
                                                `/booking/${packages?.account.accountID}`
                                            );
                                        }}
                                        className="buyNow"
                                    >
                                        Buy Now
                                    </Link>
                                </button>

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
