"use client";
import React, { useContext, useEffect, useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Link from 'next/link';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { format } from 'date-fns';
import { getCode } from 'country-list';

import AppContext from '../context/AppContext';
import UserContext from '../context/UserContext';
import Slider from '../(components)/Slider';
import "./page.css";

const Frontpage = () => {
    const { fetchPopularMovie, fetchNowPlayingMovies, fetchUpcomingMovies, fetchTrendingMovies } = useContext(AppContext);
    const { profile } = useContext(UserContext);
    const [popularMovies, setPopularMovies] = useState([]);
    const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [region, setRegion] = useState();

    const userCountry = profile?.country || 'United States of America';

    const updateRegion = () => {
        if (sessionStorage.getItem('region') !== undefined) {
            const countryCode = getCode(userCountry);
            setRegion(countryCode);
            sessionStorage.setItem('region', countryCode);
        } else if (profile !== undefined ) {
            setRegion(sessionStorage.getItem('region'));
        }
    };

    const fetchData = (region) => {
        let nowPlaying = [];
        let upcoming = [];
        let popular = [];
        let trending = [];

        nowPlaying = fetchNowPlayingMovies(region);
        upcoming = fetchUpcomingMovies(region);
        popular = fetchPopularMovie(region);
        trending = fetchTrendingMovies(1);

        nowPlaying.then((result) => {
            setNowPlayingMovies(result?.data?.results);
        });

        upcoming.then((result) => {
            setUpcomingMovies(result?.data?.results);
        });

        popular.then((result) => {
            setPopularMovies(result?.data?.results);
        });

        trending.then((result) => {
            setTrendingMovies(result?.data?.results)
        });
    };

    useEffect(() => {
        updateRegion();
        if (profile !== undefined && region !== undefined) {
            fetchData(region);
        } else {
            fetchData("US");
        }
    }, [profile, region]); 

    return (
            <div className="poster">
                <Carousel
                    showThumbs={false}
                    autoPlay={true}
                    transitionTime={3}
                    navigation={true}
                    infiniteLoop={true}
                    showStatus={false}
                    className="text-white"
                >
                    {trendingMovies?.map((movie) => (
                        <Link key={movie.id} style={{textDecoration: "none", color:"white"}} href={`/Moviedetail/${movie.id}`}>
                            <div className="posterImage">
                                <img src={`https://image.tmdb.org/t/p/original${movie && movie.backdrop_path}`}/>
                            </div>
                            <div className="posterImage_overlay hover:opacity-90">
                                <div className="posterImage_title">{movie ? movie.original_title : ""}</div>
                                <div className="posterImage_runtime">
                                    {movie ? format(movie.release_date, 'MMMM do yyyy') : ""}
                                    <span className="posterImage_rating">
                                    <FontAwesomeIcon icon={faStar} className="pr-2 text-amber-400"/>
                                        {movie ? movie.vote_average.toFixed(1) : ""}
                                    </span>
                                </div>
                                <div className="posterImage_description">{movie ? movie.overview : ""}</div>
                            </div>
                        </Link>
                    ))}
                </Carousel>
                <div className="">
                    <div className="text-white text-2xl text-start font-nsans-bold mt-14 ml-10">Popular In {userCountry}</div>
                    <Slider movies={popularMovies} status={"popular"}/>
                    <div className="text-white text-2xl text-start font-nsans-bold mt-14 ml-10">Now Playing In {userCountry}</div>
                    <Slider movies={nowPlayingMovies} status={"now playing"}/>
                    <div className="text-white text-2xl text-start font-nsans-bold mt-14 ml-10">Upcoming In {userCountry}</div>
                    <Slider movies={upcomingMovies} status={"upcoming"}/>
                </div>
            </div>
    );
};

export default Frontpage;
