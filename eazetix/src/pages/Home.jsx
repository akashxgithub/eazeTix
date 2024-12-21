import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LazyLoad from 'react-lazyload';
import { Link } from 'react-router-dom';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

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

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} min-h-screen`}>
      <header className="flex justify-between items-center px-6 py-4">
        <h1 className="text-3xl font-bold text-red-700">EazeTix</h1>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search movies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`px-4 py-2 rounded-md text-sm ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'}`}
            style={{ width: '200px' }}
          />
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600"
          >
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </header>

      {loading ? (
        <div className="mt-10 text-center">Loading...</div>
      ) : (
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 px-6">
          {filteredMovies.map((movie) => (
            <div
              key={movie.id}
              className={`shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 mx-auto ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              }`}
              style={{ width: '250px', height: '450px' }}
            >
              <LazyLoad height={400} offset={100}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-72 object-cover"
                />
              </LazyLoad>
              <div className="p-3 flex flex-col justify-between h-32">
                <h2
                  className="text-xs font-semibold text-gray-800 dark:text-gray-100 overflow-hidden"
                  style={{
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 2,
                    overflow: 'hidden',
                  }}
                  title={movie.title}
                >
                  {movie.title}
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {movie.original_language.toUpperCase()} | {movie.adult ? 'U/A' : 'U'}
                </p>
                <Link
                  to={`/movie/${movie.id}`}
                  className="mt-2 bg-blue-500 text-white text-xs py-1 px-2 rounded hover:bg-blue-600 text-center"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
