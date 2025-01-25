'use client';

import * as React from 'react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { productCarouselItems } from '@/lib/mock_data';
import { ProductCarousel } from '../carousels/product-carousel';
import { PostAdvertCTA } from './post-advert-cta';
import { SafetyTips } from './safety-tips';
import MobileCategoryGrid from './MobileCategoryGrid';

export function CategoriesMenu() {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Mobile Categories Grid */}
        <div className="lg:hidden">
          <MobileCategoryGrid />
        </div>

        {/* Desktop Categories and Carousel Section */}
        <div
          className="hidden lg:flex flex-col sm:flex-row h-[400px] flex-1 rounded-lg border bg-background shadow-sm overflow-hidden"
          onMouseLeave={handleMouseLeave}
        >
          {/* Subcategories and Product Carousel */}
          <div className="relative flex-1 overflow-hidden">
            {/* Product Carousel */}
            <div
              className={cn(
                'absolute inset-0 transition-opacity duration-300 ease-in-out',
                isHovering ? 'opacity-0 pointer-events-none' : 'opacity-100',
              )}
            >
              <ProductCarousel items={productCarouselItems} />
            </div>
          </div>
        </div>

        {/* Right Side Section */}
        <div className="hidden lg:flex flex-col sm:flex-row lg:flex-col w-full lg:w-64 gap-5">
          <PostAdvertCTA />
          <SafetyTips />
        </div>
      </div>
    </div>
  );
}
