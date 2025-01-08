'use client';

import * as React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import AutoplayPlugin from 'embla-carousel-autoplay';
import { Button } from '@/components/ui/button';
import { ProductCarouselItem } from '@/types/category';
import CustomImage from '@/components/shared/CustomImage';
import Link from 'next/link';

interface ProductCarouselProps {
  items: ProductCarouselItem[];
}

export function ProductCarousel({ items }: ProductCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, skipSnaps: false },
    [AutoplayPlugin({ delay: 5000, stopOnInteraction: false })],
  );

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  React.useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on('select', onSelect);
    onSelect();

    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  if (!items.length) return null;

  return (
    <div className="relative h-full overflow-hidden">
      <div className="absolute inset-0" ref={emblaRef}>
        <div className="flex h-full">
          {items.map((item) => (
            <div key={item.id} className="relative flex-[0_0_100%] h-full">
              <div className="absolute inset-0 flex flex-col md:flex-row">
                <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm md:text-base line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-lg md:text-xl font-bold text-primary">
                      UGX{item.price.toLocaleString()}
                    </span>
                    {item.discountPercentage && (
                      <span className="text-sm font-semibold text-green-600">
                        {item.discountPercentage}% OFF
                      </span>
                    )}
                  </div>
                  <Button asChild className="w-fit bg-gray-700">
                    <Link href={`/prod/${item.id}`}>View Details</Link>
                  </Button>
                </div>
                <div className="w-full md:w-1/2 relative">
                  <CustomImage
                    src={item.imageUrl}
                    alt={item.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {items.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === selectedIndex ? 'bg-primary_1 w-4' : 'bg-primary_2'
            }`}
            onClick={() => emblaApi?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
