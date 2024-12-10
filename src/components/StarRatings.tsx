import React from "react";
import '../styles/starRatings.css';

interface Ratings {
  imdb: number;
  rottenTomatoes: number;
  metacritic: number;
  Poster?: string;
  average: number;
}

interface StarRatingsProps {
  ratings: Ratings;
}

const StarRatings: React.FC<StarRatingsProps> = ({ ratings }) => {
  const generateStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 10 - fullStars - halfStar;

    return (
      <>
        {Array(fullStars)
          .fill('')
          .map((_, index) => (
            <span key={`full-${index}`} className="star-full">★</span>
          ))}
        {halfStar === 1 && <span className="star-half">☆</span>}
        {Array(emptyStars)
          .fill('')
          .map((_, index) => (
            <span key={`empty-${index}`} className="star-empty">★</span>
          ))}
      </>
    );
  };

  return (
    <>
        <div className="rating-container">
            <div className="stars">
              {ratings.average > 0 ? generateStars(ratings.average) : <span className="no-rating"></span>}
            </div>
            <div className="rating-chips-container">
              <span className="rating-chip">
                IMDb: <span>{ratings.imdb > 0 ? `${ratings.imdb.toFixed(1)}` : 'N/A'}</span>
              </span>
              <span className="rating-chip">
                Rotten Tomatoes: <span>{ratings.rottenTomatoes > 0 ? `${ratings.rottenTomatoes}%` : 'N/A'}</span>
              </span>
              <span className="rating-chip">
                Metacritic: <span>{ratings.metacritic > 0 ? `${ratings.metacritic}%` : 'N/A'}</span>
              </span>
            </div>
      </div>
    </>
  );
};

export default StarRatings;
