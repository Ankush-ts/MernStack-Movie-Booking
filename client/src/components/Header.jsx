import React, { useEffect, useState } from 'react';
import { AppBar, Autocomplete, Box, Tabs, Tab, TextField, Toolbar, IconButton } from '@mui/material';
import MovieIcon from '@mui/icons-material/Movie';
import { getAllMovies } from "../api-helpers/api-helpers";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { adminActions, userActions } from '../store';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
    const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        getAllMovies()
            .then((data) => setMovies(data.movies))
            .catch((err) => console.log(err))
    }, [])

    const [value, setValue] = useState(0);
    const handleSelect = (event, newValue) => {
        setValue(newValue);
    };

    const logout = (isAdmin) => {
        dispatch(isAdmin ? adminActions.logout() : userActions.logout());
    };

    const handleChange = (e, val) => {
        const movie = movies.find((m) => m.title === val);
        if (isUserLoggedIn && movie) {
            navigate(`/booking/${movie._id}`);
        }
    };

    return (
        <AppBar position='sticky' sx={{ bgcolor: "darkolivegreen" }}>
            <Toolbar>
                <Box width={'20%'}>
                    <IconButton
                        component={Link}
                        to="/"
                        onClick={() => setValue(0)}
                    >
                        <MovieIcon />
                    </IconButton>
                </Box>
                <Box width={'30%'} margin={'auto'}>
                    <Autocomplete
                        onChange={handleChange}
                        id="free-solo-demo"
                        freeSolo
                        options={movies?.map((option) => option.title)}
                        renderInput={(params) => (
                            <TextField
                                sx={{ input: { bgcolor: "ghostwhite" } }}
                                variant="standard"
                                {...params}
                                placeholder="Search Movies"
                            />
                        )}
                    />
                </Box>
                <Box display={'flex'}>
                    <Tabs
                        onChange={handleSelect}
                        value={value}
                        textColor='inherit'
                        indicatorColor='secondary'
                    >
                        <Tab component={Link} to="/movies" label="Movies" />
                        {/* Conditional rendering using array syntax with keys */}
                        {(!isAdminLoggedIn && !isUserLoggedIn) && [
                            <Tab key="admin" component={Link} to="/admin" label="Admin" />,
                            <Tab key="user-login" component={Link} to="/auth" label="User Login" />,
                        ]}
                        {isUserLoggedIn && [
                            <Tab key="profile" component={Link} to="/user" label="Profile" />,
                            <Tab
                                key="logout-user"
                                onClick={() => logout(false)}
                                label="Logout"
                                component={Link}
                                to="/"
                            />,
                        ]}
                        {isAdminLoggedIn && [
                            <Tab key="add-movie" component={Link} to="/add" label="Add Movie" />,
                            <Tab key="admin-profile" component={Link} to="/user-admin" label="Profile" />,
                            <Tab
                                key="logout-admin"
                                onClick={() => logout(true)}
                                label="Logout"
                                component={Link}
                                to="/"
                            />,
                        ]}
                    </Tabs>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;