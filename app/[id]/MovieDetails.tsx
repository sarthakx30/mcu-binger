'use client'

import Image from "next/image";
import { Movie } from "../types/app";
import { useState, useRef } from "react";
import { useInView } from 'react-intersection-observer';
import { Swiper, SwiperSlide, SwiperClass } from 'swiper/react';
import { Pagination, Scrollbar, Controller, EffectFade, EffectCards } from 'swiper/modules';
import { useSwiper, useSwiperSlide } from "swiper/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DpLogoBlack from '../components/7033669_disney_plus_icon.png';
import DpLogoWhite from '../components/7033669_disney_plus_icon (1).png';
import ImdbLogo from '../components/613f661716381700041030fc.png';
import SlideText from './SlideText';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-fade';
import { faArrowRight } from "@fortawesome/free-solid-svg-icons/faArrowRight";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const MovieDetails = ({ movies }: { movies: Movie[] }) => {
    const swiper = useSwiper();

    const [controlledBannerSwiper, setControlledBannerSwiper] = useState(swiper);
    const [controlledTextSwiper, setControlledTextSwiper] = useState(swiper);
    const [posterSwiper, setPosterSwiper] = useState(swiper);

    const [watchButtonHovered, setWatchButtonHovered] = useState(false);

    return (
        <div className="relative h-screen text-white">
            <div className="z-0">
                <Swiper
                    className=""
                    effect="fade"
                    modules={[Controller, EffectFade]}
                    onSwiper={setControlledBannerSwiper}
                >
                    {movies?.map((movie, idx) => (
                        <SwiperSlide key={idx}>
                            <div
                                className="w-screen h-screen bg-cover bg-center"
                                style={{
                                    backgroundImage: `url(${movie.banner})`,
                                    filter: 'blur(2px)'
                                }}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className='absolute inset-0 bg-black opacity-50 w-full z-10' />
            </div>
            <div className='absolute top-1/4 w-full z-50'>
                <div className="">
                    <Swiper
                        // spaceBetween={100}
                        // slidesPerView={1}
                        effect='cards'
                        modules={[Controller, EffectCards]}
                        // centeredSlides={true}
                        controller={{ control: [controlledBannerSwiper, controlledTextSwiper] }}
                        onSwiper={setPosterSwiper}
                        className=""
                    >
                        {movies?.map((movie, idx) => (
                            <SwiperSlide
                                className=""
                                key={idx}
                            >
                                <Image className="mx-auto" src={movie.poster} width={150} height={200} alt='poster' quality={100} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                <div className="h-full overflow-hidden">
                    <Swiper
                        className=""
                        // direction={'vertical'} // laggy and broken
                        // style={{transform:'rotate(90deg)'}}
                        modules={[Controller]}
                        onSwiper={setControlledTextSwiper}
                    >
                        {movies?.map((movie, idx) => (
                            <SwiperSlide
                                className=""
                                // style={{transform:'rotate(270deg)'}}
                                key={idx}
                            >
                                <div className="px-20 py-5 flex flex-col justify-center items-center space-y-2">
                                    <div className="flex flex-row space-x-5">
                                        <button onClick={() => window.open(movie.watchLink, '_blank')}
                                            onMouseEnter={() => setWatchButtonHovered(true)}
                                            onMouseLeave={() => setWatchButtonHovered(false)}
                                            className="
                                            flex flex-row bg-white text-black items-center space-x-1
                                            hover:bg-black hover:text-white
                                            border-2 border-black
                                            hover:border-white
                                            py-1 px-3 rounded-lg
                                        ">
                                            <p>Watch On</p>
                                            <div className="relative bottom-0.5">
                                                <Image src={DpLogoBlack} width={50} height={20} style={{ display: watchButtonHovered ? 'none' : 'block' }} alt='disneyPlusBlack' />
                                                <Image src={DpLogoWhite} width={50} height={20} style={{ display: watchButtonHovered ? 'block' : 'none' }} alt='disneyPlusWhite' />
                                            </div>
                                        </button>
                                        <button onClick={() => window.open(movie.imdb, '_blank')}
                                            className="
                                            flex flex-row bg-white text-black items-center space-x-1
                                            hover:bg-black hover:text-white
                                            border-2 border-black
                                            hover:border-white
                                            py-1 px-3 rounded-lg
                                        ">
                                            <FontAwesomeIcon icon={faStar} color="gold" />
                                            {/* <Image src={starIcon} width={30} height={20} alt='star-icon' /> */}
                                            <p>{movie.imdbRatings}</p>
                                            <p>on</p>
                                            <Image src={ImdbLogo} width={50} height={20} alt='imdb-logo' />
                                        </button>
                                    </div>
                                    <SlideText title={movie.title} />
                                    {/* <p>Current slide is {swiperSlide.isActive ? 'active' : 'not active'}</p> */}
                                    <p className="text-center text-lg leading-tight font-light">{movie.description}</p>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                <div className="flex flex-row justify-center space-x-5">
                    <button onClick={() => posterSwiper?.slidePrev()}
                        className="
                            border-2 p-2
                            hover:bg-white
                            hover:text-black
                            hover:border-black
                            rounded-md
                        "
                    >
                        <FontAwesomeIcon icon={faArrowLeft} size="xl" />
                    </button>
                    <button onClick={() => posterSwiper?.slideNext()}
                        className="
                            border-2 p-2
                            hover:bg-white
                            hover:text-black
                            hover:border-black
                            rounded-md
                        "
                    >
                        <FontAwesomeIcon icon={faArrowRight} size="xl" />
                    </button>
                </div>
            </div>
        </div >
    )
}

export default MovieDetails; 