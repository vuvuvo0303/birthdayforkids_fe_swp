import React from "react";
import "./home.css";
import { useState, useEffect } from "react";
import { Button, Popover } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";

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
    const [open, setOpen] = useState(false);
    const hide = () => {
        setOpen(false);
    };
    const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
    };

    return (
        <div>
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
                                {/* <li className="navbar__item">
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
                                </li> */}
                                <li className="navbar__item">
                                    <a
                                        href="/ViewListService"
                                        className="navbar__link"
                                    >
                                        Service
                                    </a>
                                </li>
                               
                                <li className="navbar__item">
                                    <a href="/" className="navbar__link">
                                        About
                                    </a>
                                </li>
                                <li className="navbar__item">
                                    <a href="/hostpage" className="navbar__link">
                                        Host
                                    </a>
                                </li>
                            </ul>
                        </nav>

                        {/* <!-- Action --> */}
                        <div className="action">
                            <a href="/login" className="action__login">
                                Login
                            </a>

                            <a href="/register" className="btn action__signup">
                                <p>Sign up</p>
                            </a>
                        </div>
                        {/* <Popover
                            content={<a onClick={hide}>Close</a>}
                            title="Cart"
                            trigger="click"
                            open={open}
                            onOpenChange={handleOpenChange}
                        >
                            <Button icon={<ShoppingCartOutlined />}></Button>
                        </Popover> */}
                    </div>
                </div>
            </header>
        </div>
    );
};
