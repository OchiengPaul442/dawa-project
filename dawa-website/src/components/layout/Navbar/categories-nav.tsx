'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import useWindowSize from '@core/hooks/useWindowSize';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { slugify } from '@/utils/slugify';
import { categories } from '@/lib/mock_data';
import {
  FcAutomotive,
  FcHome,
  FcPhoneAndroid,
  FcElectronics,
  FcShop,
  FcCustomerSupport,
  FcBusiness,
  FcSportsMode,
  FcCollaboration,
  FcFinePrint,
  FcLandscape,
  FcCamcorderPro,
  FcBriefcase,
} from 'react-icons/fc';
import { ChevronRight } from 'lucide-react';

// Define the Category interface based on the updated categories array
interface Subcategory {
  name: string;
  count: number;
  icon: React.ComponentType;
}

interface Category {
  name: string;
  count: number;
  icon: React.ComponentType;
  subcategories: Subcategory[];
}

interface CategoriesNavProps {
  className?: string;
  itemClassName?: string;
  isSheet?: boolean;
}

// Helper function to format the count
const formatCount = (num: number): string => {
  if (num >= 1e6) return `${(num / 1e6).toFixed(1)}M`;
  if (num >= 1e3) return `${(num / 1e3).toFixed(1)}K`;
  return num.toString();
};

// Define the fixed number of categories to display initially
const INITIAL_VISIBLE_CATEGORIES = 6;

export const CategoriesNav: React.FC<CategoriesNavProps> = ({
  className = '',
  itemClassName = '',
  isSheet = false,
}) => {
  const pathname = usePathname();
  const { width } = useWindowSize();

  // Determine how many categories to show based on window width
  const getVisibleCount = (width: number): number => {
    if (width < 768) return 3;
    if (width < 1024) return 5;
    return INITIAL_VISIBLE_CATEGORIES;
  };

  const visibleCount = isSheet ? categories.length : getVisibleCount(width);
  const visibleCategories = categories.slice(0, visibleCount);
  const overflowCategories = categories.slice(visibleCount);
  const hasOverflow = !isSheet && overflowCategories.length > 0;

  // If the current path starts with '/cat', do not render the nav
  if (pathname.startsWith('/cat')) return null;

  return (
    <nav className={cn('w-full', className)}>
      <ul
        className={cn(
          'flex items-center gap-4',
          isSheet ? 'flex-col' : 'flex-row',
        )}
      >
        {/* {visibleCategories.map((category) => (
          <li
            key={category.name}
            className={cn(itemClassName, isSheet ? 'w-full text-left' : '')}
          >
            <CategoryLink category={category} isSheet={isSheet} />
          </li>
        ))} */}

        {hasOverflow && (
          <li>
            <DropdownMenu>
              <DropdownMenuTrigger
                asChild
                className="flex items-center gap-2 text-gray-600 hover:text-primary_1 focus:outline-none"
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <span className="text-lg">⋯</span>
                  <span className="font-medium">More</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuLabel>More Categories</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {/* {overflowCategories.map((category) => (
                  <DropdownMenuItem key={category.name}>
                    <CategoryLink category={category} isSheet={false} />
                  </DropdownMenuItem>
                ))} */}
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
        )}
      </ul>
    </nav>
  );
};

// Component to render individual category links
const CategoryLink: React.FC<{ category: Category; isSheet?: boolean }> = ({
  category,
  isSheet = false,
}) => (
  <Link
    href={`/cat/${slugify(category.name)}`}
    className={cn(
      'flex items-center gap-2 text-gray-600 hover:text-primary_1 transition-colors',
      isSheet ? 'w-full justify-start' : 'justify-between',
    )}
    aria-label={`View categories for ${category.name}`}
  >
    <div className="flex items-center gap-2">
      <category.icon />
      <span className="text-sm sm:text-base font-medium truncate max-w-[150px]">
        {category.name}
      </span>
    </div>
    <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-400">
      <span>({formatCount(category.count)})</span>
      <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-0.5" />
    </div>
  </Link>
);
