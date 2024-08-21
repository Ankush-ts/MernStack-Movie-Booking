import React, { useEffect, useState } from 'react';
import { AppBar, Autocomplete, Box, Tabs, Tab, TextField, Toolbar, IconButton } from '@mui/material'
import MovieIcon from '@mui/icons-material/Movie';
import { getAllMovies } from "../api-helpers/api-helpers"
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { adminActions, userActions } from '../store';

const Header = () => {
    const navigate=useNavigate();
    const dispatch = useDispatch();
    const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
    const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        getAllMovies()
            .then((data) => setMovies(data.movies))
            .catch((err) => console.log(err))
    }, [])

    // console.log(movies)


    const [value, setValue] = useState(0);
    const handleSelect = (event, newValue) => {
        setValue(newValue);
    };

    const logout = (isAdmin) => {
        dispatch(isAdmin? adminActions.logout() : userActions.logout());
    };

    const handleChange = (e,val)=>{
       
        const movie = movies.find((m)=> m.title === val);
        if(isUserLoggedIn){
            navigate(`/booking/${movie._id}`);
        }
    };
    return (
        <AppBar position='sticky' sx={{ bgcolor: "darkolivegreen" }}>
            <Toolbar>
                <Box width={'20%'}>
                    <IconButton LinkComponent={Link} to={"/"}
                    onClick={() => setValue(0)}>
                    <MovieIcon  />
                    </IconButton>
                    
                </Box>
                <Box width={'30%'} margin={'auto'}>
                    <Autocomplete
                    onChange={handleChange}
                        id="free-solo-demo"
                        freeSolo
                        options={movies?.map((option) => option.title)}
                        renderInput={(params) => <TextField
                            sx={{ input: { bgcolor: "ghostwhite" } }}
                            variant="standard"
                            {...params} placeholder="Search Movies" />}
                    />
                </Box>
                
                <Box display={'flex'}>
                    <Tabs
                        onChange={handleSelect}
                        value={value}
                        textColor='inherit'
                        indicatorColor='secondary'>
                        <Tab LinkComponent={Link} to="/movies" label={"Movies"} />
                            {/* Conditional rendering using array syntax */}
                            {(!isAdminLoggedIn && !isUserLoggedIn) && [
                            <Tab LinkComponent={Link} to="/admin" label={"Admin"} />,
                            <Tab LinkComponent={Link} to="/auth" label={"User Login"} />,
                        ]}
                        {isUserLoggedIn && [
                            <Tab LinkComponent={Link} to="/user" label={"Profile"} />,
                            <Tab onClick={() => logout(false)} label={"Logout"} LinkComponent={Link} to="/" />,
                        ]}
                        {isAdminLoggedIn && [
                            <Tab LinkComponent={Link} to="/add" label={"Add Movie"} />,
                            <Tab LinkComponent={Link} to="/user-admin" label={"Profile"} />,
                            <Tab onClick={() => logout(true)}   
                                label={"Logout"} LinkComponent={Link} to="/" />,
                        ]}
                    </Tabs>
                </Box>

            </Toolbar>

        </AppBar>
    );
};

export default Header;

// import React from "react";
// import './Header.css'
// import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { adminActions, userActions } from '../store';

// const Header = () => {
//   const dispatch = useDispatch();
//   const IsAdminLogegedIn = useSelector((state) => state.admin.IsLogegedIn);
//   const IsUserLogegedIn = useSelector((state) => state.user.IsLogegedIn);

//   const logout = (isAdmin) => {
//     dispatch(isAdmin ? adminActions.logout() : userActions.logout());
    
//   };
//   return (
//     <div className="header">
//       <div className="headerLeft">
//         <Link to="/">
//           <img
//             className="header__icon"
//             src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png"
//           />
//         </Link>
//         <Link to="/movies" style={{ textDecoration: "none" }}>
//           <span>MOVIES</span>
//         </Link>
//         {!IsAdminLogegedIn && !IsUserLogegedIn && (
//           <>
//             <Link to="/admin " style={{ textDecoration: "none" }}>
//               <span>ADMIN</span>
//             </Link>
//             <Link to="/auth" style={{ textDecoration: "none" }}>
//               <span>AUTH</span>
//             </Link>
//           </>
//         )}

//         {IsUserLogegedIn && (
//           <>
//             <Link to="/user " style={{ textDecoration: "none" }}>
//               <span>PROFILE</span>
//             </Link>
//             <Link
//               to="/"
//               onClick={() => logout(false)}
//               style={{ textDecoration: "none" }}
//             >
//               <span>LOGOUT</span>
//             </Link>
//           </>
//         )}
//         {IsAdminLogegedIn && (
//           <>
//             <Link to="/add " style={{ textDecoration: "none" }}>
//               <span>ADD MOVIE</span>
//             </Link>
//             <Link to="/admin" style={{ textDecoration: "none" }}>
//               <span>PROFILE</span>
//             </Link>
//             <Link   onClick={() => logout(true)}  to="/" style={{ textDecoration: "none" }}>
//               <span>LOGOUT</span>
//             </Link>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Header;