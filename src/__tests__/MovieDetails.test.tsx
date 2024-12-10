import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MovieDetails from '../components/MovieDetails';

interface Movie {
  episode_id: number;
  title: string;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
}

interface Rating {
  imdb: number;
  rottenTomatoes: number;
  metacritic: number;
  average: number;
  Poster?: string;
}

const mockMovie: Movie = {
  episode_id: 4,
  title: 'A New Hope',
  opening_crawl: 'It is a period of civil war...',
  director: 'George Lucas',
  producer: 'Gary Kurtz, Rick McCallum',
  release_date: '1977-05-25',
};

const mockRatings: Rating = {
  imdb: 8.6,
  rottenTomatoes: 95,
  metacritic: 90,
  average: 8.7,
  Poster: 'https://via.placeholder.com/150',
};

describe('MovieDetails Component', () => {
  test('renders the message when no movie is selected', () => {
    render(<MovieDetails movie={null} ratings={null} />);
    expect(screen.getByText('Please select a movie to see details.')).toBeInTheDocument();
  });

  test('renders the movie title and episode number in Roman numerals', () => {
    render(<MovieDetails movie={mockMovie} ratings={null} />);
    expect(screen.getByText('Episode IV - A New Hope')).toBeInTheDocument();
  });

  test('renders the opening crawl text', () => {
    render(<MovieDetails movie={mockMovie} ratings={null} />);
    expect(screen.getByText(mockMovie.opening_crawl)).toBeInTheDocument();
  });

  test('renders the poster if ratings include a poster URL', () => {
    render(<MovieDetails movie={mockMovie} ratings={mockRatings} />);
    const posterImage = screen.getByAltText(mockMovie.title);
    expect(posterImage).toBeInTheDocument();
    expect(posterImage).toHaveAttribute('src', mockRatings.Poster);
  });

  test('renders the StarRatings component when ratings are provided', () => {
    render(<MovieDetails movie={mockMovie} ratings={mockRatings} />);
    expect(screen.getByText(/IMDB:/i)).toBeInTheDocument();
  });
});
