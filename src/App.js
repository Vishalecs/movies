import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchMovies } from './actions/movieActions';
import NavBar from './components/NavBar';
import AddMovieForm from './components/AddMovieForm';
import MovieList from './components/MovieList';
import './styles/styles.css';

const App = () => {
    const [showAddMovieForm, setShowAddMovieForm] = useState(false);
    const [showFavorites, setShowFavorites] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchMovies());
    }, [dispatch]);

    const handleAddMovieClick = () => {
        setShowAddMovieForm(!showAddMovieForm);
    };

    return (
        <div className="app">
            <NavBar 
                onAddMovieClick={handleAddMovieClick} 
                showFavorites={showFavorites}
                setShowFavorites={setShowFavorites}
            />
            {showAddMovieForm && <AddMovieForm />}
            <MovieList showFavorites={showFavorites} />
        </div>
    );
};

export default App;