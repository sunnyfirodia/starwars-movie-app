import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import StarRatings from '../components/StarRatings';

interface Ratings {
  average: number;
  imdb: number;
  rottenTomatoes: number;
  metacritic: number;
}

const mockRatings: Ratings = {
  average: 8.7,
  imdb: 8.6,
  rottenTomatoes: 95,
  metacritic: 90,
};

describe('StarRatings Component', () => {
  test('renders stars for average rating', () => {
    render(<StarRatings ratings={mockRatings} />);

    const fullStars = screen.queryAllByText('★');
    expect(fullStars.length).toBe(9);

    const halfStars = screen.queryAllByText('☆');
    expect(halfStars.length).toBe(1);
  });

  test('renders N/A when average rating is 0 or not provided', () => {
    const emptyRatings: Ratings = {
      average: 0,
      imdb: 0,
      rottenTomatoes: 0,
      metacritic: 0,
    };
    render(<StarRatings ratings={emptyRatings} />);
    
    expect(screen.getByText('N/A')).toBeInTheDocument();
  });

  test('renders IMDb, Rotten Tomatoes, and Metacritic ratings', () => {
    render(<StarRatings ratings={mockRatings} />);
    
    expect(screen.getByText('IMDb: 8.6')).toBeInTheDocument();
    expect(screen.getByText('Rotten Tomatoes: 95%')).toBeInTheDocument();
    expect(screen.getByText('Metacritic: 90')).toBeInTheDocument();
  });

  test('renders N/A for missing IMDb, Rotten Tomatoes, and Metacritic ratings', () => {
    const emptyRatings: Ratings = {
      average: 0,
      imdb: 0,
      rottenTomatoes: 0,
      metacritic: 0,
    };
    render(<StarRatings ratings={emptyRatings} />);
    
    expect(screen.getByText('IMDb: N/A')).toBeInTheDocument();
    expect(screen.getByText('Rotten Tomatoes: N/A')).toBeInTheDocument();
    expect(screen.getByText('Metacritic: N/A')).toBeInTheDocument();
  });
});
