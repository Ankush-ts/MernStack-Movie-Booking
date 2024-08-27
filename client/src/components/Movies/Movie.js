import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getAllMovies } from '../../api-helpers/api-helpers';
import MovieItem from './MovieItem';

const Movie = () => {
    const [movies, setMovies] = useState();
    useEffect(() => {
        getAllMovies()
            .then((data) => setMovies(data.movies)).catch((err) => console.log(err))

    }, [])
    return (
        <Box margin={'auto'} marginTop={4} >

            <Typography variant='h4'
                padding={2}
                textAlign={'center'}
                bgcolor={'#900C3F'}
                color={'white'}
                margin={'auto'}
                width='40%'
            >
                All Movies
            </Typography>
            <Box
                width={'100%'}
                margin={'auto'}
                display={'flex'}
                justifyContent={'center'}
                flexWrap={'wrap'}
                marginTop={4}
            >
                {movies && movies.map((item, i) => (
                    <MovieItem
                        key={i}
                        id={item._id}
                        title={item.title}
                        releaseDate={item.releaseDate}
                        posterUrl={item.posterUrl}
                        description={item.description}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default Movie;