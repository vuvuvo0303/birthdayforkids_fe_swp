import React from "react";
import "./home.css";
export const Footer = () => {
    return (
        <div>
            <footer className="footer">
                <div class="content">
                    <div class="row row-top">
                        {/* <!-- Introduction column --> */}
                        <div class="column">
                            <h3 class="heading">Introduction</h3>
                            <ul class="list">
                                <li class="item">
                                    <p>Why do you use my service</p>
                                </li>
                            </ul>
                        </div>
                        {/* <!-- Resources column --> */}
                        <div class="column">
                            <h3 class="heading">Address</h3>
                            <ul class="list">
                                <li class="item">
                                    <p>Location: FPT University</p>
                                </li>
                                <li class="item">
                                    <p>Email: birthdayblitzhub@gmail.com</p>
                                </li>
                                <li class="item">
                                    <p>Phone: 0948476369</p>
                                </li>
                            </ul>
                        </div>

                        {/* <!-- Get in touch column --> */}
                        <div class="column">
                            <h3 class="heading">Get in touch</h3>
                            <p class="desc">
                                You’ll find your next home, in any style you
                                prefer.
                            </p>
                            <div class="social">
                                <a
                                    href="https://www.facebook.com/profile.php?id=100034841200104"
                                    class="social-link"
                                >
                                    <img src="/img/facebook-icon.svg" alt="" />
                                </a>
                                <a href="" class="social-link">
                                    <img src="/img/twitter-icon.svg" alt="" />
                                </a>
                            </div>
                        </div>
                    </div>

                    <div class="row row-bottom">
                        <p class="copyright">
                            *Website of birthdayblitzhub company*
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};
