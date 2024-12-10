import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MovieList from '../components/MovieList';
import '@testing-library/jest-dom';

interface Movie {
  episode_id: number;
  title: string;
  release_date: string;
}

const mockMovies: Movie[] = [
  {
    episode_id: 4,
    title: 'A New Hope',
    release_date: '1977-05-25',
  },
  {
    episode_id: 5,
    title: 'The Empire Strikes Back',
    release_date: '1980-05-21',
  },
];

describe('MovieList Component', () => {
  test('renders the movie list with episode ID, title, and release date', () => {
    render(<MovieList movies={mockMovies} onSelectMovie={jest.fn()} />);

    mockMovies.forEach((movie) => {
      expect(screen.getByText(`Episode ${movie.episode_id}`)).toBeInTheDocument();
      expect(screen.getByText(movie.title)).toBeInTheDocument();
      expect(screen.getByText(new Date(movie.release_date).toISOString().split('T')[0])).toBeInTheDocument();
    });
  });

  test('calls onSelectMovie when a movie is clicked', () => {
    const mockOnSelectMovie = jest.fn();
    render(<MovieList movies={mockMovies} onSelectMovie={mockOnSelectMovie} />);

    const firstMovieElement = screen.getByText(mockMovies[0].title);
    fireEvent.click(firstMovieElement);

    expect(mockOnSelectMovie).toHaveBeenCalledWith(mockMovies[0]);
  });

  test('displays no movies if the movies array is empty', () => {
    render(<MovieList movies={[]} onSelectMovie={jest.fn()} />);

    expect(screen.queryByText(/Episode/)).not.toBeInTheDocument();
  });
});
