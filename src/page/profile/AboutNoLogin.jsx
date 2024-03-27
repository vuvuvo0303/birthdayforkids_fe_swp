import React, { useEffect, useState } from "react";
import "./index.css";
import { Header } from "../../component/Header";
import { HeaderLogin } from "../../component/HeaderLogin";
import { HeaderLoginOfHost } from "../../page/profile/HeaderLoginOfHost";
import { SidebarNoLogin } from "./SidebarNoLogin";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
import { Rate } from "antd";
import { useSelector } from "react-redux";
export const AboutNoLogin = () => {
    const { id } = useParams();
    const params = useParams();
    const [feedbacks, setFeedbacks] = useState([]);
    const loggedUser = useSelector((store) => store.user);
    const fetchFeedBack = async () => {
        const response = await axios.get(
            `http://birthdayblitzhub.online:8080/api/feedbacks/host/${params.id}`
        );
        setFeedbacks(response.data);
    };
    useEffect(() => {
        fetchFeedBack();
    }, []);

    return (
        <div>
            {!loggedUser?.role && <Header />}
            {loggedUser?.role === "Guest" && <HeaderLogin />}
            {loggedUser?.role === "Host" && <HeaderLoginOfHost />}
            <div className="container container-profile">
                <section className="reviews">
                    <div className="heading__feedback">Customer's reviews</div>

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
            <SidebarNoLogin id={id} />
        </div>
    );
};

export default AboutNoLogin;
