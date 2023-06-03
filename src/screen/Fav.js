import React, { useState, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { favoritesState } from '../atom';
import { Card } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';

function Fav() {
  const favorites = useRecoilValue(favoritesState);
  const setFavorites = useSetRecoilState(favoritesState);
  const [filteredFavorites, setFilteredFavorites] = useState([]);
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setFilteredFavorites([...favorites]);
  }, [favorites]);

  const handleDelete = (movieId) => {
    // Remove the movie from favorites list
    const updatedFavorites = favorites.filter((movie) => movie.id !== movieId);
    setFilteredFavorites([...updatedFavorites]);
    setFavorites([...updatedFavorites]); // Update the Recoil atom
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites)); // Update local storage
  };

  const handleSearch = (e) => {
    // Filter favorites based on search text
    const searchValue = e.target.value.toLowerCase();
    setSearchText(searchValue);
    const filteredMovies = favorites.filter(
      (movie) =>
        movie.title.toLowerCase().includes(searchValue) ||
        movie.overview.toLowerCase().includes(searchValue)
    );
    setFilteredFavorites([...filteredMovies]);
  };

  const handleClearFavorites = () => {
    // Clear all favorites
    setFilteredFavorites([]);
    setFavorites([]);
    localStorage.removeItem('favorites');
  };

  return (
    <div className="w-screen   bg-black mx-auto bg-black">
      <div className='px-1 pl-11 mr-2 py-24 '>
      <h2 className="text-lg font-semibold mb-4 text-white">Favorite Movies</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search"
          value={searchText}
          onChange={handleSearch}
          className="p-2 border border-gray-300 rounded"
        />
      </div>
      {filteredFavorites.length > 0 ? (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredFavorites.map((movie) => (
            <Card key={movie.id} className="mb-1 p-1 bg-white shadow w-52">
              <div className="flex flex-col md:flex-row">
                <div>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-40 h-auto mr-4"
                  />
                  <div className="md:mt-0 mt-4">
                    <h3 className="text-xl font-semibold mb-2">{movie.title}</h3>
                  </div>
                </div>
              </div>
              <div className="flex mt-4">
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded"
                  onClick={() => handleDelete(movie.id)}
                >
                  Delete
                </button>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded ml-2"
                  onClick={() =>
                    navigate('/movieinfo', {
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
                  More Info
                </button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <p className='text-white text-5xl'>No favorite movies found.</p>
      )}
      {favorites.length > 0 && (
        <div className="mt-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleClearFavorites}
          >
            Clear Favorites
          </button>
        </div>
      )}
      </div>
    </div>
  );
}

export default Fav;
