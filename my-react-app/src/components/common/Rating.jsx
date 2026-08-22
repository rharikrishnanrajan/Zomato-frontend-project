import React from 'react';
import { Star } from 'lucide-react';

const Rating = ({
  rating,
  maxRating = 5,
  size = 'md',
  showNumber = true,
  reviewCount,
  interactive = false,
  onChange,
  className = '',
}) => {
  const sizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  const getRatingColor = (rating) => {
    if (rating >= 4) return 'bg-green-600';
    if (rating >= 3) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const handleStarClick = (index) => {
    if (interactive && onChange) {
      onChange(index + 1);
    }
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {showNumber && (
        <div
          className={`${getRatingColor(rating)} text-white px-2 py-0.5 rounded flex items-center gap-1 ${textSizes[size]} font-medium`}
        >
          <span>{rating.toFixed(1)}</span>
          <Star className={`${sizes[size]} fill-current`} />
        </div>
      )}
      
      {!showNumber && (
        <div className="flex items-center gap-0.5">
          {[...Array(maxRating)].map((_, index) => {
            const filled = index < Math.floor(rating);
            const partial = index === Math.floor(rating) && rating % 1 !== 0;
            
            return (
              <button
                key={index}
                onClick={() => handleStarClick(index)}
                disabled={!interactive}
                className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
                aria-label={`Rate ${index + 1} out of ${maxRating}`}
              >
                <Star
                  className={`${sizes[size]} ${
                    filled || partial
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'fill-none text-gray-300'
                  }`}
                />
              </button>
            );
          })}
        </div>
      )}
      
      {reviewCount && (
        <span className={`text-gray-600 ${textSizes[size]}`}>
          ({reviewCount.toLocaleString()})
        </span>
      )}
    </div>
  );
};

export default Rating;
