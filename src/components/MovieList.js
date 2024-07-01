import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, deleteMovie, toggleWatched, rateMovie } from '../actions/movieActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import EditMovieForm from './EditMovieForm';
import { getMovies } from '../selectors';
import Rating from './Rating';

const styles =  `
/* styles/movieList.css */

.movie-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-around;
  padding: 20px;
  box-sizing: border-box;
}

.movie-card {
  width: calc(25% - 20px); /* Four items per row with 20px gap */
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  cursor: pointer;
  display: flex;
  flex-direction: column;
}

.movie-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.movie-card img {
  width: 100%;
  height: 240px;
  object-fit: cover;
  border-radius: 8px 8px 0 0;
}

.movie-card .card-content {
  padding: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.movie-card h3 {
  margin: 0 0 8px;
  font-size: 18px;
  font-weight: bold;
  color: #333333;
  text-align: center; /* Center title */
}

.movie-card p {
  margin: 0;
  font-size: 14px;
  color: #666666;
  text-align: center; /* Center director, year, genre */
}

.movie-card .icons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-top: 1px solid #e0e0e0;
  background-color: #f8f8f8;
}

.movie-card .icons > * {
  font-size: 16px;
  color: #999999;
  transition: color 0.2s ease-in-out;
  cursor: pointer;
}

.movie-card .icons > *:hover {
  color: #333333;
}

/* Centering h2 heading */
h2 {
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
  color: #333333;
}
`

;

const MovieList = ({ showFavorites }) => {
  const dispatch = useDispatch();
  const movies = useSelector(getMovies);
  const [loading, setLoading] = useState(true);
  const [editingMovie, setEditingMovie] = useState(null);

  useEffect(() => {
    dispatch(fetchMovies()).then(() => setLoading(false));
  }, [dispatch]);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this movie?');
    if (confirmDelete) {
      dispatch(deleteMovie(id));
    }
  };

  const handleEdit = (movie) => {
    setEditingMovie(movie);
  };

  const handleCloseEditForm = () => {
    setEditingMovie(null);
  };

  const handleRate = (movieId, rating) => {
    dispatch(rateMovie(movieId, rating));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!Array.isArray(movies)) {
    return <div>Error: Movies data is not an array</div>;
  }

  return (
    <div>
      <h2>{showFavorites ? 'Favorite Movies' : 'Movie List'}</h2>
      {editingMovie && (
        <EditMovieForm movie={editingMovie} onClose={handleCloseEditForm} />
      )}
      <style>{styles}</style> {/* Embed styles using <style> tag */}
      <div className="movie-list">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img src={movie.imageUrl} alt={movie.title} />
            <div className="card-content">
              <h3>{movie.title}</h3>
              <p><strong>Director:</strong> {movie.director}</p>
              <p><strong>Year:</strong> {movie.year}</p>
              <p><strong>Genre:</strong> {movie.genre}</p>
              {/* Render the Rating component */}
              <Rating initialRating={movie.rating} onRate={(rating) => handleRate(movie.id, rating)} />
              <div className="icons">
                <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(movie.id)} />
                <FontAwesomeIcon icon={faEdit} onClick={() => handleEdit(movie)} />
                <FontAwesomeIcon
                  icon={movie.watched ? faEye : faEyeSlash}
                  onClick={() => dispatch(toggleWatched(movie.id))}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
