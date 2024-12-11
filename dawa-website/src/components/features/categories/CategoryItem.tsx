import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { slugify } from '@/utils/slugify';
import { Category } from '@/types/category';

interface CategoryItemProps {
  category: Category;
  isActive: boolean;
  onMouseEnter: () => void;
}

export const CategoryItem: React.FC<CategoryItemProps> = React.memo(
  ({ category, isActive, onMouseEnter }) => {
    const Icon = category.icon;
    const categorySlug = slugify(category.name);

    return (
      <Link
        href={`/cat/${categorySlug}`}
        className={cn(
          'group flex items-center justify-between gap-2 px-4 py-3 text-sm transition-colors hover:bg-accent',
          isActive && 'bg-accent',
        )}
        onMouseEnter={onMouseEnter}
      >
        <div className="flex items-center gap-3 overflow-hidden">
          <Icon className="h-5 w-5 flex-shrink-0 text-primary" />
          <span className="truncate font-medium">{category.name}</span>
        </div>
        <div className="flex items-center gap-1 text-muted-foreground">
          <span className="text-xs">({category.count.toLocaleString()})</span>
          <ChevronRight className="h-4 w-4 flex-shrink-0 transition-transform group-hover:translate-x-0.5" />
        </div>
      </Link>
    );
  },
);

CategoryItem.displayName = 'CategoryItem';
