import axios from 'axios';

const SWAPI_URL = 'https://swapi.dev/api/films/?format=json';
const OMDB_API_URL = 'https://www.omdbapi.com/';
const OMDB_API_KEY = 'b9a5e69d';

export interface Movie {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
}

export interface Rating {
  imdb: number;
  rottenTomatoes: number;
  metacritic: number;
  Poster: string;
  average: number;
}

export const fetchMovies = async (): Promise<Movie[]> => {
  const response = await axios.get(SWAPI_URL);
  return response.data.results as Movie[];
};

export const fetchMovieRatings = async (movieTitle: string): Promise<Rating> => {
  try {
    const response = await axios.get(`${OMDB_API_URL}?t=${movieTitle}&apikey=${OMDB_API_KEY}`);
    const data = response.data;

    const imdb = parseFloat(data.imdbRating) || 0;
    const rottenTomatoes = parseFloat(
      data.Ratings?.find((rating: { Source: string; Value: string }) => rating.Source === 'Rotten Tomatoes')?.Value.replace('%', '') || '0'
    );
    const metacritic = parseFloat(data.Metascore) || 0;

    const ratingsCount = [imdb, rottenTomatoes / 10, metacritic / 10].filter((rating) => rating > 0).length;
    const average = ratingsCount > 0 ? (imdb + rottenTomatoes / 10 + metacritic / 10) / ratingsCount : 0;

    return {
      imdb,
      rottenTomatoes,
      metacritic,
      Poster: data.Poster || '',
      average,
    };
  } catch (error) {
    console.error('Error', error);
    return {
      imdb: 0,
      rottenTomatoes: 0,
      metacritic: 0,
      Poster: '',
      average: 0,
    };
  }
};
