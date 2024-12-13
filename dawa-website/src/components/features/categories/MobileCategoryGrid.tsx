import React from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { slugify } from '@/utils/slugify';
import { Category } from '@/types/category';

interface MobileCategoryGridProps {
  categories: Category[];
}

export const MobileCategoryGrid: React.FC<MobileCategoryGridProps> = React.memo(
  ({ categories }) => {
    return (
      <div className="grid grid-cols-4 gap-4">
        <Link
          href="/post-ad"
          className="flex flex-col items-center justify-center p-4 bg-gray-700 text-white aspect-square rounded-lg"
        >
          <Plus className="h-6 w-6 mb-2" />
          <span className="text-xs text-center">Post ad</span>
        </Link>
        {categories.map((category) => {
          const Icon = category.icon;
          const categorySlug = slugify(category.name);
          return (
            <Link key={category.name} href={`/cat/${categorySlug}`}>
              <div className="flex flex-col items-center justify-center p-4 bg-gray-100 border aspect-square rounded-lg">
                <Icon className="h-6 w-6 mb-2 text-primary" />
              </div>
              <span className="text-xs text-center line-clamp-2 mt-2 w-full">
                {category.name}
              </span>
            </Link>
          );
        })}
      </div>
    );
  },
);

MobileCategoryGrid.displayName = 'MobileCategoryGrid';
