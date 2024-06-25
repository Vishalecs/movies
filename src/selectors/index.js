import { createSelector } from 'reselect';

const moviesSelector = (state) => state.movies.movies;

export const getMovies = createSelector(
  [moviesSelector],
  (movies) => movies
);
