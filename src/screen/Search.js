import React, { useState } from 'react';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { favoritesState } from '../atom';
import { Card } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import { FaHeart } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";


function Search() {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [favorites, setFavorites] = useRecoilState(favoritesState);
  const navigate = useNavigate();

  // Function to remove "Collection" from string
  function remove_collection(string) {
    return string.replace('Collection', '');
  }

  const handleSearch = () => {
    setLoading(true);

    const apiUrl = 'https://api.themoviedb.org/3/search/collection';
    const apiKey = process.env.REACT_APP_API; // Replace with your actual API key

    axios
      .get(apiUrl, {
        params: {
          include_adult: false,
          language: 'en-US',
          page: 1,
          query: searchText,
          api_key: apiKey,
        },
      })
      .then(response => {
        setSearchResults(response.data.results);
        setLoading(false);
        if (response.data.results.length === 0) {
          setShowModal(true);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        setLoading(false);
      });
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const addToFavorites = movie => {
    const favoriteMovies = [...favorites, movie];
    setFavorites(favoriteMovies);
    localStorage.setItem('favorites', JSON.stringify(favoriteMovies));
  };

  const isFavorite = movieId => {
    return favorites.some(movie => movie.id === movieId);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="mb-4 flex">
        <input
          type="text"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          className="w-full px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search for movies..."
        />
        <button
          className="ml-2 px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : searchResults.length > 0 ? (
        <div>
          <h2 className="text-xl font-bold mb-4">Search Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {searchResults.map(movie => (
              <Card key={movie.id} className="bg-white rounded-md shadow-md">
                <div className="relative">
                  <img
                    src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                    alt={movie.original_name}
                    className="w-full rounded-t-md"
                  />
                  <div className="absolute top-2 right-2">
                    <h3
                      className={`text-white font-bold ${
                        movie.vote_average > 6.5 ? 'text-green-500' : 'text-red-500'
                      }`}
                    >
                      {console.log(movie)}
                      {movie.vote_average}
                    </h3>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-2">Collection - {movie.name}</h3>
                  <h3 className="text-lg font-bold mb-2"> {remove_collection(movie.original_name)}</h3>
                  <p className="text-gray-600">{movie.release_date}</p>

                  <div className="">
                  <span className="flex justify-between items-center">
                  <button
                    className={`mt-4 px-4 py-2 ${
                      isFavorite(movie.id)
                        ? "bg-gradient-to-r from-purple-500 to-pink-500"
                        : "bg-blue-500"
                    } text-white rounded-md`}
                    onClick={() => addToFavorites(movie)}
                  >
                    {isFavorite(movie.id) ? (
                      <FaHeart />
                    ) : (
                      <AiOutlineLike />
                    )}
                  </button>
                  <button
                    className={`mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-gradient-to-r from-purple-500 to-pink-500`}
                    onClick={() =>
                      navigate("/movieinfo", {
                        state: {
                          id: movie.id,
                          backdrop_path: movie.backdrop_path,
                          poster_path: movie.poster_path,
                          original_title: movie.original_title,
                          vote_average: movie.vote_average,
                          vote_count: movie.vote_count,
                          popularity: movie.popularity,
                          release_date: movie.release_date,
                          overview: movie.overview,
                          tagline: movie.tagline,
                        },
                      })
                    }
                  >
                    Info
                  </button>
                </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <p>No search results found.</p>
      )}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4">
            <p>No search results found.</p>
            <button
              className="mt-4 px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;
