'use client';

import * as React from 'react';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Category } from '@/types/category';
import { categories, productCarouselItems } from '@/lib/mock_data';
import { ProductCarousel } from '../carousels/product-carousel';
import { Button } from '@/components/ui/button';
import { PostAdvertCTA } from './post-advert-cta';
import { SafetyTips } from './safety-tips';
import { CategoryItem } from './CategoryItem';
import { MobileCategoryGrid } from './MobileCategoryGrid';
import { SubcategoryList } from './SubcategoryList';

const INITIAL_VISIBLE_CATEGORIES = 9;

export function CategoriesMenu() {
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);

  const visibleCategories = categories.slice(0, INITIAL_VISIBLE_CATEGORIES);
  const hiddenCategories = categories.slice(INITIAL_VISIBLE_CATEGORIES);
  const displayCategories = showAllCategories ? categories : visibleCategories;

  const handleMouseEnter = (category: Category) => {
    setActiveCategory(category);
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <div className="w-full container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Mobile Categories Grid */}
        <div className="lg:hidden">
          <MobileCategoryGrid categories={categories} />
        </div>

        {/* Desktop Categories and Carousel Section */}
        <div
          className="hidden lg:flex flex-col sm:flex-row h-[400px] flex-1 rounded-lg border bg-background shadow-sm overflow-hidden"
          onMouseLeave={handleMouseLeave}
        >
          {/* Categories */}
          <div className="w-full sm:w-64 flex flex-col border-b sm:border-b-0 sm:border-r">
            <div className="flex-1 overflow-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              <nav className="flex flex-col">
                {displayCategories.map((category) => (
                  <CategoryItem
                    key={category.name}
                    category={category}
                    isActive={
                      activeCategory?.name === category.name && isHovering
                    }
                    onMouseEnter={() => handleMouseEnter(category)}
                  />
                ))}
              </nav>
            </div>
            {hiddenCategories.length > 0 && (
              <div className="p-3 border-t">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-between text-xs hover:bg-accent"
                  onClick={() => setShowAllCategories(!showAllCategories)}
                >
                  <span className="flex items-center gap-2">
                    <ChevronDown
                      className={cn(
                        'h-4 w-4 transition-transform duration-200',
                        showAllCategories && 'rotate-180',
                      )}
                    />
                    {showAllCategories
                      ? 'Show Less'
                      : `${hiddenCategories.length} More Categories`}
                  </span>
                </Button>
              </div>
            )}
          </div>

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
            {/* Subcategories */}
            <SubcategoryList
              activeCategory={activeCategory}
              isHovering={isHovering}
            />
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
