import React, { Fragment, useEffect, useState } from 'react';
import { deleteBooking, getUserBooking, getUserDetails } from '../api-helpers/api-helpers';
import { Box, IconButton, List, ListItem, ListItemText, Typography } from '@mui/material';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { toast } from 'react-toastify';


const UserProfile = () => {
    const [bookings, setBookings] = useState([]);
    const [user, setUser] = useState();

    useEffect(() => {
        getUserBooking()
            .then((res) => setBookings(res.bookings))
            .catch((err) => console.log(err));

        getUserDetails()
            .then((res) => setUser(res.user))
            .catch((err) => console.log(err));
    }, []);

    const handleDelete = (id) => {
        deleteBooking(id)
            .then((res) => {
                console.log(res);
                // Update the bookings state by filtering out the deleted booking
                setBookings((prevBookings) =>
                    prevBookings.filter((booking) => booking._id !== id)
                );
            })
            .catch((err) => console.log(err));
            toast.success("Booking Deleted Succesfully..");
            
    };

    return (
        <Box width={"100%"} display="flex">
            <>
                {user && (
                    <Box
                        flexDirection={"column"}
                        justifyContent="center"
                        alignItems={"center"}
                        width={"30%"}
                        padding={3}
                    >
                        <AccountCircleIcon
                            sx={{ fontSize: "10rem", textAlign: "center", ml: 3 }}
                        />
                        <Typography
                            padding={1}
                            width={"auto"}
                            textAlign={"center"}
                            border={"1px solid #ccc"}
                            borderRadius={6}
                        >
                            Name: {user.name}
                        </Typography>

                        <Typography
                            mt={1}
                            padding={1}
                            width={"auto"}
                            textAlign={"center"}
                            border={"1px solid #ccc"}
                            borderRadius={6}
                        >
                            Email: {user.email}
                        </Typography>
                    </Box>
                )}
                {bookings && (
                    <Box width={'70%'} display={'flex'} flexDirection={'column'}>
                        <Typography
                            variant='h3'
                            fontFamily={'cursive'}
                            textAlign={'center'}
                            padding={2}
                        >
                            Bookings
                        </Typography>
                        <Box margin={'auto'} display={'flex'}
                            flexDirection={'column'}
                            width={'80%'} >
                            <List>
                                {bookings.map((booking, i) =>
                                    <ListItem
                                        key={i}
                                        sx={{
                                            bgcolor: "#00d386",
                                            color: "white",
                                            textAlign: "center",
                                            margin: 1,
                                        }}>
                                        <ListItemText sx={{ margin: 1, width: "auto", textAlign: "left" }}>
                                            Movie: {booking.movie.title}
                                        </ListItemText>
                                        <ListItemText
                                            sx={{ margin: 1, width: "auto", textAlign: "left" }}
                                        >
                                            Seat: {booking.seatNumber}
                                        </ListItemText>
                                        <ListItemText
                                            sx={{ margin: 1, width: "auto", textAlign: "left" }}
                                        >
                                            Date: {new Date(booking.date).toDateString()}
                                        </ListItemText>
                                        <ListItemText>
                                            <IconButton
                                                onClick={() => handleDelete(booking._id)}
                                                color='error'>
                                                <DeleteForeverIcon />
                                            </IconButton>
                                        </ListItemText>

                                    </ListItem>
                                )}
                            </List>
                        </Box>
                    </Box>
                )}
            </>
        </Box>
    );
};

export default UserProfile;