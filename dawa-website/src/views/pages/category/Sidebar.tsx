'use client';

import React, { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';

import { ScrollArea } from '@/components/ui/scroll-area';
import type { Category, Subcategory } from '@/types/category';
import { slugify } from '@/utils/slugify';
import SidebarSkeleton from './SidebarSkeleton';

import {
  Truck,
  Home,
  Phone,
  Tv,
  Sofa,
  Palette,
  Wrench,
  ShoppingBag,
  Activity,
  Briefcase,
  Heart,
} from 'lucide-react';

import {
  setSelectedCategory,
  setSelectedSubcategory,
} from '@redux-store/slices/categories/categorySlice';
import { selectCategories } from '@redux-store/slices/categories/categories';

const DefaultIcon = ShoppingBag;

const categoryIconMap: Record<string, React.ElementType> = {
  Vehicles: Truck,
  Property: Home,
  'Phones & Tablets': Phone,
  Electronics: Tv,
  'Home, Appliances & Furniture': Sofa,
  'Health & Beauty': Palette,
  Fashion: ShoppingBag,
  'Sports, Arts & Outdoors': Activity,
  'Seeking Work CVs': Briefcase,
  Services: Wrench,
  Jobs: Briefcase,
  'Babies & Kids': ShoppingBag,
  Pets: Heart,
  'Agriculture & Food': Wrench,
  'Commercial Equipment & Tools': Wrench,
  'Repair & Construction': Wrench,
};

const subcategoryIconMap: Record<string, React.ElementType> = {
  Cars: Truck,
  'Motorcycles & Scooters': Truck,
  'Trucks & Trailers': Truck,
  'Houses & Apartments for Sale': Home,
  'Houses & Apartments for Rent': Home,
  'Land & Plots for Sale': Home,
  'Land & Plots for Rent': Home,
  'Mobile Phones': Phone,
  Tablets: Phone,
  TVs: Tv,
  Furniture: Sofa,
  Makeup: Palette,
  'Repair Services': Wrench,
  'Other Services': Wrench,
};

interface SidebarProps {
  onSelect?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onSelect }) => {
  // Retrieve categories from Redux
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

  const handleSubcategoryMouseEnter = useCallback((category: Category) => {
    setHoveredCategory(category);
  }, []);

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
            <span className="font-medium truncate max-w-[180px]">
              {subcategory.subcategory_name}
            </span>
          </div>
        </Link>
      );
    },
    [handleItemClick, dispatch],
  );

  // Fallback if categories are not yet available
  if (!categories) {
    return <SidebarSkeleton />;
  }

  return (
    <div
      className="relative w-full lg:w-[288px] z-30"
      onMouseLeave={handleSidebarMouseLeave}
    >
      {/* Main Category List */}
      <div
        className={`bg-white rounded-md border sticky top-[100px]
          ${hoveredCategory ? 'rounded-r-none border-r-primary_1' : 'rounded-md border-gray-200'}
        `}
      >
        <ScrollArea className="h-[calc(100vh-340px)] lg:h-[calc(100vh-390px)]">
          {categories.length > 0 ? (
            <div className="p-4 space-y-1">
              {categories.map((category) =>
                renderCategoryItem(category as any),
              )}
            </div>
          ) : (
            <div className="p-4 text-gray-500">No categories found.</div>
          )}
        </ScrollArea>
      </div>

      {/* Subcategory List (visible on hover, large screens only) */}
      {isLargeScreen && hoveredCategory && (
        <div
          className="absolute bg-white rounded-r-md border-r border-y min-w-[288px] left-[288px] top-0 z-30"
          onMouseEnter={() => handleSubcategoryMouseEnter(hoveredCategory)}
        >
          <ScrollArea className="h-[calc(100vh-340px)] lg:h-[calc(100vh-390px)]">
            <div className="p-4 space-y-1">
              {hoveredCategory.subcategories?.map((subcategory) =>
                renderSubcategoryItem(
                  subcategory,
                  hoveredCategory.category_name,
                ),
              )}
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
