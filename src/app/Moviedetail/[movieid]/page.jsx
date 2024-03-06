"use client";
import React, { useContext, useEffect, useState } from 'react';
import { format,subWeeks, isAfter, isBefore } from 'date-fns';
import { usePathname } from 'next/navigation';
import ReactPlayer from 'react-player/youtube';
import Link from 'next/link';
import { Button } from '@mui/material';
import axios from 'axios';
import { faStar, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import AppContext from '@/app/context/AppContext';
import UserContext from '@/app/context/UserContext';

import "./page.css";

const Moviedetails = () => {
    const pathName = usePathname();
    const { profile } = useContext(UserContext);
    const { fetchMovieDetails, fetchMovieVideos } = useContext(AppContext);
    const [movieID, setMovieID] = useState();
    const [movieDetail, setMovieDetail] = useState([]);
    const [movieTrailer, setMovieTrailer] = useState([]);
    const [isNowPlaying, setIsNowPlaying] = useState(false);
    const [showtimes, setShowtimes] = useState([]);
    const [region, setRegion] = useState();
    const [location, setLocation] = useState();

    const fetchData = () => {
        let details = [];
        let videos = [];

        details = fetchMovieDetails(movieID);
        videos = fetchMovieVideos(movieID);

        details.then((result) => {
            setMovieDetail(result?.data);
        });

        videos.then((result) => {
            const data = result?.data?.results;
            let trailer = [];

            for (let i = 0; i < data.length; i++) {
                if (data?.[i].type === "Trailer") {
                    trailer.push(data?.[i]);
                }
            }
            setMovieTrailer(trailer);
        });
    };

    const fetchShowtimesData = async (movie, location, region) => {
        // Buat permintaan ke endpoint API Anda
        const params = new URLSearchParams({
            movie,
            location,
            region
        });

        const response = await axios.get(`/api/requiredparams?${params}`);

        if (response?.data !== '') {
            setShowtimes(response?.data?.[0]?.theaters);
            console.log(response?.data?.[0]?.theaters);
        }
    };

    const isReleaseWithinLastWeek = (releaseDate) => {
        const fourWeekAgo = subWeeks(new Date(), 4);
        const parsedReleaseDate = new Date(releaseDate);

        return isAfter(parsedReleaseDate, fourWeekAgo) && isBefore(parsedReleaseDate, new Date());
    };

    useEffect(() => {
        if (isReleaseWithinLastWeek(movieDetail?.release_date)) {
            setIsNowPlaying(true);
        } else {
            setIsNowPlaying(false);
        }
    }, [movieDetail])

    useEffect(() => {
        setMovieID(pathName.replace(/\D/g, ''))
    }, [])

    useEffect(() => {
        if (isNowPlaying) {
            fetchShowtimesData(movieDetail.original_title, location, region);
        }
    }, [location, movieDetail, region, isNowPlaying])

    useEffect(() => {
        if (movieID !== undefined && profile !== undefined) {
            fetchData();
            setRegion(sessionStorage.getItem('region'));
        }

        setLocation(profile?.locality + "," + " " + profile?.country);
    }, [movieID, profile]);

    return (
        <div className="movie">
            <div className="movie_intro">
                <img className="movie_backdrop" src={`https://image.tmdb.org/t/p/original${movieDetail ? movieDetail.backdrop_path : ""}`} />
            </div>
            <div className="movie_detail">
                <div className="movie_detailLeft">
                    <div className="movie_posterBox">
                        <img className="movie_poster" src={`https://image.tmdb.org/t/p/original${movieDetail ? movieDetail.poster_path : ""}`} />
                    </div>
                </div>
                <div className="movie_detailRight">
                    <div className="movie_detailRightTop">
                        <div className="movie_name">{movieDetail ? movieDetail.original_title : ""}</div>
                        <div className="movie_tagline">{movieDetail ? movieDetail.tagline : ""}</div>
                        <div className="movie_rating">
                            {movieDetail ? movieDetail.vote_average: ""} <FontAwesomeIcon icon={faStar} className="pl-2 text-amber-400"/>
                            <span className="movie_voteCount">{movieDetail ? "(" + movieDetail.vote_count + ") votes" : ""}</span>
                        </div>  
                        <div className="movie_runtime">{movieDetail ? movieDetail.runtime + " mins" : ""}</div>
                        <div className="movie_releaseDate">{movieDetail.release_date ? "Release date: " + format(movieDetail.release_date, 'MMMM do yyyy') : ""}</div>
                        <div className="movie_genres">
                            {movieDetail && movieDetail.genres ? 
                                movieDetail.genres.map(genre => (
                                    <span key={genre.id} className="movie_genre" id={genre.id}>{genre.name}</span>
                                )) : ("")
                            }
                        </div>
                    </div>
                    <div className="movie_detailRightBottom">
                        <div className="synopsisText">Synopsis</div>
                        <div>{movieDetail ? movieDetail.overview : ""}</div>
                    </div>
                </div>
            </div>
            <div className="movie_links">
                <div className="movie_heading text-white">Useful Links</div>
                {movieDetail && movieDetail.homepage && 
                    <Link className="flex " href={movieDetail.homepage} target="_blank" style={{textDecoration: "none"}}>
                        <Button variant="outlined" className="self-center text-lg text-slate-100">Homepage <FontAwesomeIcon className="pl-2" icon={faArrowUpRightFromSquare} /></Button>
                    </Link>
                }
                {movieDetail && movieDetail.imdb_id && 
                    <Link className="flex " href={`https://www.imdb.com/title/${movieDetail.imdb_id}`} target="_blank" style={{textDecoration: "none"}}>
                        <Button variant="outlined" className="self-center text-lg text-yellow-200">IMDb <FontAwesomeIcon className="pl-2" icon={faArrowUpRightFromSquare} /></Button>
                    </Link>
                }
            </div>
            {movieTrailer.length !== 0 ? (
                <div className="grid grid-flow-row auto-rows-max">
                    <div className="movie_heading text-white text-center mb-6">{movieDetail ? movieDetail.original_title : ""} Trailer</div>
                    <div className="grid grid-flow-row auto-rows-max">
                        {movieTrailer?.map((trailer) => (
                            <div key={trailer.id} className="grid grid-flow-row auto-rows-max gap-y-2.5">
                                <div className="text-white text-2xl ml-6">{trailer.name}</div>
                                <ReactPlayer url={`https://www.youtube.com/watch?v=${trailer.key}#origin`} controls className="mb-20 justify-self-center"/>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (null)}
            {isNowPlaying && showtimes?.length > 0 ? (
                <div className="text-white">
                    <div className="movie_heading text-white text-center mb-6">Showtimes</div>
                    <table className="border border-white">
                        <thead>
                            <tr>
                                <th className="border border-white font-semibold text-lg table-auto mx-6 my-4">{format(new Date(), 'MMMM do yyyy')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {showtimes?.map((show) => (
                                <tr>
                                    <td className="border border-white">
                                        <div className='mx-4 my-2'>{show?.name}</div>
                                        <div className='mx-4 my-2'>Distance: {show?.distance}</div>
                                        <div className='text-sm mx-4 my-2'>{show?.address}</div>
                                        {show?.showing?.map((shows) => (
                                            <div >
                                                <div className={`flex grid-cols-${shows.time?.length + 1}`}>
                                                    <div className="my-2 ml-4 mr-8">{shows.type}:</div>
                                                    {shows?.time?.map((times) => (
                                                        <div className="self-center mx-4">{times}</div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (null)}
            <div className="movie_heading text-white mb-2 mt-10">Production Companies</div>
            <div className="movie_production bg-slate-100 rounded">
                {movieDetail && movieDetail.production_companies && 
                    movieDetail.production_companies.map((company, index) => (
                        <div key={index}>
                            {company.name && 
                                <div className="productionCompanyImage">
                                    {company.logo_path && 
                                        <img className="movie_productionComapany" src={`https://image.tmdb.org/t/p/original${company.logo_path}`} />
                                    }
                                    <div className="font-bold mx-2">{company.name}</div>
                                </div>
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Moviedetails;
