import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "flowbite-react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useRecoilState } from "recoil";
import { favoritesState } from "../atom";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [favorites, setFavorites] = useRecoilState(favoritesState);

  useEffect(() => {
    // Fetch movies from API
    const fetchMovies = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API}&language=en-US&page=${currPage}`
      );
      setMovies((prevMovies) => [...prevMovies, ...res.data.results]);
    };

    fetchMovies();
  }, [currPage]);

  // Fetch more movies
  const fetchMoreMovies = () => {
    setCurrPage((prevPage) => prevPage + 1);
  };

  const navigate = useNavigate();

  const markAsFavorite = (movie) => {
    const favoriteMovies = [...favorites, movie];
    setFavorites(favoriteMovies);
    localStorage.setItem("favorites", JSON.stringify(favoriteMovies));
  };

  const isFavorite = (movieId) => {
    return favorites.some((movie) => movie.id === movieId);
  };

  return (
    <div>
      <InfiniteScroll
        dataLength={movies.length}
        next={fetchMoreMovies}
        hasMore={true} // You can add a condition to stop loading more movies when reaching the end
        loader={<h4>Loading...</h4>}
      >
        <div className="flex flex-wrap justify-center">
          {movies.map((movie) => (
            <Card
              key={movie.id}
              className="w-64 mx-5 my-6 shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1 hover:scale-105"
            >
              <div className="relative">
                <img
                  alt="movie name"
                  src={`https://image.tmdb.org/t/p/w220_and_h330_face${movie.backdrop_path}`}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-2 right-2">
                  <h3
                    className={`text-white font-bold ${
                      movie.vote_average > 6.5 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {movie.vote_average}
                  </h3>
                </div>
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">{movie.title}</h2>
                <p className="text-gray-500">{movie.release_date}</p>
                <span className="flex justify-between items-center">
                  <button
                    className={`mt-4 px-4 py-2 ${
                      isFavorite(movie.id)
                        ? "bg-gradient-to-r from-purple-500 to-pink-500"
                        : "bg-blue-500"
                    } text-white rounded-md`}
                    onClick={() => markAsFavorite(movie)}
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
            </Card>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default MovieList;
