'use client';
import CustomImage from '../common/CustomImage';
import React, { useCallback, useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import StarRating from '../common/StarRating';

interface Product {
  id: number;
  name: string;
  price: string;
  imageUrl: string;
  rating: number;
  reviews: number;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Fitness and Activity Tracker',
    price: 'UGX32,000',
    imageUrl:
      'https://images.unsplash.com/photo-1654195131868-cac1d8429d86?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Rml0bmVzcyUyMGFuZCUyMEFjdGl2aXR5JTIwVHJhY2tlcnxlbnwwfHwwfHx8MA%3D%3D',
    rating: 3,
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
    rating: 3,
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
  {
    id: 5,
    name: 'Hazer Mouse Gaming',
    price: 'UGX25,000',
    imageUrl:
      'https://images.unsplash.com/photo-1520609930-0fe8db30fd0b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG1vdXNlfGVufDB8fDB8fHww',
    rating: 3,
    reviews: 15,
  },
  {
    id: 6,
    name: 'Samsung Galaxy S21 Ultra',
    price: 'UGX1,200,000',
    imageUrl:
      'https://images.unsplash.com/photo-1610792516286-524726503fb2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8U2Ftc3VuZyUyMEdhbGF4eSUyMFMyMSUyMFVsdHJhfGVufDB8fDB8fHww',
    rating: 4,
    reviews: 25,
  },
  {
    id: 7,
    name: 'Sony PlayStation 5',
    price: 'UGX1,200,000',
    imageUrl:
      'https://images.unsplash.com/photo-1678761442615-5af77170f925?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8U29ueSUyMFBsYXlTdGF0aW9uJTIwNXxlbnwwfHwwfHx8MA%3D%3D',
    rating: 4,
    reviews: 20,
  },
  {
    id: 8,
    name: 'Nintendo Switch Lite',
    price: 'UGX1,200,000',
    imageUrl:
      'https://images.unsplash.com/photo-1569089630965-daa2d5aa3860?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TmludGVuZG8lMjBTd2l0Y2glMjBMaXRlfGVufDB8fDB8fHww',
    rating: 4,
    reviews: 25,
  },
];

const RecentlyViewedCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const cardWidth = 273;
  const cardMargin = 36;

  // Update items per view based on screen size
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };
    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  const maxIndex = products.length - itemsPerView;

  // Navigation handlers
  const handleNext = useCallback(() => {
    if (currentIndex < maxIndex) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  }, [currentIndex, maxIndex]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  }, [currentIndex]);

  return (
    <div className="w-full py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl flex items-center font-semibold">
            Recently viewed
          </h2>
          <div className="flex space-x-2">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`p-2 text-xl rounded-full transition ${
                currentIndex === 0
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-primary_1 hover:bg-gray-200'
              }`}
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex === maxIndex}
              className={`p-2 text-xl rounded-full transition ${
                currentIndex === maxIndex
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-primary_1 hover:bg-gray-200'
              }`}
            >
              <FaChevronRight />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="flex overflow-hidden">
          <div
            className="flex transition-transform py-2 duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (cardWidth + cardMargin)}px)`,
            }}
          >
            {products.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  // TODO: Handle product click
                }}
                style={{
                  marginRight: cardMargin,
                }}
                className="hover:bg-white :hover:shadow-md hover:scale-105 rounded-lg hover:shadow-lg flex items-center px-2 py-2 w-[273px] sm:mx-0 cursor-pointer  transform  transition duration-300 ease-in-out"
              >
                {/* Product Image */}
                <div className="w-[80px] h-[80px] sm:w-[117px] sm:h-[117px] md:w-[120px] md:h-[120px] lg:w-[117px] lg:h-[139px] relative flex-shrink-0">
                  <CustomImage
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    style={{ objectFit: 'cover', borderRadius: '12px' }}
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
      </div>
    </div>
  );
};

export default RecentlyViewedCarousel;
