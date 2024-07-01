import {
  FETCH_MOVIES,
  ADD_MOVIE,
  EDIT_MOVIE,
  DELETE_MOVIE,
  RATE_MOVIE,
  TOGGLE_WATCHED
} from '../actions/movieActions';

const initialState = {
  movies: [],
};

const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MOVIES:
      return {
        ...state,
        movies: action.payload,
      };
    case ADD_MOVIE:
      return {
        ...state,
        movies: [...state.movies, action.payload],
      };
    case EDIT_MOVIE:
      return {
        ...state,
        movies: state.movies.map((movie) =>
          movie.id === action.payload.id ? action.payload : movie
        ),
      };
    case DELETE_MOVIE:
      return {
        ...state,
        movies: state.movies.filter((movie) => movie.id !== action.payload),
      };
    case RATE_MOVIE:
      return {
        ...state,
        movies: state.movies.map((movie) =>
          movie.id === action.payload.id ? { ...movie, rating: action.payload.rating } : movie
        ),
      };
    case TOGGLE_WATCHED:
      return {
        ...state,
        movies: state.movies.map((movie) =>
          movie.id === action.payload ? { ...movie, watched: !movie.watched } : movie
        ),
      };
    default:
      return state;
  }
};

export default movieReducer;
