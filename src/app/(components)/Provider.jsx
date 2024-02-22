"use client";
import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import UserContext from '../context/UserContext';
import AppContext from '../context/AppContext';

const Provider = ({ children }) => {
    const TMDB_API = "db3798f79e929c0af139ec4b890d3cb9";
    const TMDB_URL = "https://api.themoviedb.org/3";
    const queryClient = new QueryClient();
    const [userProfile, setUserProfile] = useState(null);

    const getGenres = async () => {
        try {
            const response = await axios.get(
                `${TMDB_URL}/genre/movie/list?api_key=${TMDB_API}`
            );

            return response;
        } catch(e) {
            console.log(e);
        }
    };

    const fetchPopularMovie = async (region) => {
        try {
            const response = await axios.get(`${TMDB_URL}/movie/popular?api_key=${TMDB_API}&region=${region}`)

            return response;
        } catch(e) {
            console.log(e);
        }
    };

    const fetchMoviesByGenre = async (genre, type, page) => {

        try {
            const response = await axios.get(`${TMDB_URL}/discover/${type}?api_key=${TMDB_API}&with_genres=${genre}&page=${page}`)

            return response;
        } catch(e) {
            console.log(e);
        }
    };

    const fetchTrendingMovies = async (page) => {
        try {
            const response = await axios.get(`${TMDB_URL}/trending/movie/week?api_key=${TMDB_API}&page=${page}`)

            return response;
        } catch(e) {
            console.log(e);
        }
    };

    const fetchNowPlayingMovies = async (region) => {
        try {
            const response = await axios.get(`${TMDB_URL}/movie/now_playing?api_key=${TMDB_API}&page=1&region=${region}`)

            return response;
        } catch(e) {
            console.log(e);
        }
    };

    const fetchUpcomingMovies = async (region) => {
        try {
            const response = await axios.get(`${TMDB_URL}/movie/upcoming?api_key=${TMDB_API}&page=1&region=${region}`)

            return response;
        } catch(e) {
            console.log(e);
        }
    };

    const fetchMovieDetails = async (id) => {
        try {
            const response = await axios.get(`${TMDB_URL}/movie/${id}?api_key=${TMDB_API}`)

            return response;
        } catch(e) {
            console.log(e);
        }
    };

    const fetchMovieVideos = async (id) => {
        try {
            const response = await axios.get(`${TMDB_URL}/movie/${id}/videos?api_key=${TMDB_API}`)

            return response;
        } catch(e) {
            console.log(e);
        }
    };

    const fetchTopRatedMovies = async (page) => {
        try {
            const response = await axios.get(`${TMDB_URL}/movie/top_rated?api_key=${TMDB_API}&page=${page}`)

            return response;
        } catch(e) {
            console.log(e);
        }
    };

    const fetchSearchMovies = async (query) => {
        try {
            const response = await axios.get(`${TMDB_URL}/search/movie?api_key=${TMDB_API}&query=${query}`)

            return response;
        } catch(e) {
            console.log(e);
        }
    };

    return (
        <QueryClientProvider client={queryClient}>
        <UserContext.Provider value={{ profile: userProfile, setProfile: setUserProfile }}>
        <AppContext.Provider 
        value={
            {
                getGenres,  
                fetchMoviesByGenre, 
                fetchPopularMovie,
                fetchNowPlayingMovies,
                fetchUpcomingMovies,
                fetchMovieDetails,
                fetchMovieVideos,
                fetchTrendingMovies,
                fetchTopRatedMovies,
                fetchSearchMovies
            }
        }>
            {children}
        </AppContext.Provider>
        </UserContext.Provider>
        </QueryClientProvider>
    )
}

export default Provider