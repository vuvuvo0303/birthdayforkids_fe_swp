import React from "react";
import { HeaderLogin } from "../../component/HeaderLogin";
import { Sidebar } from "../../component/Sidebar";
export const YourProfile = () => {
    return (
        <div>
            <HeaderLogin />
            <div className="container container-profile">
                <section class="user-profile">
                    <h1 class="heading">your profile</h1>

                    <div class="info">
                        <div class="user">
                            <img src="img/pic-1.jpg" alt="" />
                            <h3>shaikh anas</h3>
                            <p>student</p>
                            <a href="/dashboard/party-host/" class="btn">
                                update profile
                            </a>
                        </div>

                        <div class="box-container">
                            <div class="box-profile">
                                <div class="flex">
                                    <i class="fas fa-bookmark"></i>
                                    <div>
                                        <span>4</span>
                                        <p>saved package</p>
                                    </div>
                                </div>
                                <a href="#" class="btn">
                                    view packages
                                </a>
                            </div>

                            <div class="box-profile">
                                <div class="flex">
                                    <i class="fas fa-bookmark"></i>
                                    <div>
                                        <span>4</span>
                                        <p>saved service</p>
                                    </div>
                                </div>
                                <a href="#" class="btn">
                                    view services
                                </a>
                            </div>

                            <div class="box-profile">
                                <div class="flex">
                                    <i class="fas fa-comment"></i>
                                    <div>
                                        <span>12</span>
                                        <p>videos comments</p>
                                    </div>
                                </div>
                                <a href="#" class="btn">
                                    view comments
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Sidebar />
        </div>
    );
};
