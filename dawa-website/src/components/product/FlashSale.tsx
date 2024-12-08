// components/FlashSale.tsx
'use client';
import Link from 'next/link';
import CustomImage from '../common/CustomImage';
import React, { useEffect, useState } from 'react';
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
    handleResize();

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
  {
    id: 5,
    name: 'Apple Watch Series 7',
    price: 'UGX25,000',
    stockLeft: 15,
    totalStock: 100,
    imageUrl:
      'https://images.unsplash.com/photo-1593642532444-44d02e8e96c5?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: 6,
    name: 'Samsung Galaxy S21 Ultra',
    price: 'UGX35,000',
    stockLeft: 10,
    totalStock: 100,
    imageUrl:
      'https://images.unsplash.com/photo-1593642532444-44d02e8e96c5?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: 7,
    name: 'Sony PlayStation 5',
    price: 'UGX25,000',
    stockLeft: 20,
    totalStock: 100,
    imageUrl:
      'https://images.unsplash.com/photo-1593642532444-44d02e8e96c5?w=500&auto=format&fit=crop&q=60',
  },
];

const FlashSale: React.FC = () => {
  const size = useWindowSize();
  const [itemsPerView, setItemsPerView] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Adjust itemsPerView based on screen size
  useEffect(() => {
    if (size.width) {
      if (size.width < 640) {
        // Mobile
        setItemsPerView(1);
      } else if (size.width >= 640 && size.width < 768) {
        // Small tablet
        setItemsPerView(2);
      } else if (size.width >= 768 && size.width < 1024) {
        // Medium tablet
        setItemsPerView(3);
      } else {
        // Desktop and above
        setItemsPerView(4);
      }
      setCurrentIndex(0); // Reset to first slide on resize
    }
  }, [size.width]);

  // Auto-scroll functionality
  useEffect(() => {
    const autoScroll = () => {
      setCurrentIndex((prevIndex) => {
        const newIndex = prevIndex + 1;
        return newIndex >= products.length ? 0 : newIndex;
      });
    };

    const interval = setInterval(autoScroll, 3000);

    return () => clearInterval(interval);
  }, [itemsPerView]);

  // Calculate translation based on the current index and itemsPerView
  const translateX = -(currentIndex * (100 / itemsPerView));

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

  // Determine if carousel is scrollable
  const isCarouselScrollable = products.length > itemsPerView;

  return (
    <div className="w-full py-6 container mx-auto bg-primary_1 md:rounded-xl relative overflow-hidden">
      <div className="px-4 flex flex-col lg:flex-row items-center">
        {/* Left Section with Countdown */}
        <div className="lg:w-4/12 w-full flex flex-col items-start gap-4 text-white text-center lg:text-left relative z-10">
          <h2 className="text-3xl font-bold">Flash Sale</h2>
          <p className="text-sm">
            Limited time offer! Grab your favorite products at unbeatable
            prices.
          </p>
          <div className="text-4xl font-bold">{formatTime(timeLeft)}</div>
        </div>

        {/* Right Section with Carousel */}
        <div className="lg:w-8/12 w-full py-1 relative z-10">
          {/* Carousel Container with Overflow Hidden */}
          <div className="overflow-hidden relative w-full">
            {/* Carousel Inner with Dynamic TranslateX */}
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(${translateX}%)`,
                width: `${(products.length * 100) / itemsPerView}%`,
                gap: '16px',
              }}
            >
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl p-4 shadow-lg flex md:flex-row md:items-center gap-4"
                  style={{
                    flex: `0 0 ${100 / itemsPerView}%`,
                  }}
                >
                  <div className="relative w-28 h-28 rounded-xl overflow-hidden flex-shrink-0">
                    <CustomImage
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      style={{ objectFit: 'cover', borderRadius: 10 }}
                    />
                  </div>
                  <div className="flex flex-col justify-center h-full items-start">
                    <h3 className="font-semibold text-black text-sm lg:text-base">
                      {product.name}
                    </h3>
                    <div>
                      <div className="flex justify-between flex-wrap gap-2 items-center">
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
          {isCarouselScrollable && (
            <div className="flex justify-center mt-4 space-x-2">
              {products.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'w-6 bg-white'
                      : 'w-2 bg-gray-400/45'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
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
