import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addMovie, deleteMovie, toggleWatched, rateMovie } from '../actions/movieActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import EditMovieForm from './EditMovieForm';
import Rating from './Rating';
import AddMovieForm from './AddMovieForm'; // Import AddMovieForm component

const Movie = ({ movie }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this movie?');
    if (confirmDelete) {
      dispatch(deleteMovie(movie.id));
    }
  };

  const handleToggleWatched = () => {
    dispatch(toggleWatched(movie.id));
  };

  const handleRate = (rating) => {
    dispatch(rateMovie(movie.id, rating));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCloseEditForm = () => {
    setIsEditing(false);
  };

  const handleAddMovie = () => {
    setIsEditing(true); // Set isEditing to true to show the AddMovieForm
  };

  const handleCloseAddMovieForm = () => {
    setIsEditing(false);
  };

  return (
    <div className="movie">
      {isEditing ? (
        <AddMovieForm onClose={handleCloseAddMovieForm} /> // Ensure onClose is passed correctly
      ) : (
        <>
          <h3>{movie.title}</h3>
          <p><strong>Director:</strong> {movie.director}</p>
          <p><strong>Year:</strong> {movie.year}</p>
          <p><strong>Genre:</strong> {movie.genre}</p>
          <p>Rating: {movie.rating}</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button onClick={handleToggleWatched} title={movie.watched ? 'Mark as Unwatched' : 'Mark as Watched'}>
              {movie.watched ? (
                <FontAwesomeIcon icon={faEye} />
              ) : (
                <FontAwesomeIcon icon={faEyeSlash} />
              )}
            </button>
            <button onClick={handleEdit}>
              <FontAwesomeIcon icon={faEdit} />
            </button>
            <button onClick={handleDelete}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
            <Rating rating={movie.rating} onRate={handleRate} />
            <button onClick={handleAddMovie}>Add Movie</button> // Button to open AddMovieForm
          </div>
        </>
      )}
    </div>
  );
};

export default Movie;