'use client';

import * as React from 'react';
import { ProductCarouselItem } from '@/types/category';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import CustomImage from '@/components/common/CustomImage';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface ProductCarouselProps {
  items: ProductCarouselItem[];
}

export function ProductCarousel({ items }: ProductCarouselProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const totalItems = items.length;

  // Auto-slide interval setup
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === totalItems - 1 ? 0 : prevIndex + 1,
      );
    }, 5000); // Slide every 5 seconds

    return () => clearInterval(interval);
  }, [totalItems]);

  // Handle dot navigation
  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  // Extract the current item based on currentIndex
  const currentItem = items[currentIndex];

  // Prevent rendering if items array is empty
  if (totalItems === 0) {
    return null;
  }

  return (
    <div className="relative h-full w-full overflow-hidden bg-gray-100">
      <AnimatePresence>
        <motion.div
          key={currentItem.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 flex"
        >
          {/* Text Content */}
          <div className="w-1/2 p-6 flex flex-col justify-center">
            <h3 className="font-bold mb-2 text-lg md:text-xl lg:text-2xl leading-snug">
              {currentItem.title}
            </h3>
            <p className="text-sm md:text-base lg:text-lg text-gray-600 mb-4 leading-relaxed">
              {currentItem.description}
            </p>
            <div className="flex items-baseline mb-4">
              <span className="text-md md:text-lg lg:text-xl font-bold">
                ${currentItem.price.toFixed(2)}
              </span>
              {currentItem.discountPercentage && (
                <span className="ml-2 text-sm md:text-base lg:text-lg text-green-600 font-semibold">
                  {currentItem.discountPercentage}% OFF
                </span>
              )}
            </div>
            <Button size="sm" asChild className="max-w-[150px]">
              <Link
                href={`/prod/${currentItem.id}`}
                className="text-sm md:text-base lg:text-md"
              >
                View Details
              </Link>
            </Button>
          </div>
          {/* Image Content */}
          <div className="w-1/2 h-full">
            <CustomImage
              src={currentItem.imageUrl}
              alt={currentItem.title}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {items.map((_, index) => (
          <button
            key={index}
            className={cn(
              'w-3 h-3 rounded-full transition-colors duration-300',
              index === currentIndex ? 'bg-primary_1' : 'bg-gray-300',
            )}
            onClick={() => handleDotClick(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
