"use client";
import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import Tooltip from '@mui/material/Tooltip';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import AppContext from "../context/AppContext";
import Pagination from '../(components)/Pagination';

const Toprated = () => {
  const { fetchTopRatedMovies } = useContext(AppContext);
  const [movieArray, setMovieArray] = useState([]);
  const [totalPages, setTotalpages] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  const fetchData = () => {
    let data = [];
        
        data = fetchTopRatedMovies(currentPage);

        data.then((result) => {
            setMovieArray(result?.data?.results);
            if (result?.data?.total_pages <= 500) {
                setTotalpages(result?.data?.total_pages);
            } else {
                setTotalpages(500);
            }
        })
  };

  useEffect(() => {
    fetchData();
  }, [currentPage])

  return (
    <>
    <div className="text-white text-6xl text-center font-nsans-bold mt-20 mb-16">Top Rated Movies</div>
    <div className="flex justify-center mt-6">
      <div className="grid grid-cols-5 gap-8">
          {movieArray?.map((movie, index) => (
              <div key={index} className="mb-8 hover:scale-110 container mx-auto">
                  <Link href={`/Moviedetail/${movie.id}`} style={{textDecoration: "none", color:"white"}}>
                      <Tooltip title={movie.original_title}>
                        <div className="relative">
                          <img className="max-w-52 rounded" src={`https://image.tmdb.org/t/p/original${movie && movie.poster_path}`} alt={movie.original_title}/>
                          <div className="absolute top-0 right-2 rounded-md bg-black/25 mt-2 my-2">
                            <FontAwesomeIcon icon={faStar} className="pl-2 pr-2 text-amber-400 drop-shadow-md"/>
                            <span className="text-white pr-2 drop-shadow-md">{movie ? movie.vote_average.toFixed(1) : ""}</span>
                          </div>
                        </div>
                      </Tooltip>
                  </Link>
              </div>
          ))}
      </div>
    </div>
    {movieArray?.length > 1 ? (
          <Pagination setCurrentPage={setCurrentPage} totalPages={totalPages} currentPage={currentPage} />
      ) : (null)
    }
    </>
  )
}

export default Toprated;