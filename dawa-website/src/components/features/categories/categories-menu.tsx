'use client';

import * as React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronDown, Plus } from 'lucide-react';
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
    <div className="w-full container mx-auto px-4 mt-8">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Mobile Categories Grid */}
        <div className="lg:hidden grid grid-cols-3 sm:grid-cols-4">
          <Link
            href="/post-ad"
            className="flex flex-col items-center justify-center p-4 bg-primary_1 text-white aspect-square"
          >
            <div className="rounded-full bg-white/20 p-3 mb-2">
              <Plus className="h-5 w-5" />
            </div>
            <span className="text-xs text-center truncate w-full">Post ad</span>
          </Link>
          {categories.map((category) => {
            const Icon = category.icon;
            const categorySlug = slugify(category.name);
            return (
              <Link
                key={category.name}
                href={`/cat/${categorySlug}`}
                className="flex flex-col items-center justify-center p-4 border-r border-b bg-background aspect-square"
              >
                <div className="rounded-full bg-muted p-3 mb-2">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-xs text-center truncate w-full">
                  {category.name}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Desktop Categories and Carousel Section */}
        <div
          className="hidden lg:flex flex-col sm:flex-row h-auto sm:h-[310px] flex-1 rounded-lg border bg-background shadow-sm"
          onMouseLeave={handleMouseLeave}
        >
          {/* Categories */}
          <div className="w-full sm:w-56 lg:w-64 flex flex-col border-b sm:border-b-0 sm:border-r">
            <div className="flex-1 overflow-auto px-2 pt-2">
              <nav className="flex flex-col gap-2">
                {displayCategories.map((category) => {
                  const Icon = category.icon;
                  const categorySlug = slugify(category.name);
                  return (
                    <Link
                      key={category.name}
                      href={`/cat/${categorySlug}`}
                      className={cn(
                        'group flex items-center justify-between gap-2 rounded-lg px-2 py-1 text-xs sm:text-sm transition-colors hover:bg-accent',
                        activeCategory?.name === category.name &&
                          isHovering &&
                          'bg-accent',
                      )}
                      onMouseEnter={() => handleMouseEnter(category)}
                    >
                      <div className="flex items-center gap-2 overflow-hidden">
                        <Icon className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                        <span className="truncate font-medium">
                          {category.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <span className="text-[10px] sm:text-xs">
                          ({category.count.toLocaleString()})
                        </span>
                        <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0 transition-transform group-hover:translate-x-0.5" />
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
                  className="w-full justify-between rounded-lg text-[10px] sm:text-xs"
                  onClick={() => setShowAllCategories(!showAllCategories)}
                >
                  <span className="flex items-center gap-1">
                    <ChevronDown
                      className={cn(
                        'h-3 w-3 sm:h-4 sm:w-4 transition-transform duration-200',
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
                isHovering ? 'opacity-0' : 'opacity-100',
              )}
            >
              <ProductCarousel items={productCarouselItems} />
            </div>
            {/* Subcategories */}
            <div
              className={cn(
                'absolute inset-0 overflow-auto bg-background p-4 transition-opacity rounded-r-lg duration-300 ease-in-out',
                isHovering
                  ? 'opacity-100 pointer-events-auto'
                  : 'opacity-0 pointer-events-none',
              )}
            >
              {activeCategory && (
                <div className="grid gap-4">
                  <div>
                    <h2 className="flex items-center gap-2 text-[10px] sm:text-sm font-semibold">
                      {React.createElement(activeCategory.icon, {
                        className: 'h-4 w-4 sm:h-5 sm:w-5',
                      })}
                      {activeCategory.name}
                    </h2>
                    <p className="text-[10px] sm:text-xs text-muted-foreground">
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
                          className="flex items-start gap-2 rounded-lg border p-2 sm:p-3 transition-colors hover:bg-accent text-[10px] sm:text-sm"
                        >
                          <Icon className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
                          <div className="grid gap-0.5 overflow-hidden">
                            <span className="font-medium truncate">
                              {subcategory.name}
                            </span>
                            <span className="text-[10px] sm:text-xs text-muted-foreground">
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
        <div className="hidden lg:flex flex-col sm:flex-row lg:flex-col w-full lg:w-[200px] gap-4">
          <PostAdvertCTA />
          <SafetyTips />
        </div>
      </div>
    </div>
  );
}
