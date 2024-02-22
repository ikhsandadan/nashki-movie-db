"use client";
import React, { useContext, useEffect, useState } from "react";
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Link from 'next/link';
import Tooltip from '@mui/material/Tooltip';


import AppContext from "../context/AppContext";
import Pagination from "./Pagination";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
    marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: alpha(theme.palette.common.white, 0),
    border: '1px solid #d7dce1',
    fontSize: 16,
    color: "white",
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
        color: "white",
        borderRadius: 4,
        borderColor: 'white',
        boxShadow: '0 0 0 0.2rem rgba(0,0,0,0.25)',
    },
    },
}));


const Selectgenre = ({ genres, type }) => {
    const { fetchMoviesByGenre, fetchTrendingMovies } = useContext(AppContext);
    const [movieArray, setMovieArray] = useState([]);
    const [totalPages, setTotalpages] = useState();
    const [genreID, setGenreID] = useState();
    const [currentPage, setCurrentPage] = useState(1);

    const handleChange = (event) => {
        let ID = event.target.value;
        setGenreID(ID);

        fetchDataByGenre(ID, type, currentPage);
    };

    const fetchDataByGenre = (genreID, type) => {
        let data = [];
        data = fetchMoviesByGenre(genreID, type, currentPage);

        data.then((result) => {
            setMovieArray(result?.data?.results);

            if (result?.data?.total_pages <= 500) {
                setTotalpages(result?.data?.total_pages);
            } else {
                setTotalpages(500);
            }
        });
    };

    const fetchData = () => {
        let data = [];
            
            data = fetchTrendingMovies(currentPage);

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
        if (genreID !== undefined) {
            fetchDataByGenre(genreID, type);
        } else {

        }
    }, [currentPage]);

    useEffect(() => {
        if (genreID === undefined) {
            fetchData();
        } 
    }, [genreID, currentPage])

    return (
        <>
        <Box className="pl-10">
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small" variant="standard">
                <InputLabel id="Genre" sx={{color: "white"}} className="pt-4 pl-2">Genres</InputLabel>
                <Select
                    labelId="Genres"
                    id="Genres"
                    label="Genres"
                    autoWidth
                    onChange={handleChange}
                    input={<BootstrapInput/>}
                >
                    {genres?.map((genre) => {
                        return (
                            <MenuItem value={genre.id} key={genre.id}>{genre.name}</MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
        </Box>
        <div className="flex justify-center mt-6">
            <div className="grid grid-cols-5 gap-8">
                {movieArray?.map((movie, index) => (
                    <div key={index} className="mb-8">
                        <Link href={`/Moviedetail/${movie.id}`} style={{textDecoration: "none", color:"white"}}>
                            <Tooltip title={movie.original_title}>
                                <img className="max-w-52 rounded hover:scale-110" src={`https://image.tmdb.org/t/p/original${movie && movie.poster_path}`} alt={movie.original_title}/>
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
    );
};

export default Selectgenre;