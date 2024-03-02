import React from "react";
import "./index.css";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

export const SidebarNoLogin = () => {
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
                    <img src="img/pic-1.jpg" className="image" alt="" />
                    <h3 className="name">shaikh anas</h3>
                    <p className="role">student</p>
                    <a href="/HostProfile" className="btn btn-sidebar">
                        View Profile
                    </a>
                </div>

                <nav className="navbar">
                    <a href="/aboutNoLogin">
                        <i className="fas fa-question"></i>
                        <span>About</span>
                    </a>
                    <a href="#!">
                        <i className="fas fa-graduation-cap"></i>
                        <span>Packages</span>
                    </a>
                    <a href="#!">
                        <i className="fas fa-chalkboard-user"></i>
                        <span>Services</span>
                    </a>
                </nav>
            </div>
        </div>
    );
};
