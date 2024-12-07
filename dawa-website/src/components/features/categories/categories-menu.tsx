'use client';

import * as React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { slugify } from '@/utils/slugify';
import { Category } from '@/types/category';
import { categories, productCarouselItems } from '@/lib/mock_data';
import { ProductCarousel } from '../carousels/product-carousel';
import { Button } from '@/components/ui/button';
import { PostAdvertCTA } from './post-advert-cta';
import { SafetyTips } from './safety-tips';

const INITIAL_VISIBLE_CATEGORIES = 9;

export function CategoriesMenu() {
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);

  const visibleCategories = categories.slice(0, INITIAL_VISIBLE_CATEGORIES);
  const hiddenCategories = categories.slice(INITIAL_VISIBLE_CATEGORIES);

  const handleMouseEnter = (category: Category) => {
    setActiveCategory(category);
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const displayCategories = showAllCategories ? categories : visibleCategories;

  return (
    <div className="w-full container mx-auto px-4 mt-12">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Categories and Carousel Section */}
        <div
          className="flex flex-col sm:flex-row h-[310px] flex-1 rounded-lg border bg-background shadow-sm"
          onMouseLeave={handleMouseLeave}
        >
          {/* Categories */}
          <div className="w-full sm:w-56 lg:w-64 flex flex-col border-b sm:border-b-0 sm:border-r">
            <div className="flex-1 overflow-auto px-2 pt-2">
              <nav className="flex flex-col gap-1">
                {displayCategories.map((category) => {
                  const Icon = category.icon;
                  const categorySlug = slugify(category.name);
                  return (
                    <Link
                      key={category.name}
                      href={`/cat/${categorySlug}`}
                      className={cn(
                        'group flex items-center justify-between gap-2 rounded-lg px-2 py-1 text-xs transition-colors hover:bg-accent',
                        activeCategory?.name === category.name &&
                          isHovering &&
                          'bg-accent',
                      )}
                      onMouseEnter={() => handleMouseEnter(category)}
                    >
                      <div className="flex items-center text-[10px] md:text-sm gap-2 overflow-hidden">
                        <Icon className="h-3 w-3 flex-shrink-0" />
                        <span className="truncate">{category.name}</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <span className="text-[10px]">
                          ({category.count.toLocaleString()})
                        </span>
                        <ChevronRight className="h-2 w-2 flex-shrink-0 transition-transform group-hover:translate-x-0.5" />
                      </div>
                    </Link>
                  );
                })}
              </nav>
            </div>
            {hiddenCategories.length > 0 && (
              <div className="p-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-between rounded-lg text-[10px]"
                  onClick={() => setShowAllCategories(!showAllCategories)}
                >
                  <span className="flex items-center gap-1">
                    <ChevronDown
                      className={cn(
                        'h-2 w-2 transition-transform duration-200',
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
            <div
              className="absolute inset-0 transition-opacity duration-300 ease-in-out"
              style={{ opacity: isHovering ? 0 : 1 }}
            >
              <ProductCarousel items={productCarouselItems} />
            </div>
            <div
              className="absolute inset-0 overflow-auto bg-background p-4 transition-opacity rounded-r-lg duration-300 ease-in-out"
              style={{
                opacity: isHovering ? 1 : 0,
                pointerEvents: isHovering ? 'auto' : 'none',
              }}
            >
              {activeCategory && (
                <div className="grid gap-4">
                  <div>
                    <h2 className="flex items-center gap-2 text-[10px] md:text-sm font-semibold">
                      {React.createElement(activeCategory.icon, {
                        className: 'h-3 w-3',
                      })}
                      {activeCategory.name}
                    </h2>
                    <p className="text-[10px] text-muted-foreground">
                      {activeCategory.count.toLocaleString()} items
                    </p>
                  </div>
                  <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {activeCategory.subcategories.map((subcategory) => {
                      const Icon = subcategory.icon;
                      const categorySlug = slugify(activeCategory.name);
                      const subcategorySlug = slugify(subcategory.name);
                      return (
                        <Link
                          key={subcategory.name}
                          href={`/cat/${categorySlug}/${subcategorySlug}`}
                          className="flex items-start gap-2 rounded-lg border p-1.5 transition-colors hover:bg-accent text-[10px] md:text-sm"
                        >
                          <Icon className="h-3 w-3 shrink-0" />
                          <div className="grid gap-0.5 overflow-hidden">
                            <span className="font-medium text-xs truncate">
                              {subcategory.name}
                            </span>
                            <span className="text-[10px] text-muted-foreground">
                              {subcategory.count.toLocaleString()} items
                            </span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Side Section */}
        <div className="flex flex-col sm:flex-row lg:flex-col w-full lg:w-[200px] gap-4">
          <PostAdvertCTA />
          <SafetyTips />
        </div>
      </div>
    </div>
  );
}
