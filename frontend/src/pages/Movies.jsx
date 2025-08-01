import { useEffect, useState } from "react"
import { fetchMovies } from "../Api/useFetch"
import { Link } from "react-router-dom";


export default function Movies() {
  const [movies, setMovies] = useState([]);
 
  useEffect(() => {
    const getMovies = async () => {
      const moviesData = await fetchMovies();
      setMovies(moviesData);
    };
    getMovies();
  }, []); 

  return (
    <section className="fixed pb-40 w-full h-full p-4 overflow-scroll">
      <h2 className="text-2xl mb-4">Movies</h2>
      <div>
        <ul className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 min-h-[450px] justify-center">
          {movies.map((movie) => (
            <li key={movie.id} className="">
              <Link to={`/movie/${movie.id}`} className="block">
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                     alt={movie.title} 
                     className="w-full h-auto rounded-lg relative hover:scale-105 transition-transform duration-200 cursor-pointer" />
                <span>{movie.release_date || movie.first_air_date}</span>
              </Link>
              <h3 className="text-lg text-white mt-2">{movie.title || movie.name}</h3>
              <p className="text-sm text-gray-400 text-ellipsis line-clamp-3">{movie.overview}</p>
              <Link to={`/movies/${movie.id}`}>
                <button className="mt-2">
                  <span className="text-white bg-gradient-to-l from-purple-900 to bg-pink-500 px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-600 transition-colors">
                    Play Now
                  </span>
                </button>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
