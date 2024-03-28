import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Header } from "../../component/Header";
import "./index.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export const HomePage = () => {
    const [members, setMembers] = useState([]);
    useEffect(() => {
        axios
            .get("http://birthdayblitzhub.online:8080/auth/getAllHost")
            .then((response) => {
                if (Array.isArray(response.data)) {
                    // Trộn mảng để lấy ngẫu nhiên
                    const shuffledMembers = shuffleArray(response.data);
                    // Lấy 4 thành viên đầu tiên
                    const selectedMembers = shuffledMembers.slice(0, 4);
                    setMembers(selectedMembers);
                } else {
                    console.error("Invalid data format from API");
                }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return (
        <div>
            <header className="header">
                <div class="container">
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
                                <a href="/ViewListService" class="btn">
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
            <main>
                {/* Service */}
                <section class="service" id="service1">
                    <div class="container">
                        <h2 class="service__heading section-heading">
                            Our services
                        </h2>
                        <p class="service__desc section-desc">
                            Welcome to our virtual birthday party space! We
                            bring a unique birthday experience with:
                        </p>
                        <div class="service__row">
                            <figure class="service__images">
                                <img
                                    src="/img/services-3.jpg"
                                    alt=""
                                    class="service__img"
                                />
                            </figure>

                            <div>
                                <div class="service-list">
                                    {/* <!-- Service item 1 --> */}
                                    <section class="service-item">
                                        <div class="service-item__icon">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="44"
                                                height="44"
                                                viewBox="0 0 44 44"
                                                fill="none"
                                            >
                                                <path
                                                    fill-rule="evenodd"
                                                    clip-rule="evenodd"
                                                    d="M22 44C34.1503 44 44 34.1503 44 22C44 9.84974 34.1503 0 22 0C9.84974 0 0 9.84974 0 22C0 34.1503 9.84974 44 22 44ZM27.7215 16.8559C27.7973 17.5 27.8352 18.4094 27.0395 19.3188C26.2579 20.2492 25.4032 20.3388 24.6908 20.4135L24.6523 20.4176C24.1219 20.4555 23.8566 20.4934 23.5535 20.8344C23.3641 21.0617 23.0988 21.1375 22.8715 21.1375C22.682 21.1375 22.4547 21.0996 22.3031 20.948C21.9242 20.607 21.8863 20.0387 22.1895 19.6598C22.9852 18.7125 23.8945 18.6367 24.5387 18.5988C24.59 18.592 24.6389 18.5858 24.6856 18.5798C25.1553 18.52 25.3997 18.4888 25.6754 18.1441C25.9785 17.8031 25.9785 17.5379 25.9406 16.9695C25.8648 16.3254 25.827 15.416 26.6227 14.5066C27.3999 13.5814 28.2494 13.4876 28.9241 13.4131L28.9719 13.4078C29.5402 13.3699 29.7676 13.332 30.0707 12.991C30.4117 12.6121 30.9801 12.5742 31.359 12.8773C31.7379 13.2184 31.7758 13.7867 31.4727 14.1656C30.677 15.1129 29.7676 15.1887 29.1234 15.2266C28.5551 15.3023 28.2898 15.3402 27.9867 15.6812C27.6836 16.0223 27.6836 16.2875 27.7215 16.8559ZM20.1813 13.5594C20.1813 13.0668 20.5223 12.65 21.0527 12.65C21.5832 12.65 21.9621 13.0668 21.9621 13.5594V13.9383C21.9621 15.7191 21.2043 17.3863 19.8402 18.523C19.6508 18.6746 19.4613 18.7125 19.2719 18.7125C19.0066 18.7125 18.7414 18.6367 18.552 18.4094C18.2488 18.0305 18.2867 17.4621 18.6656 17.1211C19.6129 16.3254 20.1813 15.1887 20.1813 13.9383V13.5594ZM13.5125 13.8625C13.5125 13.2184 14.043 12.6879 14.725 12.6879C15.3691 12.6879 15.9375 13.2184 15.8996 13.8625C15.8996 14.4688 15.3313 15.0371 14.725 15.0371C14.0809 15.0371 13.5125 14.5066 13.5125 13.8625ZM30.3738 22.35H30.7527C31.2832 22.35 31.6621 22.7668 31.6621 23.2594C31.6621 23.7898 31.2832 24.1688 30.7906 24.1688H30.4117C29.1613 24.1688 28.0246 24.7371 27.191 25.6844C27.0016 25.9117 26.7363 25.9875 26.509 25.9875C26.3195 25.9875 26.1301 25.9496 25.9406 25.798C25.5617 25.457 25.5238 24.8887 25.827 24.5098C26.9637 23.1457 28.6309 22.35 30.3738 22.35ZM29.275 18.7125C29.275 18.0684 29.7676 17.5 30.4496 17.5C31.1316 17.5 31.6621 18.0684 31.6242 18.7125C31.6242 19.3188 31.0938 19.8871 30.4496 19.8871C29.8055 19.8871 29.275 19.3566 29.275 18.7125ZM29.275 29.625C29.275 28.9809 29.7676 28.4125 30.4496 28.4125C31.1316 28.4125 31.6621 28.9809 31.6242 29.625C31.6242 30.2313 31.0938 30.7996 30.4496 30.7996C29.8055 30.7996 29.275 30.2691 29.275 29.625ZM12.641 31.709C12.3 31.3301 12.1863 30.8754 12.3758 30.4207L13.6262 27.0105L17.3395 30.7238L13.9293 31.9742C13.7777 32.05 13.6262 32.05 13.5125 32.05C13.1715 32.05 12.8684 31.9363 12.641 31.709ZM18.5898 30.2313L14.1188 25.7602L14.9523 23.4867L20.8633 29.3977L18.5898 30.2313ZM17.9836 20.3039L24.0461 26.3664C24.3492 26.6695 24.4629 27.0863 24.3871 27.4652C24.3113 27.882 24.0082 28.223 23.6293 28.3367L22.1137 28.9051L15.4449 22.2363L16.0133 20.7207C16.127 20.3418 16.468 20.0387 16.8848 19.9629C17.2637 19.8871 17.6805 20.0008 17.9836 20.3039Z"
                                                    fill="white"
                                                    fill-opacity="0.73"
                                                />
                                            </svg>
                                        </div>
                                        <div class="service-item__body">
                                            <h3 class="service-item__heading">
                                                Premier VIP Party Experience
                                            </h3>
                                            <div class="service-item__desc">
                                                Unmatched luxury: exclusive
                                                venues, curated themes, gourmet
                                                dining, top-tier entertainment.
                                            </div>
                                        </div>
                                    </section>

                                    {/* <!-- Service item 2 --> */}
                                    <section class="service-item">
                                        <div class="service-item__icon">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="44"
                                                height="44"
                                                viewBox="0 0 44 44"
                                                fill="none"
                                            >
                                                <path
                                                    fill-rule="evenodd"
                                                    clip-rule="evenodd"
                                                    d="M22 44C34.1503 44 44 34.1503 44 22C44 9.84974 34.1503 0 22 0C9.84974 0 0 9.84974 0 22C0 34.1503 9.84974 44 22 44ZM27.7215 16.8559C27.7973 17.5 27.8352 18.4094 27.0395 19.3188C26.2579 20.2492 25.4032 20.3388 24.6908 20.4135L24.6523 20.4176C24.1219 20.4555 23.8566 20.4934 23.5535 20.8344C23.3641 21.0617 23.0988 21.1375 22.8715 21.1375C22.682 21.1375 22.4547 21.0996 22.3031 20.948C21.9242 20.607 21.8863 20.0387 22.1895 19.6598C22.9852 18.7125 23.8945 18.6367 24.5387 18.5988C24.59 18.592 24.6389 18.5858 24.6856 18.5798C25.1553 18.52 25.3997 18.4888 25.6754 18.1441C25.9785 17.8031 25.9785 17.5379 25.9406 16.9695C25.8648 16.3254 25.827 15.416 26.6227 14.5066C27.3999 13.5814 28.2494 13.4876 28.9241 13.4131L28.9719 13.4078C29.5402 13.3699 29.7676 13.332 30.0707 12.991C30.4117 12.6121 30.9801 12.5742 31.359 12.8773C31.7379 13.2184 31.7758 13.7867 31.4727 14.1656C30.677 15.1129 29.7676 15.1887 29.1234 15.2266C28.5551 15.3023 28.2898 15.3402 27.9867 15.6812C27.6836 16.0223 27.6836 16.2875 27.7215 16.8559ZM20.1813 13.5594C20.1813 13.0668 20.5223 12.65 21.0527 12.65C21.5832 12.65 21.9621 13.0668 21.9621 13.5594V13.9383C21.9621 15.7191 21.2043 17.3863 19.8402 18.523C19.6508 18.6746 19.4613 18.7125 19.2719 18.7125C19.0066 18.7125 18.7414 18.6367 18.552 18.4094C18.2488 18.0305 18.2867 17.4621 18.6656 17.1211C19.6129 16.3254 20.1813 15.1887 20.1813 13.9383V13.5594ZM13.5125 13.8625C13.5125 13.2184 14.043 12.6879 14.725 12.6879C15.3691 12.6879 15.9375 13.2184 15.8996 13.8625C15.8996 14.4688 15.3313 15.0371 14.725 15.0371C14.0809 15.0371 13.5125 14.5066 13.5125 13.8625ZM30.3738 22.35H30.7527C31.2832 22.35 31.6621 22.7668 31.6621 23.2594C31.6621 23.7898 31.2832 24.1688 30.7906 24.1688H30.4117C29.1613 24.1688 28.0246 24.7371 27.191 25.6844C27.0016 25.9117 26.7363 25.9875 26.509 25.9875C26.3195 25.9875 26.1301 25.9496 25.9406 25.798C25.5617 25.457 25.5238 24.8887 25.827 24.5098C26.9637 23.1457 28.6309 22.35 30.3738 22.35ZM29.275 18.7125C29.275 18.0684 29.7676 17.5 30.4496 17.5C31.1316 17.5 31.6621 18.0684 31.6242 18.7125C31.6242 19.3188 31.0938 19.8871 30.4496 19.8871C29.8055 19.8871 29.275 19.3566 29.275 18.7125ZM29.275 29.625C29.275 28.9809 29.7676 28.4125 30.4496 28.4125C31.1316 28.4125 31.6621 28.9809 31.6242 29.625C31.6242 30.2313 31.0938 30.7996 30.4496 30.7996C29.8055 30.7996 29.275 30.2691 29.275 29.625ZM12.641 31.709C12.3 31.3301 12.1863 30.8754 12.3758 30.4207L13.6262 27.0105L17.3395 30.7238L13.9293 31.9742C13.7777 32.05 13.6262 32.05 13.5125 32.05C13.1715 32.05 12.8684 31.9363 12.641 31.709ZM18.5898 30.2313L14.1188 25.7602L14.9523 23.4867L20.8633 29.3977L18.5898 30.2313ZM17.9836 20.3039L24.0461 26.3664C24.3492 26.6695 24.4629 27.0863 24.3871 27.4652C24.3113 27.882 24.0082 28.223 23.6293 28.3367L22.1137 28.9051L15.4449 22.2363L16.0133 20.7207C16.127 20.3418 16.468 20.0387 16.8848 19.9629C17.2637 19.8871 17.6805 20.0008 17.9836 20.3039Z"
                                                    fill="white"
                                                    fill-opacity="0.73"
                                                />
                                            </svg>
                                        </div>
                                        <div class="service-item__body">
                                            <h3 class="service-item__heading">
                                                Elite Birthday Extravaganza
                                            </h3>
                                            <div class="service-item__desc">
                                                Opulent venues, bespoke themes,
                                                gourmet delights, exclusive
                                                entertainment, and sophisticated
                                                favors.
                                            </div>
                                        </div>
                                    </section>

                                    {/* <!-- Service item 3 --> */}
                                    <section class="service-item">
                                        <div class="service-item__icon">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="44"
                                                height="44"
                                                viewBox="0 0 44 44"
                                                fill="none"
                                            >
                                                <path
                                                    fill-rule="evenodd"
                                                    clip-rule="evenodd"
                                                    d="M22 44C34.1503 44 44 34.1503 44 22C44 9.84974 34.1503 0 22 0C9.84974 0 0 9.84974 0 22C0 34.1503 9.84974 44 22 44ZM27.7215 16.8559C27.7973 17.5 27.8352 18.4094 27.0395 19.3188C26.2579 20.2492 25.4032 20.3388 24.6908 20.4135L24.6523 20.4176C24.1219 20.4555 23.8566 20.4934 23.5535 20.8344C23.3641 21.0617 23.0988 21.1375 22.8715 21.1375C22.682 21.1375 22.4547 21.0996 22.3031 20.948C21.9242 20.607 21.8863 20.0387 22.1895 19.6598C22.9852 18.7125 23.8945 18.6367 24.5387 18.5988C24.59 18.592 24.6389 18.5858 24.6856 18.5798C25.1553 18.52 25.3997 18.4888 25.6754 18.1441C25.9785 17.8031 25.9785 17.5379 25.9406 16.9695C25.8648 16.3254 25.827 15.416 26.6227 14.5066C27.3999 13.5814 28.2494 13.4876 28.9241 13.4131L28.9719 13.4078C29.5402 13.3699 29.7676 13.332 30.0707 12.991C30.4117 12.6121 30.9801 12.5742 31.359 12.8773C31.7379 13.2184 31.7758 13.7867 31.4727 14.1656C30.677 15.1129 29.7676 15.1887 29.1234 15.2266C28.5551 15.3023 28.2898 15.3402 27.9867 15.6812C27.6836 16.0223 27.6836 16.2875 27.7215 16.8559ZM20.1813 13.5594C20.1813 13.0668 20.5223 12.65 21.0527 12.65C21.5832 12.65 21.9621 13.0668 21.9621 13.5594V13.9383C21.9621 15.7191 21.2043 17.3863 19.8402 18.523C19.6508 18.6746 19.4613 18.7125 19.2719 18.7125C19.0066 18.7125 18.7414 18.6367 18.552 18.4094C18.2488 18.0305 18.2867 17.4621 18.6656 17.1211C19.6129 16.3254 20.1813 15.1887 20.1813 13.9383V13.5594ZM13.5125 13.8625C13.5125 13.2184 14.043 12.6879 14.725 12.6879C15.3691 12.6879 15.9375 13.2184 15.8996 13.8625C15.8996 14.4688 15.3313 15.0371 14.725 15.0371C14.0809 15.0371 13.5125 14.5066 13.5125 13.8625ZM30.3738 22.35H30.7527C31.2832 22.35 31.6621 22.7668 31.6621 23.2594C31.6621 23.7898 31.2832 24.1688 30.7906 24.1688H30.4117C29.1613 24.1688 28.0246 24.7371 27.191 25.6844C27.0016 25.9117 26.7363 25.9875 26.509 25.9875C26.3195 25.9875 26.1301 25.9496 25.9406 25.798C25.5617 25.457 25.5238 24.8887 25.827 24.5098C26.9637 23.1457 28.6309 22.35 30.3738 22.35ZM29.275 18.7125C29.275 18.0684 29.7676 17.5 30.4496 17.5C31.1316 17.5 31.6621 18.0684 31.6242 18.7125C31.6242 19.3188 31.0938 19.8871 30.4496 19.8871C29.8055 19.8871 29.275 19.3566 29.275 18.7125ZM29.275 29.625C29.275 28.9809 29.7676 28.4125 30.4496 28.4125C31.1316 28.4125 31.6621 28.9809 31.6242 29.625C31.6242 30.2313 31.0938 30.7996 30.4496 30.7996C29.8055 30.7996 29.275 30.2691 29.275 29.625ZM12.641 31.709C12.3 31.3301 12.1863 30.8754 12.3758 30.4207L13.6262 27.0105L17.3395 30.7238L13.9293 31.9742C13.7777 32.05 13.6262 32.05 13.5125 32.05C13.1715 32.05 12.8684 31.9363 12.641 31.709ZM18.5898 30.2313L14.1188 25.7602L14.9523 23.4867L20.8633 29.3977L18.5898 30.2313ZM17.9836 20.3039L24.0461 26.3664C24.3492 26.6695 24.4629 27.0863 24.3871 27.4652C24.3113 27.882 24.0082 28.223 23.6293 28.3367L22.1137 28.9051L15.4449 22.2363L16.0133 20.7207C16.127 20.3418 16.468 20.0387 16.8848 19.9629C17.2637 19.8871 17.6805 20.0008 17.9836 20.3039Z"
                                                    fill="white"
                                                    fill-opacity="0.73"
                                                />
                                            </svg>
                                        </div>
                                        <div class="service-item__body">
                                            <h3 class="service-item__heading">
                                                Opulent Event Services
                                            </h3>
                                            <div class="service-item__desc">
                                                Luxury, curated. From exclusive
                                                venues to elite entertainment,
                                                experience unparalleled
                                                celebrations
                                            </div>
                                        </div>
                                    </section>
                                </div>

                                <Link
                                    className="btn"
                                    // className='active'
                                    // to={"/ManageService"}
                                    to={"/ViewListService"}
                                >
                                    All Services
                                </Link>
                                {/* <a href="" class="btn">
                                    All Services
                                </a> */}
                            </div>
                        </div>
                    </div>
                </section>
                {/* Work */}
                <section class="work" id="work1">
                    <div class="container">
                        <h2 class="section-heading">How it works</h2>
                        <p class="section-desc work-desc">
                            Planning the perfect birthday for your little one
                            has never been easier. Discover how our services
                            bring joy and create unforgettable moments for your
                            child's special day.
                        </p>

                        <div class="work__list">
                            {/* <!-- Work item 1 --> */}
                            <section class="work__item">
                                <img
                                    src="/icons/Orion_search.svg"
                                    alt=""
                                    class="work-item__icon"
                                />
                                <h3 class="work-item__heading">
                                    Search Packages
                                </h3>
                                <p class="work-item__desc">
                                    Search a Package by Package name or apart of
                                    Package name.
                                </p>
                            </section>

                            {/* <!-- Work item 2 --> */}
                            <section class="work__item">
                                <img
                                    src="/icons/Orion_find-user.svg"
                                    alt=""
                                    class="work-item__icon"
                                />
                                <h3 class="work-item__heading">Find Host</h3>
                                <p class="work-item__desc">
                                    Search a host by Host name and find your
                                    suitable host for you.
                                </p>
                            </section>

                            {/* <!-- Work item 3 --> */}
                            <section class="work__item">
                                <img
                                    src="/icons/Packages.svg"
                                    alt=""
                                    class="work-item__icon"
                                />
                                <h3 class="work-item__heading">Get Packages</h3>
                                <p class="work-item__desc">
                                    Choose the perfect sweet treat package for a
                                    magical experience.
                                </p>
                            </section>
                        </div>
                    </div>
                </section>
                {/* <!-- Feature --> */}
                <section class="feature" id="about1">
                    <div class="container">
                        <div class="feature__inner">
                            <div class="features__media">
                                <figure class="feature__images">
                                    <img
                                        src="/img/feature2.jpg"
                                        alt=""
                                        class="feature__img"
                                    />
                                    <img
                                        src="/img/feature1.jpg"
                                        alt=""
                                        class="feature__img"
                                    />
                                </figure>
                            </div>

                            <section class="feature__content">
                                <h2 class="section-heading">
                                    Where Birthday Happiness Begins!
                                </h2>
                                <p class="section-desc">
                                    Creating Birthday Joy! We offer a unique
                                    experience to celebrate special moments in
                                    your life. Join us to share the happiness
                                    and make unforgettable memories together.
                                </p>
                            </section>
                        </div>
                    </div>
                </section>
                {/* <!-- Member --> */}

                <div class="member" id="member1">
                    <div class="container">
                        <header class="member__header">
                            <h2 class="section-heading">Our virtual Hosts</h2>
                            <a href="/Hostpage" class="btn member__cta">
                                Meet our Hosts
                            </a>
                        </header>

                        <div className="member__list">
                            {members.map((member) => (
                                <article
                                    key={member.id}
                                    className="member__item"
                                >
                                    <div className="member-item__img-bg">
                                        <img
                                            src={member.avatar}
                                            alt={member.name}
                                            className="member-item__thumb"
                                        />
                                    </div>
                                    <h3 className="member-item__name">
                                        {member.name}
                                    </h3>
                                    <p className="member-item__desc">
                                        {member.address}
                                    </p>
                                </article>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
