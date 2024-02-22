import React from "react";
import "./index.css";
import { Helmet } from "react-helmet";

export const Header = () => {
    return (
        <div>
            <header className="header">
                <div class="container">
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
                                    <a href="#!" class="navbar__link">
                                        Service
                                    </a>
                                </li>
                                <li class="navbar__item">
                                    <a href="#!" class="navbar__link">
                                        About
                                    </a>
                                </li>
                                <li class="navbar__item">
                                    <a href="#!" class="navbar__link">
                                        Host
                                    </a>
                                </li>
                            </ul>
                        </nav>

                        {/* <!-- Action --> */}
                        <div class="action">
                            <a
                                href="http://localhost:5174/login"
                                class="action__login"
                            >
                                Login
                            </a>

                            <a
                                href="http://localhost:5174/register"
                                class="btn action__signup"
                            >
                                <p>Sign up</p>
                            </a>
                        </div>
                    </div>

                    {/* <!-- Hero --> */}
                    <section class="hero">
                        {/* <!-- Hero content --> */}
                        <section class="hero__content">
                            <h1 class="hero__heading">
                                The world's leading party booking service.
                            </h1>
                            <p class="hero__desc">
                                Unleash the magic of birthdays with our seamless
                                planning tools, exclusive themes, and top-tier
                                vendors. Join our community, turning moments
                                into memories that last a lifetime! 🎈🎁
                            </p>
                            <div class="hero__row">
                                <a href="#!" class="btn">
                                    Book Online
                                </a>
                                <span class="hero__phone">
                                    or call (123) 456-7890
                                </span>
                            </div>
                        </section>

                        {/* <!-- Hero media --> */}
                        <div class="hero__media">
                            <figure class="hero__images">
                                <img
                                    src="/img/hero-3.jpg"
                                    alt=""
                                    class="hero__img"
                                />
                                <img
                                    src="/img/hero-6.jpg"
                                    alt=""
                                    class="hero__img"
                                />
                            </figure>
                        </div>
                    </section>
                </div>
            </header>
        </div>
    );
};
