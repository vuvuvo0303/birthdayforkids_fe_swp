import React from "react";
import { Header } from "../../component/Header";
import { SidebarNoLogin } from "../profile/SidebarNoLogin";
export const ServiceNoLogin = () => {
    return (
        <div>
            <Header />
            <div className="container container-profile">
                <section class="services">
                    <h1 class="heading">Our Service</h1>

                    <div class="box-container">
                        <div class="box-package">
                            <div class="tutor">
                                <img src="img/pic-2.jpg" />
                                <div class="info">
                                    <h3>john deo</h3>
                                    <span>21-10-2022</span>
                                </div>
                            </div>
                            <div class="thumb">
                                <img src="img/package.jpg" />
                            </div>
                            <h3 class="title"> Vippro </h3>
                            <a href="playlist.html" class="btn">
                                view detail
                            </a>
                        </div>

                        <div class="box-package">
                            <div class="tutor">
                                <img src="img/pic-3.jpg" />
                                <div class="info">
                                    <h3>john deo</h3>
                                    <span>21-10-2022</span>
                                </div>
                            </div>
                            <div class="thumb">
                                <img src="img/package.jpg" />
                            </div>
                            <h3 class="title"> Vippro </h3>
                            <a href="playlist.html" class="btn">
                                view detail
                            </a>
                        </div>

                        <div class="box-package">
                            <div class="tutor">
                                <img src="img/pic-4.jpg" />
                                <div class="info">
                                    <h3>john deo</h3>
                                    <span>21-10-2022</span>
                                </div>
                            </div>
                            <div class="thumb">
                                <img src="img/package.jpg" />
                            </div>
                            <h3 class="title"> Vippro </h3>
                            <a href="playlist.html" class="btn">
                                view detail
                            </a>
                        </div>

                        <div class="box-package">
                            <div class="tutor">
                                <img src="img/pic-8.jpg" />
                                <div class="info">
                                    <h3>john deo</h3>
                                    <span>21-10-2022</span>
                                </div>
                            </div>
                            <div class="thumb">
                                <img src="img/package.jpg" />
                            </div>
                            <h3 class="title"> Vippro </h3>
                            <a href="playlist.html" class="btn">
                                view detail
                            </a>
                        </div>

                        <div class="box-package">
                            <div class="tutor">
                                <img src="img/pic-9.jpg" />
                                <div class="info">
                                    <h3>john deo</h3>
                                    <span>21-10-2022</span>
                                </div>
                            </div>
                            <div class="thumb">
                                <img src="img/package.jpg" />
                            </div>
                            <h3 class="title"> Vippro </h3>
                            <a href="playlist.html" class="btn">
                                view detail
                            </a>
                        </div>

                        <div class="box-package">
                            <div class="tutor">
                                <img src="img/pic-1.jpg" />
                                <div class="info">
                                    <h3>john deo</h3>
                                    <span>21-10-2022</span>
                                </div>
                            </div>
                            <div class="thumb">
                                <img src="img/package.jpg" />
                            </div>
                            <h3 class="title"> Vippro </h3>
                            <a href="playlist.html" class="btn">
                                view detail
                            </a>
                        </div>
                    </div>
                </section>
            </div>
            <SidebarNoLogin />
        </div>
    );
};
