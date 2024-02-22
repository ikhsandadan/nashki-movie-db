"use client";
import React, { useContext, useEffect, useState } from 'react';
import Selectgenre from '../(components)/Selectgenre';
import AppContext from '../context/AppContext';

const Movies = () => {
    const { getGenres } = useContext(AppContext);
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        let fetchGenres = [];
        fetchGenres = getGenres();

        fetchGenres.then((result) => {
            setGenres(result?.data?.genres);
        });
    }, [])

    return (
        <div >
            <div className="text-white text-6xl text-center font-nsans-bold mt-20">Movies</div>
            <Selectgenre genres={genres} type="movie" />
        </div>
    )
}

export default Movies;