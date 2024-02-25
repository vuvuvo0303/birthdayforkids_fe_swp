import React from "react";
import "./index.css";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

export const HeaderLogin = () => {
    const [isSticky, setSticky] = useState(false);
    const [isProfileActive, setProfileActive] = useState(false);
    const [isSearchActive, setSearchActive] = useState(false);
    const [isMenuActive, setMenuActive] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            setSticky(offset > 50);

            // Thực hiện các thay đổi trạng thái ở đây
            setProfileActive(false);
            setSearchActive(false);
        };

        window.addEventListener("scroll", handleScroll);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleProfileClick = () => {
        setProfileActive(!isProfileActive);
        setSearchActive(false);
    };

    const handleMenuClick = () => {
        setMenuActive(!isMenuActive);
    };

    return (
        <div>
            <Helmet>
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css"
                />
            </Helmet>

            {/* Remove the Helmet component */}
            <header className={`fixed-header ${isSticky ? "sticky" : ""}`}>
                {/* The rest of your header code remains unchanged */}
                <div className="container">
                    {/* <!-- Header top --> */}
                    <div className="header-top">
                        <a href="/">
                            <div className="logo">
                                <img
                                    src="/img/Logo.svg"
                                    alt="Logo"
                                    className="logo__brand"
                                />
                            </div>
                        </a>

                        {/* <!-- Navbar --> */}
                        <nav className="navbar">
                            <ul className="navbar__list">
                                <li className="navbar__item">
                                    <div className="box">
                                        <input
                                            type="text"
                                            placeholder="Search..."
                                        />
                                        <a href="#!">
                                            <button
                                                href="#!"
                                                className="btn action__search"
                                            >
                                                Search
                                            </button>
                                        </a>
                                    </div>
                                </li>
                                <li className="navbar__item">
                                    <a
                                        href="#service1"
                                        className="navbar__link"
                                    >
                                        Service
                                    </a>
                                </li>
                                <li className="navbar__item">
                                    <a href="#work1" className="navbar__link">
                                        Work
                                    </a>
                                </li>
                                <li className="navbar__item">
                                    <a href="#about1" className="navbar__link">
                                        About
                                    </a>
                                </li>
                                <li className="navbar__item">
                                    <a href="#member1" className="navbar__link">
                                        Host
                                    </a>
                                </li>
                            </ul>
                        </nav>

                        {/* <!-- Icon --> */}
                        <div className="icons">
                            {/* <div
                                id="menu-btn"
                                className={`fas fa-bars ${
                                    isMenuActive ? "active" : ""
                                }`}
                                onClick={handleMenuClick}
                            ></div> */}
                            <div
                                id="user-btn"
                                className="fas fa-user"
                                onClick={handleProfileClick}
                            ></div>
                        </div>
                        {/* Profile */}
                        <div
                            className={`profile ${
                                isProfileActive ? "active" : ""
                            }`}
                        >
                            <img src="img/pic-1.jpg" className="image" alt="" />
                            <h3 className="name">Trinh Huy</h3>
                            <p className="role">host</p>
                            <a href="profile.html" className="btn">
                                View Profile
                            </a>
                            <div class="flex-btn">
                                <a href="#!" class="option-btn">
                                    Sign out
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
};
