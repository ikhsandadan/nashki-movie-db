"use client";
import React, { useContext, useEffect, useState } from 'react';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import AppBar from '@mui/material/AppBar';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';


import UserContext from '../context/UserContext';
import AppContext from '../context/AppContext';
import Session from './Session';
import defaultPicture from '../../assets/profile.png';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    height: '80%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'transparent',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '0ch',
            '&:focus': {
            width: '20ch',
            },
        },
    },
}));

const Nav = () => {
    const Router = useRouter();
    const { setProfile } = useContext(UserContext);
    const { fetchSearchMovies } = useContext(AppContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const [localProfile, setLocalProfile] = useState(null);
    const [sessions, setSessions] = useState([]);
    const [header, setHeader] = useState(false);
    const [input, setInput] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const isMenuOpen = Boolean(anchorEl);

    let profilePicture = localProfile?.picture || defaultPicture;

    const pages = [
        {name:'Home', link: '/'},
        {name: 'Movies', link: '/Movies'}, 
        {name: 'Top Rated', link: '/Toprated'}
    ];

    const scrollHeader = () => {
        if (window.scrollY >= 20) {
            setHeader(true)
        } else {
            setHeader(false)
        }
    };

    const fetchData = (value) => {
        let data = [];
        
        data = fetchSearchMovies(value);

        data.then((result) => {
            setSearchResult(result?.data?.results);
        })
    }

    const handleChange = (value) => {
        setInput(value);
        fetchData(value);
        setIsSearchOpen(true);
    };

    const handleSearchClick = (id) => {
        Router.push(`/Moviedetail/${id}`);
    };

    const handleChangeClose = () => {
        setIsSearchOpen(false);
    };

    useEffect(() => {
        window.addEventListener('click', handleChangeClose);
        return () => {
            window.removeEventListener('click', handleChangeClose);
        };
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', scrollHeader);
        
        return() => (
            window.addEventListener('scroll',scrollHeader)
        )
    }, [])

    useEffect(() => {
        let session = [];
        session = Session();

        session.then((result) => {
            setSessions(result);
        })
    }, []);
    
    useEffect(() => {
        setLocalProfile(sessions?.user)
        setProfile(sessions?.user);
    }, [sessions]);

    const logout = () => {
        handleMenuClose();
        sessionStorage.clear();
        Router.push("/api/auth/signout?callbackUrl=/");
    };

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const renderMenu = (
        <Menu
            sx={{ mt: '45px' }}
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id="Account"
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>
                <Link href="/Profile">Profile</Link>
            </MenuItem>
            <MenuItem onClick={logout}>Logout</MenuItem>
        </Menu>
    );


    const renderLoginState = () => {
        if (sessions?.user !== undefined) {
            return (
                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <div className="grid grid-rows-2 relative items-center self-center">
                        <Search className="flex self-center drop-shadow-lg absolute top-2 right-10">
                            <SearchIconWrapper className="self-center">
                            <SearchIcon sx={{color: 'white'}} className="self-center"/>
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                                sx={{color: 'white'}}
                                className="self-center drop-shadow-lg"
                                onChange={(e) => handleChange(e.target.value)}
                            />
                        </Search>
                        {isSearchOpen ? 
                            <div className='absolute top-20 right-20'>
                                <List
                                    sx={{
                                        width: '100%',
                                        maxWidth: 400,
                                        position: 'relative',
                                        overflow: 'auto',
                                        maxHeight: 300,
                                        '& ul': { padding: 0 },
                                    }}
                                    className="bg-transparent"
                                    onClose={handleChangeClose}
                                    subheader={<li />}
                                >
                                    {searchResult?.map((result, index) => (
                                        <ListItem key={index} className="text-white drop-shadow-lg cursor-pointer">
                                            <div className="flex bg-white/20 rounded-sm" onClick={() => handleSearchClick(result.id)}>
                                                <img src={`https://image.tmdb.org/t/p/original${result && result.poster_path}`} alt={result.original_title && result.original_title} className="drop-shadow-lg rounded-sm max-w-24" />
                                                <span className="ml-2 mr-2 drop-shadow-lg">{result.original_title && result.original_title}</span>
                                            </div>
                                        </ListItem>
                                    ))}
                                </List>
                            </div>
                        : null}
                    </div>
                    <IconButton
                        size="large"
                        edge="end"
                        aria-label="account of current user"
                        aria-controls="Account"
                        aria-haspopup="true"
                        onClick={handleProfileMenuOpen}
                        sx={{color: 'white'}}
                        className="drop-shadow-lg"
                    >
                    <div className="text-white text-2xl rounded-full size-10 relative overflow-hidden self-center outline outline-2 outline-white drop-shadow-lg">
                        <img src={profilePicture} alt="profile picture" className="absolute inset-0 w-full h-full object-cover drop-shadow-lg" />
                    </div>
                    </IconButton>
                </Box>
            );
        }

        return <Link href="/api/auth/signin" className="self-center pl-3" >
            <button className="bg-white/5 text-white p-2 rounded-md hover:bg-white/15">Login</button>
        </Link>;
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" color="transparent" className={header ? "shadow-none bg-black css-10srjip-MuiPaper-root-MuiAppBar-root" :"shadow-none bg-transparent css-10srjip-MuiPaper-root-MuiAppBar-root"}>
                <Toolbar className="mt-0">
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ display: { xs: 'none', sm: 'block' } }}
                    className="pr-6 text-white drop-shadow-lg"
                >
                    Nashki Movie DB
                </Typography>
                <Box sx={{ display: { xs: 'none', sm: 'block' } }} className="flex space-x-4">
                    {pages.map((page) => (
                    <Button key={page.name} sx={{color: 'white'}} className="drop-shadow-lg">
                        <Link href={page.link}>{page.name}</Link>
                    </Button>
                    ))}
                </Box>
                <Box sx={{ flexGrow: 1 }} />
                {renderLoginState()}
                </Toolbar>
            </AppBar>
            {renderMenu}
        </Box>
    )
}

export default Nav;
