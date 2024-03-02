import React from "react";
import "./index.css";
import { Header } from "../../component/Header";
import { SidebarNoLogin } from "./SidebarNoLogin";
import { useParams } from "react-router";
export const AboutNoLogin = () => {
    const { id } = useParams();
    console.log(id);
    return (
        <div>
            <Header />
            <div className="container container-profile">
                <section class="about">
                    <div class="row">
                        <div class="image">
                            <img src="img/about-img.svg" alt="" />
                        </div>

                        <div class="content">
                            <h3>why choose us?</h3>
                            <p>
                                Lorem ipsum dolor sit amet consectetur,
                                adipisicing elit. Ut dolorum quasi illo?
                                Distinctio expedita commodi, nemo a quam error
                                repellendus sint, fugiat quis numquam eum
                                eveniet sequi aspernatur quaerat tenetur.
                            </p>
                            <a href="#!" class="inline-btn btn">
                                Our Service
                            </a>
                        </div>
                    </div>
                </section>
                <section class="reviews">
                    <h1 class="heading">Customer's reviews</h1>

                    <div class="box-container">
                        <div class="box-comment">
                            <p>
                                Lorem ipsum dolor sit amet consectetur,
                                adipisicing elit. Necessitatibus, suscipit a.
                                Quibusdam, dignissimos consectetur. Sed ullam
                                iusto eveniet qui aut quibusdam vero voluptate
                                libero facilis fuga. Eligendi eaque molestiae
                                modi?
                            </p>
                            <div class="student">
                                <img src="img/pic-2.jpg" alt="" />
                                <div>
                                    <h3>john deo</h3>
                                    <div class="stars">
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star-half-alt"></i>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="box-comment">
                            <p>
                                Lorem ipsum dolor sit amet consectetur,
                                adipisicing elit. Necessitatibus, suscipit a.
                                Quibusdam, dignissimos consectetur. Sed ullam
                                iusto eveniet qui aut quibusdam vero voluptate
                                libero facilis fuga. Eligendi eaque molestiae
                                modi?
                            </p>
                            <div class="student">
                                <img src="img/pic-3.jpg" alt="" />
                                <div>
                                    <h3>john deo</h3>
                                    <div class="stars">
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star-half-alt"></i>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="box-comment">
                            <p>
                                Lorem ipsum dolor sit amet consectetur,
                                adipisicing elit. Necessitatibus, suscipit a.
                                Quibusdam, dignissimos consectetur. Sed ullam
                                iusto eveniet qui aut quibusdam vero voluptate
                                libero facilis fuga. Eligendi eaque molestiae
                                modi?
                            </p>
                            <div class="student">
                                <img src="img/pic-4.jpg" alt="" />
                                <div>
                                    <h3>john deo</h3>
                                    <div class="stars">
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star-half-alt"></i>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="box-comment">
                            <p>
                                Lorem ipsum dolor sit amet consectetur,
                                adipisicing elit. Necessitatibus, suscipit a.
                                Quibusdam, dignissimos consectetur. Sed ullam
                                iusto eveniet qui aut quibusdam vero voluptate
                                libero facilis fuga. Eligendi eaque molestiae
                                modi?
                            </p>
                            <div class="student">
                                <img src="img/pic-5.jpg" alt="" />
                                <div>
                                    <h3>john deo</h3>
                                    <div class="stars">
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star-half-alt"></i>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="box-comment">
                            <p>
                                Lorem ipsum dolor sit amet consectetur,
                                adipisicing elit. Necessitatibus, suscipit a.
                                Quibusdam, dignissimos consectetur. Sed ullam
                                iusto eveniet qui aut quibusdam vero voluptate
                                libero facilis fuga. Eligendi eaque molestiae
                                modi?
                            </p>
                            <div class="student">
                                <img src="img/pic-6.jpg" alt="" />
                                <div>
                                    <h3>john deo</h3>
                                    <div class="stars">
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star-half-alt"></i>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="box-comment">
                            <p>
                                Lorem ipsum dolor sit amet consectetur,
                                adipisicing elit. Necessitatibus, suscipit a.
                                Quibusdam, dignissimos consectetur. Sed ullam
                                iusto eveniet qui aut quibusdam vero voluptate
                                libero facilis fuga. Eligendi eaque molestiae
                                modi?
                            </p>
                            <div class="student">
                                <img src="img/pic-7.jpg" alt="" />
                                <div>
                                    <h3>john deo</h3>
                                    <div class="stars">
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star-half-alt"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <SidebarNoLogin id={id} />
        </div>
    );
};

export default AboutNoLogin;
