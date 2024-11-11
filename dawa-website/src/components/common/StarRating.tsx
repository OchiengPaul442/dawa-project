import { Star } from 'lucide-react';
import React from 'react';

interface StarRatingProps {
  initialRating?: number;
  maxRating?: number;
  onRate?: (rating: number) => void;
  starSize?: number;
  className?: string;
  readOnly?: boolean;
}

const StarRating: React.FC<StarRatingProps> = ({
  initialRating = 0,
  maxRating = 5,
  onRate,
  starSize = 24,
  className = '',
  readOnly = false,
}) => {
  const [rating, setRating] = React.useState(initialRating);
  const [hover, setHover] = React.useState<number | null>(null);

  const handleRating = (value: number) => {
    if (!readOnly) {
      setRating(value);
      if (onRate) {
        onRate(value);
      }
    }
  };

  return (
    <div className={`flex items-center gap-0.5 ${className}`}>
      {[...Array(maxRating)].map((_, index) => {
        const value = index + 1;
        const isFilled = (hover ?? rating) >= value;

        return (
          <button
            key={index}
            type="button"
            onClick={() => handleRating(value)}
            onMouseEnter={() => !readOnly && setHover(value)}
            onMouseLeave={() => !readOnly && setHover(null)}
            className={`${!readOnly && 'cursor-pointer'} p-0.5 transition-colors`}
            disabled={readOnly}
          >
            <Star
              size={starSize}
              className={`${
                isFilled ? 'fill-primary_1 text-primary_1' : 'text-gray-300'
              } transition-colors`}
            />
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
