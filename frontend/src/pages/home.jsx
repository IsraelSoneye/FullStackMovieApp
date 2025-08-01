import { fetchMovies, fetchTopRatedMovies, fetchTrendingMovies, fetchTVShows } from "../Api/useFetch";
import { useEffect, useState } from "react";
import {Link, useNavigate} from 'react-router-dom'



export default function home() {
  const [movies, setMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [tvShows, setTVShows] = useState([]);
  const navigate = useNavigate();

    useEffect(() => {
        const getMovies = async () => {
            const moviesData = await fetchMovies();
            setMovies(moviesData);
        };
        getMovies();
    }, []);

    useEffect(() => {
        const getTopRatedMovies = async () => {
            const moviesData = await fetchTopRatedMovies();
            setTopRatedMovies(moviesData);
        };
        getTopRatedMovies();
    }, []);

    useEffect(() => {
        const getTrendingMovies = async () => {
            const moviesData = await fetchTrendingMovies();
            setTrendingMovies(moviesData);
        };
        getTrendingMovies();
    }, []);

        useEffect(() => {
        const getTVShows = async () => {
            const moviesData = await fetchTVShows();
            setTVShows(moviesData);
        };
        getTVShows();
    }, []);

  return (
    <>
      <section className="container mx-auto px-4">
          <div className="">
                <h1 className="text-3xl font-bold text-center my-4">Welcome to IOStv App</h1>
                <p className="text-center mb-8">Explore the latest movies and find your favorites!</p>
                <h2 className="text-2xl">Popular Movies</h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 justify-center">
                    {movies.slice(0,4).map((movie) => (
                        <div key={movie.id} className="bg-white rounded-lg shadow-md p-4">
                            <div>
                                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="w-full h-64 object-cover rounded-md mb-2" />
                                <h2 className="text-xl font-semibold">{movie.title || movie.name}</h2>
                                <p className="text-gray-600">{movie.release_date}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center mt-5 mb-5">
                  <button onClick={()=> navigate('/movie')} className="bg-purple-950 bg-opacity-75 text-white px-4 py-2 rounded w-full hover:bg-purple-700 cursor-pointer transition duration-300">
                    See full list
                  </button>
                </div>
                    {/* Top Rated Movies */}
                <h2 className="text-2xl">Top Rated Movies</h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 justify-center">
                    {topRatedMovies.slice(0,4).map((movie) => (
                        <div key={movie.id} className="bg-white rounded-lg shadow-md p-4">
                            <div>
                                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="w-full h-64 object-cover rounded-md mb-2" />
                                <h2 className="text-xl font-semibold">{movie.title || movie.name}</h2>
                                <p className="text-gray-600">{movie.release_date}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center mt-5 mb-5">
                  <button onClick={()=> navigate('/topRated')} className="bg-purple-950 bg-opacity-75 text-white px-4 py-2 rounded w-full hover:bg-purple-700 cursor-pointer transition duration-300">
                    See full list
                  </button>
                </div>
                    {/* Trending Movies */}
                <h2 className="text-2xl">Trending Movies</h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 justify-center">
                    {trendingMovies.slice(0,4).map((movie) => (
                        <div key={movie.id} className="bg-white rounded-lg shadow-md p-4">
                            <div>
                                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="w-full h-64 object-cover rounded-md mb-2" />
                                <h2 className="text-xl font-semibold">{movie.title || movie.name}</h2>
                                <p className="text-gray-600">{movie.release_date}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center mt-5 mb-5">
                  <button onClick={()=> navigate('/trending')} className="bg-purple-950 bg-opacity-75 text-white px-4 py-2 rounded w-full hover:bg-purple-700 cursor-pointer transition duration-300">
                    See full list
                  </button>
                </div>
                    {/* TVShows */}
                <h2 className="text-2xl">Popular TV Shows</h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 justify-center">
                    {tvShows.slice(0,4).map((movie) => (
                        <div key={movie.id} className="bg-white rounded-lg shadow-md p-4">
                            <div>
                                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="w-full h-64 object-cover rounded-md mb-2" />
                                <h2 className="text-xl font-semibold">{movie.title || movie.name}</h2>
                                <p className="text-gray-600">{movie.release_date}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center mt-5 mb-5">
                  <button onClick={()=> navigate('/tv')} className="bg-purple-950 bg-opacity-75 text-white px-4 py-2 rounded w-full hover:bg-purple-700 cursor-pointer transition duration-300">
                    See full list
                  </button>
                </div>
            </div>
      </section>
    </>
  )
}
