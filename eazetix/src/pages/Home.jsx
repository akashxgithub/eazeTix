import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LazyLoad from 'react-lazyload';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiKey = 'f97044d9ea249d273a838a6ac0e8df2f';
    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`;

    const fetchMovies = async () => {
      try {
        const response = await axios.get(url);
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="text-center py-10 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-red-700">EazeTix</h1>
      <p className="mt-4 text-gray-600">Destination to book your visual treats!</p>

      {loading ? (
        <div className="mt-10 text-gray-700">Loading...</div>
      ) : (
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 max-w-sm mx-auto"
            >
              <LazyLoad height={400} offset={100}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-96 object-cover"
                />
              </LazyLoad>
              <div className="p-3">
                <h2 className="text-sm font-semibold text-gray-800 truncate">{movie.title}</h2>
                <p className="text-xs text-gray-500 mt-1">
                  {movie.original_language.toUpperCase()} | {movie.adult ? 'U/A' : 'U'}
                </p>
                <button
                  className="mt-3 bg-blue-500 text-white text-sm py-1 px-3 rounded hover:bg-blue-600"
                  onClick={() => alert(`Book tickets for ${movie.title}!`)}
                >
                  Book Tickets
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
