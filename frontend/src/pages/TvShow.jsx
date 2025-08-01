import { fetchTVShows } from "../Api/useFetch"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom";

export default function TvShow() {
  const [tvShows, setTvShows] = useState([]);

  useEffect(() => {
    const getTvShows = async () => {
      const tvShowsData = await fetchTVShows();
      setTvShows(tvShowsData);
    };
    getTvShows();
  }, []);

  return (
    <section className="fixed pb-40 w-full h-full p-4 overflow-scroll">
      <h2 className="text-2xl mb-2 text-center font-bold">TV Shows</h2>
      <p className="text-xl mb-4 text-center">Watch your favourite TV shows</p>
      <div>
        <ul className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 min-h-[450px] justify-center">
          {tvShows.map((show) => (
            <li key={show.id} className="">
              <Link to={`/movie/${show.id}`} className="block">
                <img src={`https://image.tmdb.org/t/p/w500${show.poster_path}`} 
                     alt={show.name} 
                     className="w-full h-auto rounded-lg relative hover:scale-105 transition-transform duration-200 cursor-pointer" />
                <span>{show.first_air_date}</span>
              </Link>
              <h3 className="text-lg text-white mt-2">{show.name}</h3>
              <p className="text-sm text-gray-400 text-ellipsis line-clamp-3">{show.overview}</p>
              <Link to={''}>
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
