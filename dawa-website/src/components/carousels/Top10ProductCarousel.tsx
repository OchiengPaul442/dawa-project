'use client';
import CustomImage from '../common/CustomImage';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import { useRouter } from 'next/navigation';
import StarRating from '../common/StarRating';

interface Product {
  id: number;
  name: string;
  price: string;
  originalPrice?: string;
  imageUrl: string;
  rating: number;
  sold: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Smart Watch',
    price: 'UGX600,000',
    originalPrice: 'UGX720,000',
    imageUrl:
      'https://images.unsplash.com/photo-1461141346587-763ab02bced9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8U21hcnQlMjBXYXRjaHxlbnwwfHwwfHx8MA%3D%3D',
    rating: 4,
    sold: '4.3m',
  },
  {
    id: 2,
    name: 'Full Set iPad Devices',
    price: 'UGX900,000',
    imageUrl:
      'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8RnVsbCUyMFNldCUyMGlQYWQlMjBEZXZpY2VzfGVufDB8fDB8fHww',
    rating: 3,
    sold: '5.4m',
  },
  {
    id: 3,
    name: 'AirPods',
    price: 'UGX1,000,000',
    originalPrice: 'UGX1,300,000',
    imageUrl:
      'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8QWlyUG9kc3xlbnwwfHwwfHx8MA%3D%3D',
    rating: 4,
    sold: '5.5m',
  },
  {
    id: 4,
    name: 'Smartphone',
    price: 'UGX67,000',
    imageUrl:
      'https://images.unsplash.com/photo-1720048171731-15b3d9d5473f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxzZWFyY2h8MXx8U21hcnRwaG9uZXxlbnwwfHwwfHx8MA%3D%3D',
    rating: 3,
    sold: '6.2m',
  },
  {
    id: 5,
    name: 'Smart TV',
    price: 'UGX1,200,000',
    originalPrice: 'UGX1,500,000',
    imageUrl:
      'https://images.unsplash.com/photo-1601944177325-f8867652837f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fFNtYXJ0JTIwVFZ8ZW58MHx8MHx8fDA%3D',
    rating: 4,
    sold: '4.8m',
  },
  {
    id: 6,
    name: 'Smart Phone',
    price: 'UGX50,000',
    imageUrl:
      'https://images.unsplash.com/photo-1603145733146-ae562a55031e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8U21hcnQlMjBQaG9uZXxlbnwwfHwwfHx8MA%3D%3D',
    rating: 4,
    sold: '5.2m',
  },
];

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<{
    width: number | undefined;
    height: number | undefined;
  }>({ width: undefined, height: undefined });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

const Top10ProductCarousel: React.FC = () => {
  const router = useRouter();
  const size = useWindowSize();
  const [itemsToShow, setItemsToShow] = useState(3);
  const [currentIndex, setCurrentIndex] = useState(0);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);

  const itemWidth = 348.35;
  const itemHeight = 400;
  const itemMarginRight = 40;

  // Adjust itemsToShow based on screen size
  useEffect(() => {
    if (size.width) {
      if (size.width < 640) {
        setItemsToShow(1); // Mobile view
      } else if (size.width < 1024) {
        setItemsToShow(2); // Tablet view
      } else {
        setItemsToShow(3); // Desktop view
      }
    }
  }, [size.width]);

  // Calculate the maximum index based on items to show
  const maxIndex = Math.max(products.length - itemsToShow, 0);

  // Ensure currentIndex is within bounds when itemsToShow changes
  useEffect(() => {
    setCurrentIndex((prevIndex) => {
      return Math.min(prevIndex, maxIndex);
    });
  }, [itemsToShow, maxIndex]);

  // Auto-scroll functionality
  useEffect(() => {
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
    }

    // Set up a new interval
    autoScrollRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        if (prevIndex >= maxIndex) {
          return 0;
        } else {
          return prevIndex + 1;
        }
      });
    }, 3000);

    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, [itemsToShow, maxIndex]);

  // Increment the current index by one item per click, ensuring it loops back
  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex >= maxIndex ? 0 : prevIndex + 1));
  }, [maxIndex]);

  // Decrement the current index by one item per click, ensuring it loops back
  const handlePrev = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex <= 0 ? maxIndex : prevIndex - 1));
  }, [maxIndex]);

  // Calculate the translation in pixels
  const translateX = -(currentIndex * (itemWidth + itemMarginRight));

  return (
    <div className="w-full bg-gray-100 py-12">
      <div className="ml-3 lg:ml-[12%] flex flex-col lg:flex-row items-center">
        {/* Left Section: Title and Navigation */}
        <div className="w-full lg:w-1/4 flex flex-col gap-4 justify-between mb-6 lg:mb-0">
          <h2 className="text-2xl lg:text-3xl lg:max-w-[250px] lg:leading-10 font-semibold mb-4 text-center lg:text-left">
            Top 10 Selected Products Of The Week
          </h2>
          <div className="flex justify-center lg:justify-start items-center space-x-2">
            <button
              onClick={handlePrev}
              aria-label="Previous Products"
              className="p-2 rounded-full border border-gray-300 shadow text-gray-600 hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next Products"
              className="p-2 rounded-full border border-gray-300 shadow text-gray-600 hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>

        {/* Right Section: Carousel */}
        <div className="w-full lg:w-3/4 pb-1 overflow-hidden relative">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(${translateX}px)`,
              width: `${products.length * (itemWidth + itemMarginRight)}px`,
            }}
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="flex-shrink-0 cursor-pointer"
                style={{
                  width: `${itemWidth}px`,
                  height: `${itemHeight}px`,
                  marginRight: `${itemMarginRight}px`,
                }}
              >
                <div
                  onClick={() => router.push(`/prod/${product.id}`)}
                  className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col h-full"
                >
                  <div className="relative w-full h-3/4">
                    <CustomImage
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      style={{
                        objectFit: 'cover',
                        borderTopLeftRadius: 16,
                        borderTopRightRadius: 16,
                      }}
                    />
                  </div>
                  <div className="p-4 flex flex-col justify-between flex-grow">
                    <div>
                      <h3 className="text-lg font-semibold truncate">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {product.sold} sold
                      </p>
                    </div>
                    <div className="flex flex-col items-start mt-4">
                      <p className="text-primary_1 font-bold text-lg mt-2">
                        {product.price}
                        {product.originalPrice && (
                          <span className="text-gray-400 line-through text-sm ml-2">
                            {product.originalPrice}
                          </span>
                        )}
                      </p>
                      <StarRating
                        initialRating={product.rating}
                        maxRating={4}
                        starSize={16}
                        readOnly
                      />
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

export default Top10ProductCarousel;
