'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import useEmblaCarousel from 'embla-carousel-react';
import AutoplayPlugin from 'embla-carousel-autoplay';
import RecentlyViewedCard from '../../ProductCards/RecentlyViewedCard';

interface Product {
  id: number;
  name: string;
  price: string;
  imageUrl: string;
  rating: number;
  reviews: number;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Fitness and Activity Tracker',
    price: 'UGX32,000',
    imageUrl:
      'https://images.unsplash.com/photo-1654195131868-cac1d8429d86?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Rml0bmVzcyUyMGFuZCUyMEFjdGl2aXR5JTIwVHJhY2tlcnxlbnwwfHwwfHx8MA%3D%3D',
    rating: 3,
    reviews: 12,
  },
  {
    id: 2,
    name: 'Xbox White Joystick',
    price: 'UGX102,000',
    imageUrl:
      'https://images.unsplash.com/photo-1612801799890-4ba4760b6590?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8WGJveCUyMFdoaXRlJTIwSm95c3RpY2t8ZW58MHx8MHx8fDA%3D',
    rating: 4,
    reviews: 18,
  },
  {
    id: 3,
    name: 'Super Boost Headphones',
    price: 'UGX32,000',
    imageUrl:
      'https://images.unsplash.com/photo-1593697909822-5d9da12b4680?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fFN1cGVyJTIwQm9vc3QlMjBIZWFkcGhvbmVzfGVufDB8fDB8fHww',
    rating: 3,
    reviews: 10,
  },
  {
    id: 4,
    name: 'Ice White Airpods',
    price: 'UGX1,200,000',
    imageUrl:
      'https://images.unsplash.com/photo-1556607173-eca49c3c4f47?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8V2hpdGUlMjBBaXJwb2RzfGVufDB8fDB8fHww',
    rating: 4,
    reviews: 20,
  },
  {
    id: 5,
    name: 'Hazer Mouse Gaming',
    price: 'UGX25,000',
    imageUrl:
      'https://images.unsplash.com/photo-1520609930-0fe8db30fd0b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG1vdXNlfGVufDB8fDB8fHww',
    rating: 3,
    reviews: 15,
  },
  {
    id: 6,
    name: 'Samsung Galaxy S21 Ultra',
    price: 'UGX1,200,000',
    imageUrl:
      'https://images.unsplash.com/photo-1610792516286-524726503fb2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8U2Ftc3VuZyUyMEdhbGF4eSUyMFMyMSUyMFVsdHJhfGVufDB8fDB8fHww',
    rating: 4,
    reviews: 25,
  },
  {
    id: 7,
    name: 'Sony PlayStation 5',
    price: 'UGX1,200,000',
    imageUrl:
      'https://images.unsplash.com/photo-1678761442615-5af77170f925?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8U29ueSUyMFBsYXlTdGF0aW9uJTIwNXxlbnwwfHwwfHx8MA%3D%3D',
    rating: 4,
    reviews: 20,
  },
  {
    id: 8,
    name: 'Nintendo Switch Lite',
    price: 'UGX1,200,000',
    imageUrl:
      'https://images.unsplash.com/photo-1569089630965-daa2d5aa3860?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TmludGVuZG8lMjBTd2l0Y2glMjBMaXRlfGVufDB8fDB8fHww',
    rating: 4,
    reviews: 25,
  },
];

const RecentlyViewedCarousel: React.FC = () => {
  const router = useRouter();
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

  const handleProductClick = useCallback(
    (productId: number) => {
      router.push(`/prod/${productId}`);
    },
    [router],
  );

  return (
    <div className="w-full py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl flex items-center font-semibold">
            Recently viewed
          </h2>
          <div className="flex space-x-2">
            <button
              onClick={scrollPrev}
              disabled={!prevBtnEnabled}
              className={`p-2 text-xl rounded-full transition ${
                !prevBtnEnabled
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-primary_1 hover:bg-gray-200'
              }`}
              aria-label="Previous items"
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
              aria-label="Next items"
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
                className="flex-shrink-0 min-w-[273px] pl-9"
              >
                <RecentlyViewedCard
                  product={product}
                  onClick={() => handleProductClick(product.id)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentlyViewedCarousel;
