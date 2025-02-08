'use client';

import React, { useState, useCallback, useEffect } from 'react';
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

/**
 * Transform a Redux category (which may have incomplete subcategory objects)
 * into a local Category that matches our type.
 *
 * For each subcategory, we supply default values for the missing fields.
 */
function transformCategory(cat: any): Category {
  return {
    ...cat,
    subcategories: cat.subcategories
      ? cat.subcategories.map((sub: any) => ({
          id: sub.id,
          subcategory_name: sub.subcategory_name,
          name: sub.subcategory_name, // use subcategory_name as display name
          count: 0, // default count (adjust if needed)
          icon: '', // safe serializable value
          href: `/cat/${slugify(cat.category_name)}/${slugify(sub.subcategory_name)}`,
        }))
      : [],
  };
}

const Sidebar: React.FC<SidebarProps> = ({ onSelect }) => {
  // Get Redux categories and transform them.
  const reduxCategories = useSelector(selectCategories);
  const dispatch = useDispatch();

  // Transform Redux categories to match our local type.
  const categories: Category[] = reduxCategories
    ? reduxCategories.map((cat: any) => transformCategory(cat))
    : [];

  // Local state: currently hovered category.
  const [hoveredCategory, setHoveredCategory] = useState<Category | null>(null);
  // Track if screen is large (>= 1024px).
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // When an item is selected, optionally call onSelect.
  const handleItemClick = useCallback(() => {
    if (onSelect) onSelect();
  }, [onSelect]);

  // On large screens, set the hovered category.
  const handleCategoryMouseEnter = useCallback(
    (category: Category) => {
      if (isLargeScreen) {
        setHoveredCategory(category);
      }
    },
    [isLargeScreen],
  );

  // Clear hovered category when the mouse leaves.
  const handleSidebarMouseLeave = useCallback(() => {
    setHoveredCategory(null);
  }, []);

  // Render a single category item.
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
            className={`p-3 rounded-md cursor-pointer transition-all duration-200 flex items-center justify-between ${
              isActive
                ? 'bg-gray-100 text-primary_1'
                : 'hover:bg-gray-50 hover:text-primary_1'
            }`}
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

  // Render a single subcategory item.
  const renderSubcategoryItem = useCallback(
    (subcat: Subcategory) => {
      // Compute the icon component. Cast as React.ComponentType if needed.
      const IconComponent =
        (subcategoryIconMap[
          subcat.subcategory_name
        ] as React.ComponentType<any>) || DefaultIcon;
      return (
        <Link
          key={subcat.id}
          href={subcat.href}
          onClick={() => {
            handleItemClick();
            dispatch(setSelectedSubcategory(subcat));
          }}
        >
          <div className="p-3 rounded-md cursor-pointer hover:bg-gray-100 transition-colors duration-200 flex items-center">
            <IconComponent className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium truncate max-w-[180px]">
              {subcat.subcategory_name}
            </span>
          </div>
        </Link>
      );
    },
    [handleItemClick, dispatch],
  );

  if (!categories || categories.length === 0) {
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
          className={`w-full lg:w-[288px] ${
            hoveredCategory ? 'rounded-r-none border-r-0' : ''
          }`}
        >
          <CardContent className="p-0">
            <ScrollArea className="h-[700px]">
              <div className="p-4 space-y-1">
                {categories.map((category: Category) =>
                  renderCategoryItem(category),
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
        {/* Subcategory Sidebar */}
        {isLargeScreen && hoveredCategory && (
          <Card className="min-w-[288px] rounded-l-none border-l-0">
            <CardContent className="p-0">
              <ScrollArea className="h-[700px]">
                <div className="p-4 space-y-1">
                  {(hoveredCategory.subcategories || []).map((subcat) =>
                    renderSubcategoryItem(subcat),
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
