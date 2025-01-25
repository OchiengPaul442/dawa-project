'use client';

import type React from 'react';
import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import type { Category, Subcategory } from '@/types/category';
import { slugify } from '@/utils/slugify';
import SidebarSkeleton from './SidebarSkeleton';
import { categoryIconMap, subcategoryIconMap, DefaultIcon } from './icon-maps';

import {
  setSelectedCategory,
  setSelectedSubcategory,
} from '@redux-store/slices/categories/categorySlice';
import { selectCategories } from '@redux-store/slices/categories/categories';

interface SidebarProps {
  onSelect?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onSelect }) => {
  const categories = useSelector(selectCategories);
  const dispatch = useDispatch();

  const [hoveredCategory, setHoveredCategory] = useState<Category | null>(null);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsLargeScreen(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleItemClick = useCallback(() => {
    onSelect?.();
  }, [onSelect]);

  const handleCategoryMouseEnter = useCallback(
    (category: Category) => {
      if (isLargeScreen) {
        setHoveredCategory(category);
      }
    },
    [isLargeScreen],
  );

  const handleSidebarMouseLeave = useCallback(() => {
    setHoveredCategory(null);
  }, []);

  const renderCategoryItem = useCallback(
    (category: Category) => {
      const Icon = categoryIconMap[category.category_name] || DefaultIcon;
      const isActive = hoveredCategory?.id === category.id;

      return (
        <Link
          key={category.id}
          href={`/cat/${slugify(category.category_name)}`}
          onClick={() => {
            handleItemClick();
            dispatch(setSelectedCategory(category));
          }}
        >
          <div
            className={`p-3 rounded-md cursor-pointer transition-all duration-200 flex items-center justify-between
              ${isActive ? 'bg-gray-100 text-primary_1' : 'hover:bg-gray-50 hover:text-primary_1'}
            `}
            onMouseEnter={() => handleCategoryMouseEnter(category)}
          >
            <div className="flex items-center gap-2 w-full truncate">
              <Icon className="h-5 w-5" />
              <span className="text-sm font-medium truncate max-w-[180px]">
                {category.category_name}
              </span>
            </div>
            {isLargeScreen && (
              <ChevronRight className="h-4 w-4 text-gray-400 flex-shrink-0" />
            )}
          </div>
        </Link>
      );
    },
    [
      hoveredCategory,
      isLargeScreen,
      handleItemClick,
      handleCategoryMouseEnter,
      dispatch,
    ],
  );

  const renderSubcategoryItem = useCallback(
    (subcategory: Subcategory, categoryName: string) => {
      const Icon =
        subcategoryIconMap[subcategory.subcategory_name] || DefaultIcon;
      return (
        <Link
          key={subcategory.id}
          href={`/cat/${slugify(categoryName)}/${slugify(subcategory.subcategory_name)}`}
          onClick={() => {
            handleItemClick();
            dispatch(setSelectedSubcategory(subcategory));
          }}
        >
          <div className="p-3 rounded-md cursor-pointer hover:bg-gray-100 transition-colors duration-200 flex items-center">
            <Icon className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium truncate max-w-[180px]">
              {subcategory.subcategory_name}
            </span>
          </div>
        </Link>
      );
    },
    [handleItemClick, dispatch],
  );

  if (!categories) {
    return <SidebarSkeleton />;
  }

  return (
    <div
      className="relative w-full lg:w-[288px]"
      onMouseLeave={handleSidebarMouseLeave}
    >
      <div className="sticky top-[100px] flex">
        {/* Category Sidebar */}
        <Card
          className={`w-full lg:w-[288px] ${hoveredCategory ? 'rounded-r-none border-r-0' : ''}`}
        >
          <CardContent className="p-0">
            <ScrollArea className="h-[700px]">
              {categories.length > 0 ? (
                <div className="p-4 space-y-1">
                  {categories.map((category) =>
                    renderCategoryItem(category as Category),
                  )}
                </div>
              ) : (
                <div className="p-4 text-gray-500">No categories found.</div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Subcategory Sidebar */}
        {isLargeScreen && hoveredCategory && (
          <Card className="w-[288px] rounded-l-none border-l-0">
            <CardContent className="p-0">
              <ScrollArea className="h-[700px]">
                <div className="p-4 space-y-1">
                  {hoveredCategory.subcategories?.map((subcategory) =>
                    renderSubcategoryItem(
                      subcategory,
                      hoveredCategory.category_name,
                    ),
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
