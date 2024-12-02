import React from 'react';
import Link from 'next/link';
import { categories } from '@/lib/mock_data';
import { usePathname } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import useWindowSize from '@/hooks/useWindowSize';

interface CategoriesNavProps {
  className?: string;
  itemClassName?: string;
  isSheet?: boolean;
}

interface Category {
  name: string;
  icon: string;
  count: number;
}

const formatCount = (num: number): string => {
  if (num >= 1e6) return `${(num / 1e6).toFixed(1)}M`;
  if (num >= 1e3) return `${(num / 1e3).toFixed(1)}K`;
  return num.toString();
};

const FIXED_CATEGORIES = categories.slice(0, 6);

export const CategoriesNav: React.FC<CategoriesNavProps> = ({
  className = '',
  itemClassName = '',
  isSheet = false,
}) => {
  const pathname = usePathname();
  const { width } = useWindowSize();

  const getVisibleCount = (width: number): number => {
    if (width < 900) return 3;
    if (width < 1224) return 5;
    return 6;
  };

  const visibleCount = isSheet
    ? FIXED_CATEGORIES.length
    : getVisibleCount(width);
  const visibleCategories = FIXED_CATEGORIES.slice(0, visibleCount);
  const overflowCategories = FIXED_CATEGORIES.slice(visibleCount);
  const hasOverflow = !isSheet && overflowCategories.length > 0;

  if (pathname.startsWith('/cat')) return null;

  return (
    <nav className={className}>
      <ul className={`flex items-start gap-4 ${isSheet ? 'flex-col' : ''}`}>
        {visibleCategories.map((category) => (
          <li
            key={category.name}
            className={`${itemClassName} ${isSheet ? 'w-full text-left' : ''}`}
          >
            <CategoryLink category={category} isSheet={isSheet} />
          </li>
        ))}

        {hasOverflow && (
          <li>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 text-gray-600 hover:text-primary_1">
                <span className="text-lg">⋯</span>
                <span className="font-medium">More</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>More Categories</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {overflowCategories.map((category) => (
                  <DropdownMenuItem key={category.name}>
                    <CategoryLink category={category} isSheet={false} />
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
        )}
      </ul>
    </nav>
  );
};

const CategoryLink: React.FC<{ category: Category; isSheet?: boolean }> = ({
  category,
  isSheet = false,
}) => (
  <Link
    href={`/cat/${category.name.toLowerCase()}`}
    className={`flex items-center whitespace-nowrap gap-2 text-gray-600 hover:text-primary_1 transition-colors ${
      isSheet ? 'w-full' : ''
    }`}
  >
    <span className="text-lg">{category.icon}</span>
    <span className="text-sm font-medium truncate max-w-[150px]">
      {category.name}
    </span>
    <span className="text-xs text-gray-400">
      ({formatCount(category.count)})
    </span>
  </Link>
);
