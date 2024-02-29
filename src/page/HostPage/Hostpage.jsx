import React from "react";
import { Header } from "../../component/Header";
import { Footer } from "../../component/Footer";
import { useState, useEffect } from "react";
import "./index.css";
import axios from "axios";

export const Hostpage = () => {
    const [members, setMembers] = useState([]);

    useEffect(() => {
        // Gọi API để lấy danh sách thành viên
        axios
            .get("http://birthdayblitzhub.online:8080/auth/getAllHost")
            .then((response) => {
                setMembers(response.data); // Cập nhật state với dữ liệu từ API
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

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
                            <article key={member.id} className="member__item">
                                <div className="member-item__img-bg">
                                    <img
                                        src={member.avatar}
                                        alt={member.name}
                                        className="member-item__thumb"
                                    />
                                </div>
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
