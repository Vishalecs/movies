// components/Rating.js
import React from 'react';

const Rating = ({ rating, onRate }) => {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div>
      {stars.map((star) => (
        <span
          key={star}
          style={{ cursor: 'pointer', color: star <= rating ? 'gold' : 'gray' }}
          onClick={() => onRate(star)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default Rating;
