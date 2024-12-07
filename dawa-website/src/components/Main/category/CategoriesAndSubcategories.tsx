'use client';

import React, { useState, useMemo } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { slugify } from '@/utils/slugify';

interface Subcategory {
  name: string;
  count: number;
}

interface CategoriesAndSubcategoriesProps {
  categoryName: string;
  categoryCount: number;
  subcategories: Subcategory[];
  parentCategory: string;
}

const CategoriesAndSubcategories: React.FC<CategoriesAndSubcategoriesProps> = ({
  categoryName,
  categoryCount,
  subcategories,
  parentCategory,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const slugifiedCategoryName = useMemo(
    () => slugify(categoryName),
    [categoryName],
  );

  const isActive = (path: string) => {
    const decodedPathname = decodeURIComponent(pathname);
    return decodedPathname === path;
  };

  const isCategoryActive = useMemo(() => {
    const decodedPathname = decodeURIComponent(pathname);
    return (
      decodedPathname === `/cat/${slugifiedCategoryName}` ||
      decodedPathname.startsWith(`/cat/${slugifiedCategoryName}/`)
    );
  }, [pathname, slugifiedCategoryName]);

  const themeColors = {
    primary: '#FFA200', // Yellow
    textGray: '#6B7280',
    lightGray: '#F5F5F5',
    hoverGray: '#E0E0E0',
  };

  return (
    <div className="space-y-4 bg-white border border-gray-200 p-4 rounded-md shadow-sm transition-all duration-300 hover:shadow-md lg:max-w-sm">
      {/* Main Category */}
      <div>
        <Link href={`/cat/${slugifiedCategoryName}`}>
          <h2
            className={`text-lg font-semibold cursor-pointer ${
              isCategoryActive
                ? `text-[${themeColors.primary}]`
                : 'text-gray-800'
            } hover:text-[${themeColors.primary}] transition-colors duration-200`}
          >
            {categoryName}{' '}
            <span className="text-sm font-normal text-gray-500">
              ({categoryCount})
            </span>
          </h2>
        </Link>
        <p className="text-sm text-gray-500 mt-1">
          Discover subcategories in {categoryName}.
        </p>
      </div>

      {/* Subcategories */}
      <div className="flex flex-col space-y-2">
        {subcategories.slice(0, showMore ? undefined : 4).map((subcat) => {
          const slugifiedSubcat = slugify(subcat.name);
          const subcatPath = `/cat/${slugifiedCategoryName}/${slugifiedSubcat}`;
          return (
            <Link key={subcat.name} href={subcatPath}>
              <button
                className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium border transition-all duration-200 ${
                  isActive(subcatPath)
                    ? `border-[${themeColors.primary}] bg-[${themeColors.primary}] text-white`
                    : `border-gray-300 bg-gray-50 text-gray-800 hover:bg-[${themeColors.hoverGray}]`
                }`}
              >
                <span>{subcat.name}</span>
                <span className="text-xs font-light text-gray-500">
                  {subcat.count} items
                </span>
              </button>
            </Link>
          );
        })}
      </div>

      {/* Show More/Show Less Button */}
      {subcategories.length > 4 && (
        <button
          onClick={toggleShowMore}
          className="mt-4 w-full py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-sm font-medium text-gray-800 shadow-sm transition-all duration-200"
        >
          {showMore
            ? 'Show Less'
            : `Show More (${subcategories.length - 4} more)`}
        </button>
      )}
    </div>
  );
};

export default CategoriesAndSubcategories;
