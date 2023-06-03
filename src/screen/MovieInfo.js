import React from 'react';
import { useLocation } from 'react-router-dom';

const MoreInfo = () => {
  const { state } = useLocation();
  const {
    id,
    overview,
    release_date,
    popularity,
    vote_count,
    vote_average,
    original_title,
    poster_path,
    backdrop_path,
    tagline,
  } = state;

  return (
    <div className="bg-black">
      <div className="w-full">
        <img
          className="w-full h-96 object-cover object-center"
          src={`https://image.tmdb.org/t/p/original${backdrop_path}`}
          alt="img"
        />
      </div>
      <div className="flex justify-center -mt-7 pb-4">
        <div className="w-full sm:w-3/4 lg:w-1/2 xl:w-1/3 bg-white shadow-lg rounded-md mt--36 mx-6 sm:mx-0">
          <div className="flex items-center justify-between px-4 py-6">
            <div>
              <h1 className="text-3xl font-bold text-black">{original_title}</h1>
              <p>{tagline}</p>
              <div className="flex items-center">
                <p className="mr-1">{vote_average}</p>
                <i className="fas fa-star text-yellow-500" />
                <span className="ml-1">({vote_count} votes)</span>
              </div>
              <p>Total Collection: {popularity} Cr.</p>
              <p>Release date: {release_date}</p>
            </div>
            <div className="w-48">
              <img
                className="w-full"
                src={`https://image.tmdb.org/t/p/original${poster_path}`}
                alt="poster"
              />
            </div>
          </div>
          <div className="px-4 py-6">
            <h2 className="text-2xl font-bold mb-4">Synopsis</h2>
            <p>{overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoreInfo;
