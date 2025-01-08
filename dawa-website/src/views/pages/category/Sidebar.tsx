'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { categories } from '@/lib/mock_data';
import { Category, Subcategory } from '@/types/category';
import { slugify } from '@/utils/slugify';

interface SidebarProps {
  onSelect?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onSelect }) => {
  const [hoveredCategory, setHoveredCategory] = useState<Category | null>(null);
  const [isCategoryHovered, setIsCategoryHovered] = useState(false);
  const [isSubcategoriesHovered, setIsSubcategoriesHovered] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsLargeScreen(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isCategoryHovered && !isSubcategoriesHovered) {
      const timeout = setTimeout(() => setHoveredCategory(null), 200);
      return () => clearTimeout(timeout);
    }
  }, [isCategoryHovered, isSubcategoriesHovered]);

  const handleItemClick = () => {
    if (onSelect) {
      onSelect();
    }
  };

  const renderCategoryItem = (category: Category) => {
    const Icon = category.icon;
    return (
      <Link
        key={category.name}
        href={`/cat/${slugify(category.name)}`}
        passHref
        onClick={handleItemClick}
      >
        <div
          className={`p-3 rounded-md cursor-pointer transition-all duration-200 flex items-center justify-between ${
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
          <div className="w-full truncate">
            <div className="flex items-center gap-2">
              <Icon className="h-5 w-5" />
              <div className="flex flex-col items-start w-full truncate">
                <span className="font-sm truncate whitespace-nowrap max-w-[180px]">
                  {category.name}
                </span>
                <span className="text-xs text-gray-500 truncate">{`(${category.count.toLocaleString()})`}</span>
              </div>
            </div>
          </div>
          {isLargeScreen && <ChevronRight className="h-4 w-4 text-gray-400" />}
        </div>
      </Link>
    );
  };

  const renderSubcategoryItem = (
    subcategory: Subcategory,
    categoryName: string,
  ) => {
    const Icon = subcategory.icon;
    return (
      <Link
        key={subcategory.name}
        href={`/cat/${slugify(categoryName)}/${slugify(subcategory.name)}`}
        passHref
        onClick={handleItemClick}
      >
        <div className="p-3 rounded-md cursor-pointer hover:bg-gray-100 transition-colors duration-200 flex items-center justify-between">
          <div className="flex items-center gap-3 justify-between w-full truncate">
            <div className="flex items-start gap-2">
              <Icon className="h-4 w-4" />
              <span className="font-medium truncate whitespace-nowrap max-w-[180px]">
                {subcategory.name}
              </span>
            </div>
            <span className="text-sm text-gray-500 truncate">{`${subcategory.count.toLocaleString()} ads`}</span>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <div className="w-full lg:w-[288px] relative z-30">
      <div
        className={`bg-white rounded-md border sticky top-[100px] ${
          hoveredCategory
            ? 'rounded-r-none border-r-primary_1'
            : 'rounded-md border-gray-200'
        }`}
      >
        <ScrollArea className="h-[calc(100vh-340px)] lg:h-[calc(100vh-390px)]">
          <div className="p-4 space-y-1">
            {categories.map(renderCategoryItem)}
          </div>
        </ScrollArea>
      </div>

      {isLargeScreen && hoveredCategory && (
        <div
          className="absolute bg-white rounded-r-md border-r border-y min-w-[288px] left-[288px] top-0 z-30"
          onMouseEnter={() => setIsSubcategoriesHovered(true)}
          onMouseLeave={() => setIsSubcategoriesHovered(false)}
        >
          <ScrollArea className="h-[calc(100vh-340px)] lg:h-[calc(100vh-390px)]">
            <div className="p-4 space-y-1">
              {hoveredCategory.subcategories?.map((subcategory) =>
                renderSubcategoryItem(subcategory, hoveredCategory.name),
              )}
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
