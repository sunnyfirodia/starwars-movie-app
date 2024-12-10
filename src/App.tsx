import React, { useState, useEffect, Suspense, lazy } from 'react';
import { fetchMovies, fetchMovieRatings } from './services/movieService';
import Skeleton from 'react-loading-skeleton';
import { Movie, Rating } from './types';
import './styles/styles.css';

const MovieList = lazy(() => import('./components/MovieList'));
const MovieDetails = lazy(() => import('./components/MovieDetails'));
const FilterSort = lazy(() => import('./components/FilterSort'));

const App: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [ratings, setRatings] = useState<Rating | null>(null);

  useEffect(() => {
    const loadMovies = async () => {
      const data: Movie[] = await fetchMovies();
      setMovies(data);
      setFilteredMovies(data);
    };

    loadMovies();
  }, []);

  const handleSelectMovie = async (movie: Movie) => {
    setSelectedMovie(movie);
    const movieRatings: Rating = await fetchMovieRatings(movie.title);
    setRatings(movieRatings);
  };

  const handleFilter = (filterText: string) => {
    const filtered = movies.filter((movie) =>
      movie.title.toLowerCase().includes(filterText.toLowerCase())
    );
    setFilteredMovies(filtered);
  };

  const handleSort = (sortOption: string) => {
    const sorted = [...filteredMovies].sort((a, b) => {
      if (sortOption === 'year') {
        return new Date(a.release_date).getTime() - new Date(b.release_date).getTime();
      }
      if (sortOption === 'episode') {
        return a.episode_id - b.episode_id;
      }
      return 0;
    });
    setFilteredMovies(sorted);
  };

  return (
    <div className="app-container">
      <div className="header">
        <Suspense fallback={<Skeleton count={5} />}>
          <FilterSort onFilter={handleFilter} onSort={handleSort} />
        </Suspense>
      </div>
      <div className="content">
        <Suspense fallback={<Skeleton count={5} />}>
          <MovieList movies={filteredMovies} onSelectMovie={handleSelectMovie} />
        </Suspense>
        <Suspense fallback={<Skeleton count={5} />}>
          <MovieDetails movie={selectedMovie} ratings={ratings} />
        </Suspense>
      </div>
    </div>
  );
};

export default App;
