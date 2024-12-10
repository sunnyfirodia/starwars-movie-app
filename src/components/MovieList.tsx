import React, { useState, useEffect } from "react";
import { Movie } from "../types";
import '../styles/movieList.css';

interface MovieListProps {
  movies: Movie[];
  onSelectMovie: (movie: Movie) => void;
}

const MovieList: React.FC<MovieListProps> = ({ movies, onSelectMovie }) => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (movies.length > 0) {
      setLoading(false);
    }
  }, [movies]);

  
  return (
    <div className="movie-list-container">
      <h2 className="movie-list-title movie-list-title-lg">Movies</h2>
      {loading ? (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) : (
        <ul className="movie-list">
          {movies.map((movie) => (
            <li
              key={movie.episode_id}
              className="movie-item"
              onClick={() => onSelectMovie(movie)}
            >
              <div className="movie-details">
                <span>Episode {movie.episode_id}</span>
                <h4>{movie.title}</h4>
              </div>
              
              <div className="movie-details">
                   <span>{new Date(movie.release_date).toISOString().split('T')[0]}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieList;
