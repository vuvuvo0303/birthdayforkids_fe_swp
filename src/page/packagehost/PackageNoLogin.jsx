import React from "react";
import { Header } from "../../component/Header";
import { SidebarNoLogin } from "../profile/SidebarNoLogin";
import { useParams } from "react-router";
export const PackageNoLogin = () => {
    const { id } = useParams();
    return (
        <div>
            <Header />
            <div className="container container-profile">
                <section class="packages">
                    <h1 class="heading">Our packages</h1>

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
                                <img src="img/pic-5.jpg" />
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
                                <img src="img/pic-6.jpg" />
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
                                <img src="img/pic-7.jpg" />
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
            <SidebarNoLogin id={id} />
        </div>
    );
};
