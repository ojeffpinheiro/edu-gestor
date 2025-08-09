import React from 'react'
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';

interface StarRatingProps {
  rating: number;
  onRate?: (rating: number) => void;
  interactive?: boolean;
}

const StarRating = ({ rating, onRate, interactive = false }: StarRatingProps) => {
  return (
    <div style={{ display: 'flex', gap: '2px' }}>
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = rating >= star;
        const halfFilled = rating >= star - 0.5 && rating < star;
        
        return (
          <span 
            key={star}
            onClick={() => interactive && onRate?.(star)}
            style={{ cursor: interactive ? 'pointer' : 'default', color: '#FFD700' }}
          >
            {filled ? <FaStar /> : halfFilled ? <FaStarHalfAlt /> : <FaRegStar />}
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;