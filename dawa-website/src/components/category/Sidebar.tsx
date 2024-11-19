'use client';

import React, { useState, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { categories } from '@/lib/mock_data';

interface Subcategory {
  name: string;
  count: number;
  icon: React.ReactNode;
}

interface Category {
  name: string;
  count: number;
  subcategories?: Subcategory[];
  icon: React.ReactNode;
}

const Sidebar: React.FC = () => {
  const [hoveredCategory, setHoveredCategory] = useState<Category | null>(null);
  const [isCategoryHovered, setIsCategoryHovered] = useState(false);
  const [isSubcategoriesHovered, setIsSubcategoriesHovered] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  // Update screen size to detect large screens
  useEffect(() => {
    const handleResize = () => setIsLargeScreen(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Reset hovered category if neither category nor subcategories are hovered
  useEffect(() => {
    if (!isCategoryHovered && !isSubcategoriesHovered) {
      const timeout = setTimeout(() => setHoveredCategory(null), 200);
      return () => clearTimeout(timeout);
    }
  }, [isCategoryHovered, isSubcategoriesHovered]);

  return (
    <div className="w-full lg:w-[340px]">
      {/* Sidebar Container */}
      <div
        className={`bg-white rounded-xl border sticky top-[100px] ${
          hoveredCategory
            ? 'rounded-r-none border-r-primary_1'
            : 'rounded-xl border-gray-200'
        }`}
      >
        <ScrollArea className="h-[calc(100vh-340px)] lg:h-[calc(100vh-310px)]">
          <div className="p-4 space-y-1">
            {categories.map((category) => (
              <div
                key={category.name}
                className={`p-3 rounded-lg cursor-pointer transition-all duration-200 flex items-center justify-between ${
                  hoveredCategory?.name === category.name
                    ? 'bg-gray-100 text-primary_1'
                    : 'hover:bg-gray-50 hover:text-primary_1'
                }`}
                onMouseEnter={() => {
                  if (isLargeScreen) {
                    setHoveredCategory(category);
                    setIsCategoryHovered(true);
                  }
                }}
                onMouseLeave={() => setIsCategoryHovered(false)}
              >
                <Link
                  href={`/cat/${encodeURIComponent(category.name.toLowerCase())}`}
                  passHref
                >
                  <div className="w-full truncate">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{category.icon}</span>
                      <div className="flex flex-col items-start w-full truncate">
                        <span className="font-sm truncate">
                          {category.name}
                        </span>
                        <span className="text-xs text-gray-500 truncate">{`(${category.count.toLocaleString()})`}</span>
                      </div>
                    </div>
                  </div>
                </Link>
                {isLargeScreen && (
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Subcategories Panel */}
      {isLargeScreen && hoveredCategory && (
        <div
          className="absolute bg-white rounded-r-xl border-r border-y min-w-[340px] left-[340px] top-0 z-30"
          onMouseEnter={() => setIsSubcategoriesHovered(true)}
          onMouseLeave={() => setIsSubcategoriesHovered(false)}
        >
          <ScrollArea className="h-[calc(100vh-340px)] lg:h-[calc(100vh-310px)]">
            <div className="p-4 space-y-1">
              {hoveredCategory.subcategories?.map((subcategory) => (
                <div
                  key={subcategory.name}
                  className="p-3 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors duration-200 flex items-center justify-between"
                >
                  <Link
                    href={`/cat/${encodeURIComponent(hoveredCategory.name.toLowerCase())}/${encodeURIComponent(
                      subcategory.name.toLowerCase(),
                    )}`}
                    passHref
                  >
                    <div className="flex items-center gap-3 justify-between w-full truncate">
                      {subcategory.icon}
                      <span className="font-medium truncate">
                        {subcategory.name}
                      </span>
                      <span className="text-sm text-gray-500 truncate">{`${subcategory.count.toLocaleString()} ads`}</span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
