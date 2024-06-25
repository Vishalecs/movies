import React, { useState } from 'react';

const styles = `
  /* styles/rating.css */

  .rating {
    display: flex;
    justify-content: center;
  }
  
  .rating span {
    font-size: 24px;
    margin-right: 5px;
    cursor: pointer;
    color: gray;
    transition: color 0.2s ease-in-out;
  }
  
  .rating span:hover,
  .rating span.active {
    color: gold;
  }
`;

const Rating = ({ initialRating, onRate }) => {
  const [rating, setRating] = useState(initialRating);

  const handleClick = (value) => {
    setRating(value);
    onRate(value); // Call the onRate callback with the selected rating
  };

  return (
    <div className="rating">
      {[1, 2, 3, 4, 5].map((value) => (
        <span
          key={value}
          onClick={() => handleClick(value)}
          className={value <= rating ? 'active' : ''}
        >
          ★
        </span>
      ))}
      <style>{styles}</style> {/* Embed styles using <style> tag */}
    </div>
  );
};

export default Rating;
