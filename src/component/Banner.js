import React, { useState, useEffect } from 'react';
import { Carousel } from 'flowbite-react';
import axios from 'axios';
import { useSpring, animated } from 'react-spring';

function Banner() {
  // State for trending movies
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    // Fetch trending movies from API
    const fetchTrendingMovies = async () => {
      try {
        //its public API
        const response = await axios.get(
          'https://api.themoviedb.org/3/trending/all/day?language=en-US',
          {
            headers: {
              'Accept': 'application/json',
              'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZTUwNjg5NGNiMzJhNmUwZTRjMTJlMTkwYzNlYjNjZiIsInN1YiI6IjY0N2FkYjg5MTc0OTczMDBkZTY2MjBjOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vbarT2ZF5WYjN2pkSLxmhceFobgQpD4dzW-BAJthbFM',
            },
          }
        );
        setTrendingMovies(response.data.results);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchTrendingMovies();
  }, []);

  // Animation for caption
  const captionAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(50%)' },
    to: { opacity: 1, transform: 'translateY(0%)' },
    config: { duration: 800 },
  });

  return (
    <div className="flex justify-center py-9 w-screen px-5">
      <Carousel>
        {trendingMovies.map((movie, index) => (
          <div key={index} className="carousel-item relative w-full">
            <img
              className="w-full h-64 sm:h-80 md:h-96 object-cover"
              src={`https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${movie.backdrop_path}`}
              alt={movie.title}
            />

            {/* Animated caption */}
            <animated.div
              style={captionAnimation}
              className="carousel-caption d-none d-md-block banner-intro absolute bottom-0 left-0 right-0 p-6 bg-gray-900 bg-opacity-70 text-white"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">{movie.title}</h2>
              <p className="text-lg hidden sm:block sm:text-xl md:text-2xl">{movie.overview}</p>
            </animated.div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default Banner;
