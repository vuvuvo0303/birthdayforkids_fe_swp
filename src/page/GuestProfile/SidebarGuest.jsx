import React from "react";
import { Helmet } from "react-helmet";
export const SidebarGuest = () => {
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
                    <a href="/GuestProfile" className="btn btn-sidebar">
                        View Profile
                    </a>
                </div>

                <nav className="navbar">
                    <a href="/guestDetail">
                        <i className="fas fa-question"></i>
                        <span>Order history</span>
                    </a>
                </nav>
            </div>
        </div>
    );
};
