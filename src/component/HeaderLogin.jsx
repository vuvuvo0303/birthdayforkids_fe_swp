import React from "react";
import "./home.css";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Button, Drawer, Popover } from "antd";
import { WalletOutlined } from "@ant-design/icons";

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

  const handleLogout = () => {
    setLogoutClicked(true);
  };

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
  return (
    <div>
      <Helmet>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css" />
      </Helmet>

      {/* Remove the Helmet component */}
      <header className={`fixed-header ${isSticky ? "sticky" : ""}`}>
        {/* The rest of your header code remains unchanged */}
        <div className="container">
          {/* <!-- Header top --> */}
          <div className="header-top">
            <a href="/">
              <div className="logo">
                <img src="/img/Logo.svg" alt="Logo" className="logo__brand" />
              </div>
            </a>

            {/* <!-- Navbar --> */}
            <nav className="navbar">
              <ul className="navbar__list">
                <li className="navbar__item">
                  <div className="box">
                    <input type="text" placeholder="Search..." />
                    <a href="#!">
                      <button href="#!" className="btn action__search">
                        Search
                      </button>
                    </a>
                  </div>
                </li>
                <li className="navbar__item">
                  <a href="#service1" className="navbar__link">
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

            <Button type="primary" onClick={showDrawer}>
              <i class="fa-solid fa-user-tie"></i>
            </Button>
            <Drawer title="Profile" onClose={onClose} open={open} className="drawerBody" placement="left">
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
                  <i class="fa-solid fa-clock-rotate-left"></i>
                  <span>Order history</span>
                </a>
              </nav>

              {/* Logout Button */}
              <Button
                type="default"
                onClick={handleLogout}
                className="logout-button"
                style={{
                  position: "fixed",
                  bottom: 10,
                  left: 274,
                }}
              >
                <i class="fa-solid fa-right-from-bracket"></i>
                Logout
              </Button>
            </Drawer>
            <Popover
              content={
                <div>
                  <p style={{ color: "#07221C" }}>
                    <strong>Wallet balance: 1.000.000.000 VND</strong>
                  </p>
                  <a onClick={hide} style={{ color: "red" }}>
                    close
                  </a>
                </div>
              }
              title={<span style={{ color: "gray" }}>My Wallet</span>}
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
