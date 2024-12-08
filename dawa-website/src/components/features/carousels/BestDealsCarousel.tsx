'use client';
import React, { useEffect, useRef, useState } from 'react';
import CustomImage from '../../common/CustomImage';
import StarRating from '../../common/StarRating';

import { useRouter } from 'next/navigation';

const products = [
  {
    id: 1,
    name: 'Fitness and Activity Tracker',
    price: 'UGX32,000',
    imageUrl:
      'https://images.unsplash.com/photo-1654195131868-cac1d8429d86?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Rml0bmVzcyUyMGFuZCUyMEFjdGl2aXR5JTIwVHJhY2tlcnxlbnwwfHwwfHx8MA%3D%3D',
    rating: 4.5,
    reviews: 12,
  },
  {
    id: 2,
    name: 'Xbox White Joystick',
    price: 'UGX102,000',
    imageUrl:
      'https://images.unsplash.com/photo-1612801799890-4ba4760b6590?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8WGJveCUyMFdoaXRlJTIwSm95c3RpY2t8ZW58MHx8MHx8fDA%3D',
    rating: 4,
    reviews: 18,
  },
  {
    id: 3,
    name: 'Super Boost Headphones',
    price: 'UGX32,000',
    imageUrl:
      'https://images.unsplash.com/photo-1593697909822-5d9da12b4680?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fFN1cGVyJTIwQm9vc3QlMjBIZWFkcGhvbmVzfGVufDB8fDB8fHww',
    rating: 3.5,
    reviews: 10,
  },
  {
    id: 4,
    name: 'Ice White Airpods',
    price: 'UGX1,200,000',
    imageUrl:
      'https://images.unsplash.com/photo-1556607173-eca49c3c4f47?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8V2hpdGUlMjBBaXJwb2RzfGVufDB8fDB8fHww',
    rating: 4,
    reviews: 20,
  },
];

const BestDealsCarousel: React.FC = () => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardWidth = 273;
  const cardMargin = 36;
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
    resetTimer();
  };

  const resetTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    startTimer();
  };

  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === products.length - 1 ? 0 : prevIndex + 1,
      );
    }, 3000);
  };

  useEffect(() => {
    startTimer();

    // Clean up on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden py-8"
      onMouseEnter={() => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      }}
      onMouseLeave={() => {
        startTimer();
      }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Best Offer in Laptops</h2>
        {/* Carousel Indicators */}
        <div className="flex items-center space-x-2">
          {products.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`h-2 w-2 rounded-full transition-all duration-200 ${
                index === currentIndex ? 'w-4 bg-primary_1' : 'bg-gray-300'
              }`}
            ></button>
          ))}
        </div>
      </div>
      <div
        className="flex transition-transform duration-300 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * (cardWidth + cardMargin)}px)`,
        }}
      >
        {products.map((product, index) => (
          <div
            key={`${product.id}-${index}`}
            onClick={() => {
              router.push(`/prod/${product.id}`);
            }}
            style={{
              marginRight: cardMargin,
            }}
            className="flex items-center px-2 py-4 w-[273px] sm:mx-0 cursor-pointer transform transition duration-300 ease-in-out"
          >
            {/* Product Image */}
            <div className="w-20 h-20 sm:w-28 sm:h-28 md:w-30 md:h-30 lg:w-28 lg:h-35 relative flex-shrink-0">
              <CustomImage
                src={product.imageUrl}
                alt={product.name}
                fill
                style={{ objectFit: 'cover', borderRadius: 10 }}
              />
            </div>

            {/* Product Details */}
            <div className="ml-4 flex flex-col h-full py-1 justify-between text-left">
              <h3 className="text-sm font-semibold leading-tight">
                {product.name}
              </h3>
              <div>
                <p className="text-primary_1 font-bold">{product.price}</p>
                <div className="flex items-center mt-1">
                  <StarRating
                    initialRating={product.rating}
                    maxRating={4}
                    starSize={16}
                    readOnly
                  />
                  <span className="ml-2 text-xs text-gray-500">
                    ({product.reviews})
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestDealsCarousel;
