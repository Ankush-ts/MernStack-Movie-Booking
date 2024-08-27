import { Button, FormLabel, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails, newBooking } from "../../api-helpers/api-helpers";
import { toast } from 'react-toastify';

const Booking = () => {
  const [movie, setMovie] = useState();
  const [inputs, setInputs] = useState({ seatNumber: "", date: "" });
  const id = useParams().id;
  console.log(id);

  useEffect(() => {
    getMovieDetails(id)
      .then((res) => setMovie(res.movie))
      .catch((err) => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    newBooking({ ...inputs, movie: movie._id })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
      toast.success("Booking Succesfull....👍");
  };

  console.log(inputs);

  return (
    <div>
      {movie && <Fragment>
        <Typography padding={3}
          fontFamily={"fantasy"}
          variant="h4"
          textAlign={'center'}>
          Book Tickets of: {movie.title}

        </Typography>

        <Box display={'flex'} justifyContent={'center'}>
          <Box
            display={'flex'}
            flexDirection={'column'}
            paddingTop={3}
            width={'50%'}
            marginRight={'auto'}>
            <img src={movie.posterUrl}
              alt={movie.title}
              width={'50%'}
              height={'300px'} />
            <Box
              width={'80%'}
              mt={3}
              padding={2}>
              <Typography padding={2}>
                {movie.description}
              </Typography>
              <Typography fontWeight={'bold'} mt={1}>
                Starrer: {movie?.actors.map((actor) => actor + ", ")}
              </Typography>
              <Typography fontWeight={'bold'} mt={1}>
                Release Date: {new Date(movie.releaseDate).toDateString()}
              </Typography>

            </Box>

          </Box>
          <Box width={'50%'} mt={3}>
            <form onSubmit={handleSubmit}>
              <Box padding={5}
                margin={'auto'}
                display={'flex'}
                flexDirection={'column'}>

                <FormLabel>Seat Number</FormLabel>
                <TextField
                  value={inputs.seatNumber}
                  onChange={handleChange}
                  name="seatNumber"
                  type="number"
                  margin="normal"
                  variant="standard" />

                <FormLabel>Booking Date</FormLabel>
                <TextField
                  value={inputs.date}
                  onChange={handleChange}
                  name="date"
                  type="date"
                  margin="normal"
                  variant="standard" />
                <Button type="submit" sx={{ mt: 3 }} >
                  Book Now
                </Button>
              </Box>
            </form>

          </Box>


        </Box>
      </Fragment>}
    </div>
  )
}
export default Booking;