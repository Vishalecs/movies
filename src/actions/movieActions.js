import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export const FETCH_MOVIES = 'FETCH_MOVIES';
export const ADD_MOVIE = 'ADD_MOVIE';
export const EDIT_MOVIE = 'EDIT_MOVIE';
export const DELETE_MOVIE = 'DELETE_MOVIE';
export const RATE_MOVIE = 'RATE_MOVIE';
export const TOGGLE_WATCHED = 'TOGGLE_WATCHED';

export const fetchMovies = () => async (dispatch) => {
  try {
    const response = await axios.get('https://my-json-server.typicode.com/Vishalecs/movie-list-api/movies');
    dispatch({
      type: FETCH_MOVIES,
      payload: response.data,
    });
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
};

export const addMovie = (movie) => async (dispatch) => {
  try {
    const newMovie = { ...movie, id: uuidv4() }; // Add unique ID to the movie
    const response = await axios.post('https://my-json-server.typicode.com/Vishalecs/movie-list-api/movies', newMovie);
    dispatch({
      type: ADD_MOVIE,
      payload: response.data,
    });
  } catch (error) {
    console.error('Error adding movie:', error);
  }
};

export const editMovie = (updatedMovie) => async (dispatch) => {
  try {
    const response = await axios.put(`https://my-json-server.typicode.com/Vishalecs/movie-list-api/movies/${updatedMovie.id}`, updatedMovie);
    dispatch({
      type: EDIT_MOVIE,
      payload: response.data,
    });
  } catch (error) {
    console.error('Error editing movie:', error);
  }
};

export const deleteMovie = (movieId) => async (dispatch) => {
  try {
    await axios.delete(`https://my-json-server.typicode.com/Vishalecs/movie-list-api/movies/${movieId}`);
    dispatch({
      type: DELETE_MOVIE,
      payload: movieId,
    });
  } catch (error) {
    console.error('Error deleting movie:', error);
  }
};

export const rateMovie = (movieId, rating) => ({
  type: RATE_MOVIE,
  payload: { id: movieId, rating },
});

export const toggleWatched = (movieId) => ({
  type: TOGGLE_WATCHED,
  payload: movieId,
});
