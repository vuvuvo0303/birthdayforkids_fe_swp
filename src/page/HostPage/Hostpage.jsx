import React from "react";
import { Header } from "../../component/Header";
import { Footer } from "../../component/Footer";
import { useState, useEffect } from "react";
import "./index.css";
import axios from "axios";
import { Link } from "react-router-dom";

export const Hostpage = () => {
    const [members, setMembers] = useState([]);

    useEffect(() => {
        
        axios
            .get("http://birthdayblitzhub.online:8080/auth/getAllHost")
            .then((response) => {
                setMembers(response.data); 
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    const [selectedHost, setSelectedHost] = useState(null);
    // Hàm này được gọi khi người dùng nhấp vào avatar
    const handleAvatarClick = (host) => {
        setSelectedHost(host);
    };

    return (
        <div>
            <Header />

            <div class="member" id="member1">
                <div class="container">
                    <header class="member__header">
                        <h2 class="section-heading host-heading">
                            Our virtual Hosts
                        </h2>
                    </header>

                    <div className="member__list">
                        {members.map((member) => (
                            <article
                                key={member.accountID}
                                className="member__item"
                            >
                                {/* Sử dụng Link để điều hướng đến trang AboutNoLogin với thông tin host */}
                                <Link
                                    to={{
                                        pathname: "/host/" + member.accountID,
                                        state: { selectedHost: member },
                                    }}
                                >
                                    <div className="member-item__img-bg">
                                        <img
                                            src={member.avatar}
                                            alt={member.name}
                                            className="member-item__thumb"
                                            onClick={() =>
                                                handleAvatarClick(member)
                                            }
                                        />
                                    </div>
                                </Link>
                                <h3 className="member-item__name">
                                    {member.name}
                                </h3>
                                <p className="member-item__desc">
                                    {member.email}
                                </p>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};
