import React from "react";
import "./index.css";
import { useState, useEffect } from "react";

export const Header = () => {
    const [isSticky, setSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            setSticky(offset > 50);
        };

        window.addEventListener("scroll", handleScroll);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div>
            {/* Remove the Helmet component */}
            <header className={`fixed-header ${isSticky ? "sticky" : ""}`}>
                {/* The rest of your header code remains unchanged */}
                <div className="container">
                    {/* <!-- Header top --> */}
                    <div class="header-top">
                        <a href="/">
                            <div class="logo">
                                <img
                                    src="/img/Logo.svg"
                                    alt="Logo"
                                    class="logo__brand"
                                />
                            </div>
                        </a>

                        {/* <!-- Navbar --> */}
                        <nav class="navbar">
                            <ul class="navbar__list">
                                <li class="navbar__item">
                                    <div class="box">
                                        <input
                                            type="text"
                                            placeholder="Search..."
                                        />
                                        <a href="#!">
                                            <button
                                                href="#!"
                                                class="btn action__search"
                                            >
                                                Search
                                            </button>
                                        </a>
                                    </div>
                                </li>
                                <li class="navbar__item">
                                    <a href="#service1" class="navbar__link">
                                        Service
                                    </a>
                                </li>
                                <li class="navbar__item">
                                    <a href="#work1" class="navbar__link">
                                        Work
                                    </a>
                                </li>
                                <li class="navbar__item">
                                    <a href="#about1" class="navbar__link">
                                        About
                                    </a>
                                </li>
                                <li class="navbar__item">
                                    <a href="#member1" class="navbar__link">
                                        Host
                                    </a>
                                </li>
                            </ul>
                        </nav>

                        {/* <!-- Action --> */}
                        <div class="action">
                            <a href="/login" class="action__login">
                                Login
                            </a>

                            <a href="/register" class="btn action__signup">
                                <p>Sign up</p>
                            </a>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
};
