import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const BASE_URL = `https://api.themoviedb.org/3`;

function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const navigate = useNavigate();

      useEffect(() => {
        async function fetchMovieDetails() {
          const response = await axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
          setMovie(response.data);
          console.log(response.data);
        }
        fetchMovieDetails();
      }, [id]);

      if (!movie) {
        return <div>Loading...</div>;
      }

      return (
        <div>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="w-full h-full object-cover rounded-md mb-4" />
          <h1 className='font-bold'>{movie.title}</h1>
          <p>{movie.overview}</p>
          <p>Release Date: {movie.release_date}</p>
            <div className='flex items-center gap-4'>
                <Link to={`/watch/${id}`}>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded">Watch Now</button>
                </Link>
                <div className='flex'>
                    <button onClick={() => navigate('/')} className="bg-gray-500 text-white px-4 py-2 rounded mt-2">Back to Home</button>
                </div>
            </div>
        </div>
      );
    }

    export default MovieDetails;