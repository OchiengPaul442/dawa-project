'use client';
import FireIcon from '@public/assets/svgs/fireIcon.svg';
import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import Button from '../common/Button';
import { Progress } from '../ui/progress';

interface Product {
  id: number;
  name: string;
  price: string;
  originalPrice?: string;
  imageUrl: string;
  rating: number;
  stockLeft: number;
  totalStock: number;
}

const products: Product[] = [
  {
    id: 1,
    name: 'MacBook Pro 2020 256 SSD',
    price: 'UGX3,494,000',
    originalPrice: 'UGX3,649,430',
    imageUrl:
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80',
    rating: 4,
    stockLeft: 10,
    totalStock: 100,
  },
  {
    id: 2,
    name: 'Digital Camera XF-21',
    price: 'UGX2,000,000',
    originalPrice: 'UGX2,500,000',
    imageUrl:
      'https://images.unsplash.com/photo-1460134846237-51c777df6111?w=500&auto=format&fit=crop&q=60',
    rating: 5,
    stockLeft: 56,
    totalStock: 100,
  },
  {
    id: 3,
    name: 'Ultra Book Thin Laptop XL-01',
    price: 'UGX2,895,345',
    originalPrice: 'UGX4,800,000',
    imageUrl:
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80',
    rating: 3,
    stockLeft: 20,
    totalStock: 100,
  },
  {
    id: 4,
    name: '1 Set Magic Equipments',
    price: 'UGX2,500,500',
    originalPrice: 'UGX2,900,000',
    imageUrl:
      'https://images.unsplash.com/photo-1504802469493-cad9b622c4f7?w=500&auto=format&fit=crop&q=60',
    rating: 4,
    stockLeft: 75,
    totalStock: 100,
  },
  {
    id: 5,
    name: 'LED Monitor 24” With High Quality',
    price: 'UGX3,000,000',
    originalPrice: 'UGX3,500,000',
    imageUrl:
      'https://images.unsplash.com/photo-1457305237443-44c3d5a30b89?w=500&auto=format&fit=crop&q=60',
    rating: 5,
    stockLeft: 34,
    totalStock: 100,
  },
  {
    id: 6,
    name: 'Smartphone Xiaomi Redmi Note 9 Pro',
    price: 'UGX1,500,000',
    originalPrice: 'UGX1,800,000',
    imageUrl:
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80',
    rating: 4,
    stockLeft: 89,
    totalStock: 100,
  },
  {
    id: 7,
    name: 'Wireless Charging Pad Xiaomi',
    price: 'UGX1,000,000',
    originalPrice: 'UGX1,200,000',
    imageUrl:
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80',
    rating: 5,
    stockLeft: 67,
    totalStock: 100,
  },
  {
    id: 8,
    name: 'Wireless Charging Pad Xiaomi',
    price: 'UGX1,000,000',
    originalPrice: 'UGX1,200,000',
    imageUrl:
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80',
    rating: 5,
    stockLeft: 67,
    totalStock: 100,
  },
  {
    id: 9,
    name: 'Wireless Charging Pad Xiaomi',
    price: 'UGX1,000,000',
    originalPrice: 'UGX1,200,000',
    imageUrl:
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80',
    rating: 5,
    stockLeft: 67,
    totalStock: 100,
  },
  {
    id: 10,
    name: 'Wireless Charging Pad Xiaomi',
    price: 'UGX1,000,000',
    originalPrice: 'UGX1,200,000',
    imageUrl:
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80',
    rating: 5,
    stockLeft: 67,
    totalStock: 100,
  },
];

const HotSalesCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const cardWidth = 250;
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
            <FireIcon className="w-5 h-5 mr-1" />
            Hot Sale!
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
            className="flex transition-transform py-1 duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (cardWidth + cardMargin)}px)`,
            }}
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="flex-shrink-0 w-[250px] h-[420px] cursor-pointer"
                style={{ marginRight: `${cardMargin}px` }}
              >
                <div className="bg-white rounded-2xl shadow-md overflow-hidden h-full flex flex-col justify-between">
                  {/* Product Image */}
                  <div className="relative w-full h-[266px] mb-2">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-t-2xl"
                    />
                    {/* Sale Badge */}
                    <div className="absolute top-2 right-2 h-12 w-12 flex justify-center items-center bg-primary_1 text-white text-xs font-bold px-2 py-1 rounded-full">
                      SALE
                    </div>
                  </div>

                  <div className="flex flex-col justify-between h-full p-3">
                    {/* Price and Original Price */}
                    <div className="text-center mb-2">
                      <p className="text-primary_1 font-bold text-lg">
                        {product.price}
                      </p>
                      {product.originalPrice && (
                        <p className="text-gray-400 line-through text-sm">
                          {product.originalPrice}
                        </p>
                      )}
                      <h3 className="text-black font-bold text-md mt-2 truncate">
                        {product.name}
                      </h3>
                    </div>

                    {/* Stock and Progress Bar */}
                    <Progress
                      value={(product.stockLeft / product.totalStock) * 100}
                      className="mt-1 bg-primary_2"
                      indicatorClassName="bg-primary_1"
                    />

                    <div className="text-center text-xs text-gray-400 my-2">
                      {product.stockLeft} Left Stock
                    </div>

                    {/* View More Button */}
                    <Button
                      onClick={() => {
                        // TODO: Handle product click
                      }}
                      className="w-full mt-4 h-12 text-primary_1 bg-transparent hover:bg-transparent border-2 border-primary_1 rounded-lg"
                    >
                      View more
                    </Button>
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

export default HotSalesCarousel;
