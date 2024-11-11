'use client';
import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface Product {
  id: number;
  name: string;
  price: string;
  originalPrice?: string;
  imageUrl: string;
}

const products: Product[] = [
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
    name: 'Digital Camera XF-21',
    price: 'UGX2,000,000',
    originalPrice: 'UGX2,500,000',
    imageUrl:
      'https://images.unsplash.com/photo-1460134846237-51c777df6111?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8RGlnaXRhbCUyMENhbWVyYSUyMFhGJTIwMjF8ZW58MHx8MHx8fDA%3D',
  },
  {
    id: 3,
    name: 'Ultra Book Thin Laptop XL-01',
    price: 'UGX2,895,345',
    originalPrice: 'UGX4,800,000',
    imageUrl:
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80',
  },
  {
    id: 4,
    name: '1 Set Magic Equipments',
    price: 'UGX2,500,500',
    originalPrice: 'UGX2,900,000',
    imageUrl:
      'https://images.unsplash.com/photo-1504802469493-cad9b622c4f7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8MSUyMFNldCUyME1hZ2ljJTIwRXF1aXBtZW50c3xlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    id: 5,
    name: 'LED Monitor 24” With High Quality',
    price: 'UGX3,000,000',
    originalPrice: 'UGX3,500,000',
    imageUrl:
      'https://images.unsplash.com/photo-1457305237443-44c3d5a30b89?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8TEVEJTIwTW9uaXRvciUyMDI0JUUyJTgwJTlEJTIwV2l0aCUyMEhpZ2glMjBRdWFsaXR5fGVufDB8fDB8fHww',
  },
];

const PopularSearchCarousel: React.FC = () => {
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
                onClick={() => console.log('clicked', product.id)}
                className="flex-shrink-0 w-[250px] h-[355px] mr-9 cursor-pointer last:mr-0"
                style={{ marginRight: `${cardMargin}px` }}
              >
                <div className="bg-white rounded-2xl shadow-md overflow-hidden h-full">
                  <div className="relative w-full h-56">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-t-2xl"
                    />
                  </div>
                  <div className="p-4 text-center">
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
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularSearchCarousel;
