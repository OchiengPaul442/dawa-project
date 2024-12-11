import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { slugify } from '@/utils/slugify';
import { Category } from '@/types/category';

interface SubcategoryListProps {
  activeCategory: Category | null;
  isHovering: boolean;
}

export const SubcategoryList: React.FC<SubcategoryListProps> = React.memo(
  ({ activeCategory, isHovering }) => {
    return (
      <div
        className={cn(
          'absolute inset-0 overflow-auto bg-background p-6 transition-opacity rounded-r-lg duration-300 ease-in-out',
          isHovering
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none',
        )}
      >
        {activeCategory && (
          <div className="grid gap-6">
            <div>
              <h2 className="flex items-center gap-2 text-lg font-semibold">
                {React.createElement(activeCategory.icon, {
                  className: 'h-5 w-5 text-primary',
                })}
                {activeCategory.name}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {activeCategory.count.toLocaleString()} items
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {activeCategory.subcategories.map((subcategory) => {
                const Icon = subcategory.icon;
                const categorySlug = slugify(activeCategory.name);
                const subcategorySlug = slugify(subcategory.name);
                return (
                  <Link
                    key={subcategory.name}
                    href={`/cat/${categorySlug}/${subcategorySlug}`}
                    className="flex items-start gap-3 rounded-lg border p-3 transition-colors hover:bg-accent group"
                  >
                    <Icon className="h-5 w-5 shrink-0 text-primary group-hover:text-primary-dark transition-colors" />
                    <div className="grid gap-1 overflow-hidden">
                      <span className="font-medium truncate text-sm">
                        {subcategory.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
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
    );
  },
);

SubcategoryList.displayName = 'SubcategoryList';
