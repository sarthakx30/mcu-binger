'use client'

import Image from "next/image";
import { Movie } from "../types/app";
import Banner from '../components/banner-main.png'
import { useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Controller, EffectFade,EffectCards } from 'swiper/modules';
import { useSwiper } from "swiper/react";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-fade';

const MovieDetails = ({ movies }: { movies: Movie[] }) => {
    const swiper = useSwiper();
    const [controlledBannerSwiper, setControlledBannerSwiper] = useState(null);
    const [posterSwiper, setPosterSwiper] = useState(null)

    return (
        <div className="relative text-white">
            <div className="relative z-0">
                <Swiper
                    className=""
                    effect="fade"
                    modules={[Controller, EffectFade]}
                    onSwiper={setControlledBannerSwiper}
                >
                    {movies.map((movie, idx) => (
                        <SwiperSlide key={idx}>
                            <div
                                className="w-screen h-screen bg-cover bg-center"
                                style={{
                                    backgroundImage: `url(${movie.banner})`,
                                    filter:'blur(3px)'
                                }}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className='absolute inset-0 bg-black opacity-50 w-full z-10' />
            </div>
            <br />
            <div className="absolute top-1/3 w-full z-50">
                <Swiper
                    // spaceBetween={100}
                    // slidesPerView={1}
                    effect='cards'
                    modules={[Controller,EffectCards]}
                    // centeredSlides={true}
                    controller={{ control: controlledBannerSwiper }}
                    onSwiper={setPosterSwiper}
                    className=""
                >
                    {movies.map((movie, idx) => (
                        <SwiperSlide
                            className=""
                            key={idx}
                        >
                            <Image className="mx-auto" src={movie.poster} width={200} height={200} alt='poster' />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className="absolute bottom-1/4 transform translate-y-40 w-full text-center z-100">
                <button onClick={() => posterSwiper.slidePrev()}>Slide to the previous slide</button>
                <br />
                <button onClick={() => posterSwiper.slideNext()}>Slide to the next slide</button>
            </div>
        </div >
        // <div style={{
        //     backgroundImage: `url(${banner})`,
        //     // backgroundImage:'url(/images/iron-man-1/poster.jpg)',
        //     backgroundSize: 'cover',
        //     backgroundPosition: 'center',
        //     width: '100%',
        //     height: '600px',
        // }}
        // >
        //     <div className="inset-0 bg-black opacity-50 h-full" />
        //     <div className="absolute opacity-100 h-full blur-md" />
        //     <div className="absolute left-1/4 text-white transform -translate-y-80 max-w-sm">
        //         <Swiper
        //             modules={[Navigation, Pagination, Scrollbar, A11y]}
        //             spaceBetween={50}
        //             slidesPerView={1}
        //             // navigation
        //             pagination={{ clickable: true }}
        //             scrollbar={{ draggable: true }}
        //             onSlideChange={() => console.log('slide change')}
        //             onSwiper={(swiper) => console.log(swiper)}
        //             className="items-center justify-center margin-auto"
        //         >
        //             <SwiperSlide><Image src={poster} width={150} height={150} alt='poster' /></SwiperSlide>
        //             <SwiperSlide><Image src={poster} width={150} height={150} alt='poster' /></SwiperSlide>
        //             <SwiperSlide><Image src={poster} width={150} height={150} alt='poster' /></SwiperSlide>
        //             <SwiperSlide><Image src={poster} width={150} height={150} alt='poster' /></SwiperSlide>
        //         </Swiper>
        //         <p className="text-white">hello</p>
        //         <button onClick={() => swiper?.slideNext()}>Slide to the next slide</button>
        //         {/* <button><Image src={arrow} alt='left button' style={{ color: 'orange' }} /></button>
        //         <button><Image src={arrow} alt='right button' /></button> */}
        //     </div>
        // </div>
    )
}

export default MovieDetails; 