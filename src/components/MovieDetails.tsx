import React from 'react';
import { Movie, Rating } from '../types';
import StarRatings from './StarRatings';
import { FaFilm } from "react-icons/fa";
import '../styles/movieDetails.css';

interface MovieDetailsProps {
  movie: Movie | null;
  ratings: Rating | null;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ movie, ratings }) => {
  if (!movie) {
    return (
      <div className="movie-details-container">
        <div className="no-movie-selected">
          <FaFilm className="icon" aria-label="film icon" />
          <h4>No Movie Selected</h4>
          <p>Please select a movie to see details.</p>
        </div>
      </div>
    );
  }

  const { title, opening_crawl, director, producer, release_date, episode_id } = movie;

  const convertToRoman = (num: number): string => {
    const romanNumerals = [
      { value: 10, numeral: 'X' },
      { value: 9, numeral: 'IX' },
      { value: 5, numeral: 'V' },
      { value: 4, numeral: 'IV' },
      { value: 1, numeral: 'I' },
    ];

    let result = '';
    for (const { value, numeral } of romanNumerals) {
      while (num >= value) {
        result += numeral;
        num -= value;
      }
    }
    return result;
  };

  return (
    <div className="movie-details-container">
    <h2 className="movie-details-title movie-details-title-lg">
      Episode {convertToRoman(episode_id)} - {title}
    </h2>
    <div className="movie-details-content">
      {ratings?.Poster && (
        <img src={ratings.Poster} alt={title} className="movie-poster" />
      )}
      <div className="movie-description">{opening_crawl}</div>
    </div>
    {ratings && (
      <div className="movie-additional-info">
        <p>
          <span>Directed by:</span> {director}
        </p>
        <p>
          <span>Produced by:</span> {producer}
        </p>
        <p>
          <span>Release Year:</span> {new Date(release_date).getFullYear()}
        </p>
        <StarRatings ratings={ratings} />
      </div>
    )}
  </div>
  );
};

export default MovieDetails;
