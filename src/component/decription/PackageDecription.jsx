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
import { Rate, Space, Typography } from "antd";

export default function PackageDecription() {
    const [packages, setPackage] = useState(null);
    const [services, setServices] = useState(null);
    const userName = useParams();
    const { Text, Link } = Typography;
    // const params = useParams();
    const [feedbacks, setFeedbacks] = useState([]);
    const [rates, setRates] = useState();
    const fetchFeedBack = async (id = userName.id) => {
        const response = await axios.get(
            "http://birthdayblitzhub.online:8080/api/feedbacks/package/" + id
        );
        setFeedbacks(response.data);
        console.log("fetchFeedBack", response.data);
    };

    useEffect(() => {
        fetchFeedBack();
    }, []);

    const fetchRate = async (id = userName.id) => {
        const response = await axios.get(
            "http://birthdayblitzhub.online:8080/api/feedbacks/packageAverageRating/" +
            id
        );
        setRates(response.data.rating);
        console.log("fetchRate", response.data.rating);
    };
    useEffect(() => {
        fetchRate();
        // console.log("feedbacks", feedbacks[0]);
    }, []);

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

                        <div className="rating__package">
                            <div className="rating"> Package ||</div>{" "}
                            <Rate disabled value={rates} />
                        </div>

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
                            <p className="price">
                                {new Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                }).format(packages?.price)}
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
                                {loggedUser?.role === "Guest" &&
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
                                    </button>}

                                {!loggedUser?.role &&
                                    <button className="btn viewSerivceDetail__btn">
                                        <a href="/login" className="buyNow">
                                            Buy Now
                                        </a>
                                        {/* <Link
                                            to={`/login`}
                                            className="buyNow"
                                        >
                                            Buy Now
                                        </Link> */}
                                    </button>
                                }


                                <button className="btn viewSerivceDetail__btn">
                                    <a href="/ViewListService">Cancel</a>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="reviews">
                    <div className="heading__feedback feedback-packageDetail">Customer's reviews</div>

                    <div className="box-container">
                        {feedbacks.map((feedbackItem, index) => (
                            <div className="box-comment" key={index}>
                                <div className="student">
                                    <img
                                        src={feedbackItem.guest.avatar}
                                        alt={feedbackItem.guest.name}
                                    />
                                    <div>
                                        <h3>{feedbackItem.guest.name}</h3>
                                        <Rate
                                            disabled
                                            defaultValue={feedbackItem.rating}
                                        />
                                    </div>
                                </div>
                                <div className="feedback__host">
                                    {feedbackItem.feedbackDate} ||{" "}
                                    {feedbackItem.apackage.name}{" "}
                                </div>

                                <div className="feedback__desc">
                                    {feedbackItem.description}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
}
