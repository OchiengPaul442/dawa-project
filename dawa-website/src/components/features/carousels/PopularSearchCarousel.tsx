'use client';
import React, { useCallback, useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { PopularSearchProductCard } from '../../ProductCards/PopularSearchProductCard';
import useWindowSize from '@/hooks/useWindowSize';
import { useLikeableItems } from '@/hooks/useLikeableItems';
import { Product } from '@/types/product';

const initialProducts: Product[] = [
  {
    id: 1,
    name: 'MacBook Pro 2020 256 SSD',
    price: 'UGX3,494,000',
    originalPrice: 'UGX3,649,430',
    imageUrl:
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80',
  },
  {
    id: 2,
    name: 'Samsung Galaxy S21 Ultra 5G',
    price: 'UGX1,299,000',
    originalPrice: 'UGX1,499,000',
    imageUrl:
      'https://images.unsplash.com/photo-1522075469751-3a669459e750?w=500&q=80',
  },
  {
    id: 3,
    name: 'iPhone 12 Pro Max 256GB',
    price: 'UGX1,099,000',
    originalPrice: 'UGX1,299,000',
    imageUrl:
      'https://images.unsplash.com/photo-1522075469751-3a669459e750?w=500&q=80',
  },
  {
    id: 4,
    name: 'Sony PlayStation 5',
    price: 'UGX1,299,000',
    originalPrice: 'UGX1,499,000',
    imageUrl:
      'https://images.unsplash.com/photo-1522075469751-3a669459e750?w=500&q=80',
  },
  {
    id: 5,
    name: 'Xbox Series X 512GB',
    price: 'UGX1,299,000',
    originalPrice: 'UGX1,499,000',
    imageUrl:
      'https://images.unsplash.com/photo-1522075469751-3a669459e750?w=500&q=80',
  },
  {
    id: 6,
    name: 'Nintendo Switch Lite',
    price: 'UGX1,299,000',
    originalPrice: 'UGX1,499,000',
    imageUrl:
      'https://images.unsplash.com/photo-1522075469751-3a669459e750?w=500&q=80',
  },
  {
    id: 7,
    name: 'Microsoft Surface Pro 7',
    price: 'UGX1,299,000',
    originalPrice: 'UGX1,499,000',
    imageUrl:
      'https://images.unsplash.com/photo-1522075469751-3a669459e750?w=500&q=80',
  },
  {
    id: 8,
    name: 'Apple Watch Series 6 40mm',
    price: 'UGX1,299,000',
    originalPrice: 'UGX1,499,000',
    imageUrl:
      'https://images.unsplash.com/photo-1522075469751-3a669459e750?w=500&q=80',
  },
];

const PopularSearchCarousel: React.FC = () => {
  const { width } = useWindowSize();
  const { items: products, toggleLike } = useLikeableItems(initialProducts);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);

  useEffect(() => {
    if (width < 640) setItemsPerView(1);
    else if (width < 1024) setItemsPerView(2);
    else setItemsPerView(3);
  }, [width]);

  const maxIndex = Math.max(0, products.length - itemsPerView);

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, maxIndex));
  }, [maxIndex]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  }, []);

  const cardWidth = 250;
  const cardMargin = 36;

  return (
    <div className="w-full py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Popular Search</h2>
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
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out mb-2"
            style={{
              transform: `translateX(-${currentIndex * (cardWidth + cardMargin)}px)`,
              width: `${products.length * (cardWidth + cardMargin) - cardMargin}px`,
            }}
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="flex-shrink-0 w-[250px] h-[355px]"
                style={{ marginRight: `${cardMargin}px` }}
              >
                <PopularSearchProductCard
                  product={product}
                  onLike={toggleLike}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularSearchCarousel;
