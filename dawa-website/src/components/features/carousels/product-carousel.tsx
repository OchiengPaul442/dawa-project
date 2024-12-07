'use client';

import * as React from 'react';

import { ProductCarouselItem } from '@/types/category';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import CustomImage from '../../common/CustomImage';
import Link from 'next/link';

interface ProductCarouselProps {
  items: ProductCarouselItem[];
}

export function ProductCarousel({ items }: ProductCarouselProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === items.length - 1 ? 0 : prevIndex + 1,
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [items.length]);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-lg bg-gray-100">
      {items.map((item, index) => (
        <div
          key={item.id}
          className={cn(
            'absolute inset-0 flex transition-opacity duration-1000 ease-in-out',
            index === currentIndex ? 'opacity-100' : 'opacity-0',
          )}
        >
          <div className="w-1/2 p-4 flex flex-col justify-center">
            <h3 className="font-bold mb-1 text-xs md:text-base lg:text-xl">
              {item.title}
            </h3>
            <p className="text-xs md:text-sm lg:text-lg text-gray-600 mb-2">
              {item.description}
            </p>
            <div className="flex items-baseline mb-2">
              <span className="text-xs md:text-sm lg:text-lg font-bold">
                ${item.price.toFixed(2)}
              </span>
              {item.discountPercentage && (
                <span className="ml-2 text-xs md:text-sm lg:text-lg text-green-600 font-semibold">
                  {item.discountPercentage}% OFF
                </span>
              )}
            </div>
            <Button size="sm" asChild className="max-w-[200px]">
              <Link href={`/prod/${item.id}`} className="text-xs">
                {item.ctaText}
              </Link>
            </Button>
          </div>
          <div className="w-1/2 h-full">
            <CustomImage
              src={item.imageUrl}
              alt={item.title}
              className="h-full w-full"
            />
          </div>
        </div>
      ))}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
        {items.map((_, index) => (
          <button
            key={index}
            className={cn(
              'w-2 h-2 rounded-full transition-colors duration-300',
              index === currentIndex ? 'bg-primary_1' : 'bg-primary_2',
            )}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
