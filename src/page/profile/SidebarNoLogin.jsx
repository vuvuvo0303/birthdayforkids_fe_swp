import React, { useEffect, useState } from "react";
import "./index.css";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import api from "../../config/axios";
import { Link } from "react-router-dom";

export const SidebarNoLogin = ({ id }) => {
    console.log(id);
    const params = useParams();
    const [profile, setProfile] = useState();

    const fetchProfile = async () => {
        const response = await api.get(`/auth/getUser/${params.id}`);
        setProfile(response.data);
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    return (
        <div>
            <Helmet>
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css"
                />
            </Helmet>
            <div className="side-bar">
                <div className="avatar">
                    {/* Hiển thị thông tin của host đã chọn */}
                    {profile && (
                        <>
                            <img
                                src={profile.avatar}
                                className="image"
                                alt={profile.name}
                            />
                            <h3 className="name">{profile.name}</h3>
                            <p className="role">{profile.email}</p>
                            {/* ... Các thông tin khác của host ... */}
                        </>
                    )}
                </div>

                <nav className="navbar">
                    <Link to={`/host/${id}`}>
                        <i className="fa-solid fa-comment"></i>
                        <span>Feedback</span>
                    </Link>
                    <Link to={`/packageNoLogin/${id}`}>
                        <i className="fa-solid fa-boxes-stacked"></i>
                        <span>Packages</span>
                    </Link>
                    <Link to={`/serviceNoLogin/${id}`}>
                        <i className="fa-solid fa-box"></i>
                        <span>Services</span>
                    </Link>
                </nav>
            </div>
        </div>
    );
};
