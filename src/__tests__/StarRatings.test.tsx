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

    const fullStars = screen.queryAllByText('★', { selector: '.star-full' });
    expect(fullStars.length).toBe(8);

    const halfStars = screen.queryAllByText('☆', { selector: '.star-half' });
    expect(halfStars.length).toBe(1);

    const emptyStars = screen.queryAllByText('★', { selector: '.star-empty' });
    expect(emptyStars.length).toBe(1);
  });

  test('renders N/A when average rating is 0 or not provided', () => {
    const emptyRatings: Ratings = {
      average: 0,
      imdb: 0,
      rottenTomatoes: 0,
      metacritic: 0,
    };
    render(<StarRatings ratings={emptyRatings} />);
    
    // Check if "N/A" is displayed for average rating
    expect(screen.getByText((content, element) => {
      return element?.textContent === 'IMDb: N/A';
    })).toBeInTheDocument();
  
    expect(screen.getByText((content, element) => {
      return element?.textContent === 'Rotten Tomatoes: N/A';
    })).toBeInTheDocument();
  
    expect(screen.getByText((content, element) => {
      return element?.textContent === 'Metacritic: N/A';
    })).toBeInTheDocument();
  
    // For the stars component, verify "N/A" is displayed when the average is 0
    const noRatingElement = screen.getByText((content, element) => {
      return element?.classList.contains('no-rating') ?? false;
    });
    expect(noRatingElement).toBeInTheDocument();
  });

test('renders IMDb, Rotten Tomatoes, and Metacritic ratings', () => {
  render(<StarRatings ratings={mockRatings} />);
  
  // IMDb rating
  expect(screen.getByText((_, element) => element?.textContent === 'IMDb: 8.6')).toBeInTheDocument();

  // Rotten Tomatoes rating
  expect(screen.getByText((_, element) => element?.textContent === 'Rotten Tomatoes: 95%')).toBeInTheDocument();

  // Metacritic rating
  expect(screen.getByText((_, element) => element?.textContent === 'Metacritic: 90%')).toBeInTheDocument();
});

  

  test('renders N/A for missing IMDb, Rotten Tomatoes, and Metacritic ratings', () => {
    const emptyRatings: Ratings = {
      average: 0,
      imdb: 0,
      rottenTomatoes: 0,
      metacritic: 0,
    };
    render(<StarRatings ratings={emptyRatings} />);
    
    // Use a text matcher function to locate the elements
    expect(screen.getByText((content, element) => {
      return element?.textContent === 'IMDb: N/A';
    })).toBeInTheDocument();
  
    expect(screen.getByText((content, element) => {
      return element?.textContent === 'Rotten Tomatoes: N/A';
    })).toBeInTheDocument();
  
    expect(screen.getByText((content, element) => {
      return element?.textContent === 'Metacritic: N/A';
    })).toBeInTheDocument();
  });
});
