'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { PopularSearchProductCard } from '@/components/ProductCards/PopularSearchProductCard';
import useWindowSize from '@core/hooks/useWindowSize';
import { useLikeableItems } from '@core/hooks/useLikeableItems';
import { Product } from '@/types/product';
import useEmblaCarousel from 'embla-carousel-react';
import AutoplayPlugin from 'embla-carousel-autoplay';

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
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&q=80',
  },
  {
    id: 3,
    name: 'iPhone 12 Pro Max 256GB',
    price: 'UGX1,099,000',
    originalPrice: 'UGX1,299,000',
    imageUrl:
      'https://images.unsplash.com/photo-1603891128711-11b4b03bb138?w=500&q=80',
  },
  {
    id: 4,
    name: 'Sony PlayStation 5',
    price: 'UGX1,299,000',
    originalPrice: 'UGX1,499,000',
    imageUrl:
      'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500&q=80',
  },
  {
    id: 5,
    name: 'Xbox Series X 512GB',
    price: 'UGX1,299,000',
    originalPrice: 'UGX1,499,000',
    imageUrl:
      'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=500&q=80',
  },
  {
    id: 6,
    name: 'Nintendo Switch Lite',
    price: 'UGX1,299,000',
    originalPrice: 'UGX1,499,000',
    imageUrl:
      'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=500&q=80',
  },
  {
    id: 7,
    name: 'Microsoft Surface Pro 7',
    price: 'UGX1,299,000',
    originalPrice: 'UGX1,499,000',
    imageUrl:
      'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&q=80',
  },
  {
    id: 8,
    name: 'Apple Watch Series 6 40mm',
    price: 'UGX1,299,000',
    originalPrice: 'UGX1,499,000',
    imageUrl:
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&q=80',
  },
];

const PopularSearchCarousel: React.FC = () => {
  const { width } = useWindowSize();
  const { items: products, toggleLike } = useLikeableItems(initialProducts);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: false,
      align: 'start',
      slidesToScroll: 1,
      containScroll: 'trimSnaps',
    },
    [AutoplayPlugin({ delay: 5000, stopOnInteraction: false })],
  );

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(true);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi],
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="w-full py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Popular Search</h2>
          <div className="flex space-x-2">
            <button
              onClick={scrollPrev}
              disabled={!prevBtnEnabled}
              className={`p-2 text-xl rounded-full transition ${
                !prevBtnEnabled
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-primary_1 hover:bg-gray-200'
              }`}
              aria-label="Previous item"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={scrollNext}
              disabled={!nextBtnEnabled}
              className={`p-2 text-xl rounded-full transition ${
                !nextBtnEnabled
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-primary_1 hover:bg-gray-200'
              }`}
              aria-label="Next item"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -ml-9 mb-2">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex-shrink-0 min-w-[250px] pl-9"
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
