import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editMovie } from '../actions/movieActions';

const EditMovieForm = ({ movie, onClose }) => {
    const [title, setTitle] = useState(movie.title);
    const [director, setDirector] = useState(movie.director); // Changed from description to director
    const [year, setYear] = useState(movie.year);
    const [genre, setGenre] = useState(movie.genre);
    const [imageUrl, setImageUrl] = useState(movie.imageUrl);

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedMovie = {
            id: movie.id,
            title,
            director, // Changed from description to director
            year,
            genre,
            imageUrl,
        };
        dispatch(editMovie(updatedMovie));
        onClose();
    };

    return (
        <div className="form-popup">
            <div className="form-container">
                <h2>Edit Movie</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Director"
                        value={director}
                        onChange={(e) => setDirector(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Year"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Genre"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Image URL"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                    />
                    <button type="submit">Save</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default EditMovieForm;