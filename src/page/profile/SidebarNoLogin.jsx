import React, { useEffect, useState } from "react";
import "./index.css";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import api from "../../config/axios";
import { Link } from "react-router-dom";

export const SidebarNoLogin = ({id}) => {
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
                            <p className="role">{profile.role}</p>
                            {/* ... Các thông tin khác của host ... */}
                        </>
                    )}
                    <a href="/HostProfile" className="btn btn-sidebar">
                        View Profile
                    </a>
                </div>

                <nav className="navbar">
                    <a href={`/host/${id}`}>
                        <i className="fas fa-question"></i>
                        <span>About</span>
                    </a>
                    <a href={`/packageNoLogin/${id}`}>
                        <i className="fas fa-graduation-cap"></i>
                        <span>Packages</span>
                    </a>
                    <a href={`/serviceNoLogin/${id}`}>
                        <i className="fas fa-chalkboard-user"></i>
                        <span>Services</span>
                    </a>
                </nav>
            </div>
        </div>
    );
};
