"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation } from 'swiper/modules';
import Tooltip from '@mui/material/Tooltip';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';

const Slider = (movies) => {
    const [Movies, setMovies] = useState([]);

    useEffect(() => {
        setMovies(movies.movies);
    }, [movies]);
    return (
        <Swiper
            slidesPerView={6}
            spaceBetween={0}
            freeMode={true}
            navigation={true}
            modules={[FreeMode, Navigation]}
            className="scale-95"
        >
            {Movies?.map((movie) => {
                return (
                    <SwiperSlide key={movie.id} className="max-w-56">
                        <Link href={`/Moviedetail/${movie.id}`} style={{textDecoration: "none", color:"white"}}>
                            <Tooltip title={movie.original_title}>
                                <div className="max-w-56 rounded hover:scale-105">
                                    <img src={`https://image.tmdb.org/t/p/original${movie && movie.poster_path}`} alt={movie.original_title} className="max-w-56 rounded hover:scale-105"/>
                                </div>
                            </Tooltip>
                        </Link>
                    </SwiperSlide>
                )
            })}
        </Swiper>
    )
};

export default Slider;
