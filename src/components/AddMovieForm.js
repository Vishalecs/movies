import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addMovie } from '../actions/movieActions';
import '../styles/addMovieForm.css'; // Import the CSS file

const AddMovieForm = ({ onClose }) => {
    const [title, setTitle] = useState('');
    const [director, setDirector] = useState('');
    const [year, setYear] = useState('');
    const [genre, setGenre] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [showForm, setShowForm] = useState(true);
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        const newMovie = {
            id: Date.now(),
            title,
            director,
            year,
            genre,
            imageUrl,
            watched: false,
            rating: 0,
            review: ''
        };
        dispatch(addMovie(newMovie));
        setTitle('');
        setDirector('');
        setYear('');
        setGenre('');
        setImageUrl('');
        setShowForm(false);
        onClose();
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (event.target.closest('.form-container') === null) {
                setShowForm(false);
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    const closeForm = () => {
        setShowForm(false);
        onClose();
    };

    return (
        <div className={`form-popup ${showForm ? 'open' : ''}`}>
            <div className="form-container">
                <span className="close" onClick={closeForm}>&times;</span>
                <h2>Add New Movie</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    <br />
                    <input type="text" placeholder="Director" value={director} onChange={(e) => setDirector(e.target.value)} required />
                    <br />
                    <input type="number" placeholder="Year" value={year} onChange={(e) => setYear(e.target.value)} required />
                    <br />
                    <input type="text" placeholder="Genre" value={genre} onChange={(e) => setGenre(e.target.value)} required />
                    <br />
                    <input type="text" placeholder="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />
                    <br />
                    <button type="submit">Add Movie</button>
                </form>
            </div>
        </div>
    );
};

export default AddMovieForm;
