import React from 'react';
import '../styles/navbar.css'; // Import the CSS file

const NavBar = ({ onAddMovieClick }) => {
  return (
    <nav className="navbar">
      <h1>Movie List</h1>
      <button onClick={onAddMovieClick}>Add New Movie</button>
    </nav>
  );
};

export default NavBar;
