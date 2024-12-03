'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Top10ProductCard } from '../../ProductCards/Top10ProductCard';
import useWindowSize from '@/hooks/useWindowSize';
import { useLikeableItems } from '@/hooks/useLikeableItems';
import { Product } from '@/types/product';

const initialProducts: Product[] = [
  {
    id: 1,
    name: 'Smart Watch',
    price: 'UGX600,000',
    originalPrice: 'UGX720,000',
    imageUrl:
      'https://images.unsplash.com/photo-1461141346587-763ab02bced9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8U21hcnQlMjBXYXRjaHxlbnwwfHwwfHx8MA%3D%3D',
    rating: 4,
    sold: '4.3m',
    liked: false,
  },
  {
    id: 2,
    name: 'Smart Phone',
    price: 'UGX1,200,000',
    originalPrice: 'UGX1,400,000',
    imageUrl:
      'https://images.unsplash.com/photo-1461141346587-763ab02bced9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8U21hcnQlMjBXYXRjaHxlbnwwfHwwfHx8MA%3D%3D',
    rating: 5,
    sold: '1.2m',
    liked: true,
  },
  {
    id: 3,
    name: 'Laptop',
    price: 'UGX1,000,000',
    originalPrice: 'UGX1,200,000',
    imageUrl:
      'https://images.unsplash.com/photo-1461141346587-763ab02bced9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8U21hcnQlMjBXYXRjaHxlbnwwfHwwfHx8MA%3D%3D',
    rating: 4.5,
    sold: '2.3m',
    liked: false,
  },
  {
    id: 4,
    name: 'Headphones',
    price: 'UGX500,000',
    originalPrice: 'UGX600,000',
    imageUrl:
      'https://images.unsplash.com/photo-1461141346587-763ab02bced9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8U21hcnQlMjBXYXRjaHxlbnwwfHwwfHx8MA%3D%3D',
    rating: 4,
    sold: '3.4m',
    liked: true,
  },
  {
    id: 5,
    name: 'Camera',
    price: 'UGX200,000',
    originalPrice: 'UGX300,000',
    imageUrl:
      'https://images.unsplash.com/photo-1461141346587-763ab02bced9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8U21hcnQlMjBXYXRjaHxlbnwwfHwwfHx8MA%3D%3D',
    rating: 3.5,
    sold: '1.5m',
    liked: false,
  },
  {
    id: 6,
    name: 'Smart TV',
    price: 'UGX500,000',
    originalPrice: 'UGX600,000',
    imageUrl:
      'https://images.unsplash.com/photo-1461141346587-763ab02bced9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8U21hcnQlMjBXYXRjaHxlbnwwfHwwfHx8MA%3D%3D',
    rating: 4,
    sold: '2.3m',
    liked: true,
  },
  {
    id: 7,
    name: 'Smart Watch',
    price: 'UGX600,000',
    originalPrice: 'UGX720,000',
    imageUrl:
      'https://images.unsplash.com/photo-1461141346587-763ab02bced9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8U21hcnQlMjBXYXRjaHxlbnwwfHwwfHx8MA%3D%3D',
    rating: 4,
    sold: '4.3m',
    liked: false,
  },
  {
    id: 8,
    name: 'Smart Phone',
    price: 'UGX1,200,000',
    originalPrice: 'UGX1,400,000',
    imageUrl:
      'https://images.unsplash.com/photo-1461141346587-763ab02bced9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8U21hcnQlMjBXYXRjaHxlbnwwfHwwfHx8MA%3D%3D',
    rating: 5,
    sold: '1.2m',
    liked: true,
  },
];

const Top10ProductCarousel: React.FC = () => {
  const size = useWindowSize();
  const [itemsToShow, setItemsToShow] = useState(3);
  const [currentIndex, setCurrentIndex] = useState(0);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);
  const { items: products, toggleLike } = useLikeableItems(initialProducts);

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
    setCurrentIndex((prevIndex) => Math.min(prevIndex, maxIndex));
  }, [itemsToShow, maxIndex]);

  // Auto-scroll functionality
  useEffect(() => {
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
    }

    autoScrollRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex >= maxIndex ? 0 : prevIndex + 1,
      );
    }, 3000);

    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, [itemsToShow, maxIndex]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex >= maxIndex ? 0 : prevIndex + 1));
  }, [maxIndex]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex <= 0 ? maxIndex : prevIndex - 1));
  }, [maxIndex]);

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
                className="flex-shrink-0"
                style={{
                  width: `${itemWidth}px`,
                  height: `${itemHeight}px`,
                  marginRight: `${itemMarginRight}px`,
                }}
              >
                <Top10ProductCard product={product} onLike={toggleLike} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Top10ProductCarousel;
