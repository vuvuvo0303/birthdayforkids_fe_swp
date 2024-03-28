import React from "react";
import "./home.css";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Button, Drawer, Popover } from "antd";
import { WalletOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/features/userSlice";

export const HeaderLogin = () => {
    const [isSticky, setSticky] = useState(false);
    const [isProfileActive, setProfileActive] = useState(false);
    const [isSearchActive, setSearchActive] = useState(false);
    const [isMenuActive, setMenuActive] = useState(false);
    const [users, setUsers] = useState([]);
    const [wallet, setWallet] = useState([]);
    const loggedUser = useSelector((store) => store.user);
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/");
        }
    }, [user]);

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

    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    const [openWallet, setOpenWallet] = useState(false);
    const hide = () => {
        setOpenWallet(false);
    };
    const handleOpenChange = (openWallet) => {
        setOpenWallet(openWallet);
    };

    const fetchData = async (id) => {
        try {
            const response = await fetch(
                `http://birthdayblitzhub.online:8080/auth/getUser/${id}`
            );
            const data = await response.json();
            console.log(data);
            setUsers(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    const fetchWallet = async (id) => {
        try {
            const response = await fetch(
                `http://birthdayblitzhub.online:8080/api/wallets/${id}`
            );
            const data = await response.json();
            console.log("fetchWallet", data);
            setWallet(data);
        } catch (error) {
            console.error("Error fetching data Wallet:", error);
        }
    };

    useEffect(() => {
        fetchData(loggedUser.accountID);
        fetchWallet(loggedUser.accountID);
    }, []);

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

                        <Button type="primary" onClick={showDrawer}>
                            <i className="fa-solid fa-user-tie"></i>
                        </Button>
                        <Drawer
                            title="Profile"
                            onClose={onClose}
                            open={open}
                            className="drawerBody"
                            placement="left"
                        >
                            <div className="avatar">
                                <img
                                    src={`${users.avatar}`}
                                    className="image"
                                    alt=""
                                />
                                <h3 className="name">{users.name}</h3>
                                <p className="role">{users.email}</p>
                                <Link
                                    to={`/GuestProfile/${users.accountID}`}
                                    className="btn btn-sidebar"
                                >
                                    View Profile
                                </Link>
                            </div>

                            <nav className="navbar">
                                <a href="/guestDetail">
                                    <i className="fa-solid fa-clock-rotate-left"></i>
                                    <span>Order history</span>
                                </a>
                            </nav>

                            {/* Logout Button */}
                            <Button
                                type="default"
                                onClick={() => {
                                    dispatch(logout());
                                }}
                                className="logout-button"
                                style={{
                                    position: "fixed",
                                    bottom: 10,
                                    left: 274,
                                }}
                            >
                                <i className="fa-solid fa-right-from-bracket"></i>
                                Logout
                            </Button>
                        </Drawer>
                        <Popover
                            content={
                                <div>
                                    <p style={{ color: "#07221C" }}>
                                        <strong>
                                            Wallet balance:
                                            {/* {wallet?.totalMoney} */}
                                            {new Intl.NumberFormat(
                                                "vi-VN",
                                                {
                                                    style: "currency",
                                                    currency: "VND",
                                                }
                                            ).format(wallet?.totalMoney)}
                                        </strong>
                                    </p>
                                    <a href="/Wallet">View wallet's balance</a> <br />
                                    <a onClick={hide} style={{ color: "red" }}>
                                        close
                                    </a>
                                </div>
                            }
                            title={
                                <span style={{ color: "gray" }}>My Wallet</span>
                            }
                            trigger="click"
                            open={openWallet}
                            onOpenChange={handleOpenChange}
                        >
                            <Button icon={<WalletOutlined />}></Button>
                        </Popover>
                    </div>
                </div>
            </header>
        </div>
    );
};
