'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';

import { Progress } from '@/components/ui/progress';

// Reusable useWindowSize Hook
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
    handleResize(); // Initial setting

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

interface Product {
  id: number;
  name: string;
  price: string;
  stockLeft: number;
  totalStock: number;
  imageUrl: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Fitness and Activity Tracker',
    price: 'UGX32,000',
    stockLeft: 24,
    totalStock: 100,
    imageUrl:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80',
  },
  {
    id: 2,
    name: 'Xbox White Joystick',
    price: 'UGX32,000',
    stockLeft: 24,
    totalStock: 100,
    imageUrl:
      'https://images.unsplash.com/photo-1612801799890-4ba4760b6590?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: 3,
    name: 'Smart Watch Series 6',
    price: 'UGX25,000',
    stockLeft: 15,
    totalStock: 100,
    imageUrl:
      'https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: 4,
    name: 'Wireless Earbuds Pro',
    price: 'UGX18,000',
    stockLeft: 30,
    totalStock: 100,
    imageUrl:
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&auto=format&fit=crop&q=60',
  },
];

const FlashSale: React.FC = () => {
  const size = useWindowSize();
  const [itemsPerView, setItemsPerView] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);

  // Fixed card dimensions
  const CARD_WIDTH = 448; // Fixed card width in pixels
  const CARD_HEIGHT = 150; // Fixed card height in pixels
  const CARD_MARGIN = 16; // Gap between cards

  // Adjust itemsPerView based on screen size and fixed card width
  useEffect(() => {
    if (size.width) {
      setItemsPerView(Math.floor(size.width / (CARD_WIDTH + CARD_MARGIN)));
    }
  }, [size.width]);

  // Auto-scroll functionality
  useEffect(() => {
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
    }

    autoScrollRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
    }, 3000); // 3 seconds

    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, []);

  // Calculate translation based on the current index
  const translateX = -currentIndex * (CARD_WIDTH + CARD_MARGIN);

  // Countdown timer (e.g., 5 hours)
  const [timeLeft, setTimeLeft] = useState(5 * 60 * 60);
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format time as HH : MM : SS
  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, '0');
    const mins = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${hrs} : ${mins} : ${secs}`;
  };

  return (
    <div className="w-full py-6 container mx-auto bg-primary_1 md:rounded-xl relative overflow-hidden">
      <div className="px-4 flex flex-col lg:flex-row items-center">
        {/* Left Section with Countdown */}
        <div className="lg:w-4/12 w-full flex flex-col items-start gap-4  text-white text-center lg:text-left lg:mb-0 relative z-10">
          <h2 className="text-3xl font-bold">Flash Sale</h2>
          <p className="text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore
          </p>
          <div className="text-4xl font-bold">{formatTime(timeLeft)}</div>
        </div>

        {/* Right Section with Carousel */}
        <div className="lg:w-8/12 w-full py-1 relative z-10">
          {/* Carousel Container with Fixed Width */}
          <div
            className="flex overflow-hidden"
            style={{
              maxWidth: itemsPerView * (CARD_WIDTH + CARD_MARGIN),
            }}
          >
            {/* Carousel Inner with Dynamic TranslateX */}
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(${translateX}px)`,
                gap: `${CARD_MARGIN}px`,
              }}
            >
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl p-4 shadow-lg flex items-center"
                  style={{
                    width: `${CARD_WIDTH}px`,
                    height: `${CARD_HEIGHT}px`,
                    flexShrink: 0,
                  }}
                >
                  <div className="relative w-28 h-full rounded-xl overflow-hidden flex-shrink-0">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="112px"
                      priority={false}
                      loading="lazy"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between h-full py-2 ml-4">
                    <h3 className="font-semibold text-black text-sm lg:text-base">
                      {product.name}
                    </h3>
                    <div>
                      <div className="flex justify-between items-center">
                        <p className="text-primary_1 font-bold text-sm lg:text-base">
                          {product.price}
                        </p>
                        <span className="text-xs text-gray-400">
                          {product.stockLeft} left
                        </span>
                      </div>
                      <Progress
                        value={(product.stockLeft / product.totalStock) * 100}
                        className="mt-1 bg-primary_2"
                        indicatorClassName="bg-primary_1"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-start mt-4 ml-4 space-x-2">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'w-6 bg-white' : 'w-2 bg-gray-400/45'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Background Overlay (Optional) */}
        <div className="absolute inset-0 bg-[url('/path-to-background-image.jpg')] bg-cover opacity-20 lg:opacity-30 pointer-events-none"></div>

        {/* View More Link */}
        <Link
          href="#"
          className="absolute bottom-4 right-6 text-white text-sm underline z-10"
        >
          View more
        </Link>
      </div>
    </div>
  );
};

export default FlashSale;
