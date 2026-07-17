import { getData, saveData } from './dataStore';
import type { EmptyObject, MovieAddReturn, MovieListReturn } from './types';

// A custom exception class that can take both error and message
export class MovieError extends Error {
  error: string;

  constructor(error: string, message: string) {
    super(message);
    this.error = error;
  }
}

export function clear(): EmptyObject {
  getData().movies = [];
  return {};
}

export function movieAdd(title: string, director: string): MovieAddReturn {
  if (title === '' || director === '') {
    throw new MovieError('INVALID_MOVIE_DETAILS', 'Title or director is empty');
  }

  const data = getData();

  const movieId = data.movies.length;
  data.movies.push({ movieId, title, director });
  saveData();
  return { movieId };
}

export function movieEdit(movieId: number, title: string, director: string): EmptyObject {
  const movie = getData().movies.find(m => m.movieId === movieId);
  if (movie === undefined) {
    throw new MovieError('INVALID_MOVIE_ID', `No existing movie with movieId: ${movieId}`);
  }

  if (title === '') {
    throw new MovieError('INVALID_MOVIE_DETAILS', `Title '${title}' is empty`);
  }

  if (director === '') {
    throw new MovieError('INVALID_MOVIE_DETAILS', `Director '${director}' is empty`);
  }

  movie.title = title;
  movie.director = director;

  saveData();
  return {};
}

export function moviesList(): MovieListReturn {
  return { movies: getData().movies };
}
