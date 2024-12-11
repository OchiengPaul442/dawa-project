'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Top10ProductCard from '@/components/ProductCards/Top10ProductCard';
import { useLikeableItems } from '@/hooks/useLikeableItems';
import { Product } from '@/types/product';
import useEmblaCarousel from 'embla-carousel-react';
import AutoplayPlugin from 'embla-carousel-autoplay';

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
  const { items: products, toggleLike } = useLikeableItems(initialProducts);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'start',
      slidesToScroll: 1,
    },
    [AutoplayPlugin({ delay: 3000, stopOnInteraction: false })],
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
    <div className="w-full bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-start gap-8">
          <div className="w-full lg:w-1/4">
            <h2 className="text-2xl lg:text-3xl font-semibold mb-4">
              Top 10 Selected Products Of The Week
            </h2>
            <div className="flex space-x-2">
              <button
                onClick={scrollPrev}
                disabled={!prevBtnEnabled}
                className="p-2 rounded-full border border-gray-300 shadow text-gray-600 hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Previous Products"
              >
                <FaChevronLeft />
              </button>
              <button
                onClick={scrollNext}
                disabled={!nextBtnEnabled}
                className="p-2 rounded-full border border-gray-300 shadow text-gray-600 hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Next Products"
              >
                <FaChevronRight />
              </button>
            </div>
          </div>

          <div className="w-full lg:w-3/4">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex -ml-9 mb-2">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="flex-shrink-0 min-w-[250px] pl-9"
                  >
                    <Top10ProductCard product={product} onLike={toggleLike} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Top10ProductCarousel;
