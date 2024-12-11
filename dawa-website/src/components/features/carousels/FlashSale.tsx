'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FlashSaleCard } from '../../ProductCards/FlashSaleCard';
import { Product } from '@/types/flash-sale';
import { Button } from '@/components/ui/button';
import { Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import AutoplayPlugin from 'embla-carousel-autoplay';

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

const FlashSale = () => {
  const [timeLeft, setTimeLeft] = useState(5 * 60 * 60); // 5 hours in seconds
  const router = useRouter();

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start' },
    [AutoplayPlugin({ delay: 5000, stopOnInteraction: false })],
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = useCallback((seconds: number) => {
    const hrs = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, '0');
    const mins = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
  }, []);

  const handleProductClick = (productId: number) => {
    router.push(`/prod/${productId}`);
  };

  return (
    <div className="w-full bg-gradient-to-r container mx-auto from-primary_1 to-orange-500 py-8 px-4 md:rounded-2xl shadow-lg">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8">
          <div className="space-y-3">
            <h2 className="text-white text-3xl font-bold">Flash Sale</h2>
            <p className="text-white/90 text-sm">
              Limited time offer! Grab your favorite products at unbeatable
              prices.
            </p>
          </div>
          <div className="flex items-center bg-white/20 rounded-lg px-4 py-2 mt-4 lg:mt-0">
            <Clock className="text-white mr-2" />
            <div className="text-white text-2xl font-bold font-mono">
              {formatTime(timeLeft)}
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] xl:flex-[0_0_25%] px-2"
                >
                  <FlashSaleCard
                    product={product}
                    onClick={() => handleProductClick(product.id)}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="absolute -bottom-[100px] left-0 flex space-x-2 mb-4 ml-4">
            <button
              onClick={scrollPrev}
              className="h-8 w-8 rounded-full bg-white/50 hover:bg-white/75 flex items-center justify-center"
            >
              <ChevronLeft className="h-4 w-4 text-primary_1" />
            </button>
            <button
              onClick={scrollNext}
              className="h-8 w-8 rounded-full bg-white/50 hover:bg-white/75 flex items-center justify-center"
            >
              <ChevronRight className="h-4 w-4 text-primary_1" />
            </button>
          </div>
        </div>

        <div className="mt-16 text-right">
          <Button
            asChild
            variant="link"
            className="text-white hover:text-white/80"
          >
            <Link href="#">View more</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FlashSale;
