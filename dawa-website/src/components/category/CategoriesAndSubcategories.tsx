'use client';

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

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
  const pathname = decodeURIComponent(usePathname());
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const isActive = (path: string) => pathname === path;

  const themeColors = {
    primary: '#FFA200', // Yellow
    textGray: '#6B7280',
    lightGray: '#F5F5F5',
    hoverGray: '#E0E0E0',
  };

  return (
    <div className="space-y-4 bg-white border border-gray-200 p-4 rounded-md shadow-sm transition-all duration-300 hover:shadow-md max-w-sm">
      {/* Main Category */}
      <div>
        <h2
          onClick={() => router.push(`/cat/${parentCategory}`)}
          className={`text-lg font-semibold cursor-pointer ${
            isActive(`/cat/${parentCategory}`)
              ? `text-[${themeColors.primary}]`
              : 'text-gray-800'
          } hover:text-[${themeColors.primary}] transition-colors duration-200`}
        >
          {categoryName}{' '}
          <span className="text-sm font-normal text-[${themeColors.textGray}]">
            ({categoryCount})
          </span>
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Discover subcategories in {categoryName}.
        </p>
      </div>

      {/* Subcategories */}
      <div className="flex flex-col space-y-2">
        {subcategories.slice(0, showMore ? undefined : 4).map((subcat) => {
          const subcatPath = `/cat/${parentCategory}/${subcat.name}`;
          return (
            <button
              key={subcat.name}
              onClick={() => router.push(subcatPath)}
              className={`flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium border transition-all duration-200 ${
                isActive(subcatPath)
                  ? `border-[${themeColors.primary}] bg-[${themeColors.primary}] text-white`
                  : 'border-gray-300 bg-gray-50 text-gray-800 hover:bg-[${themeColors.hoverGray}]'
              }`}
            >
              <span>{subcat.name}</span>
              <span className="text-xs font-light text-[${themeColors.textGray}]">
                {subcat.count} items
              </span>
            </button>
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
