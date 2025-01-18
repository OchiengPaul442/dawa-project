'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { slugify } from '@/utils/slugify';
import { useSelector } from '@/redux-store/hooks';
import { selectCategories } from '@/redux-store/slices/categories/categories';

interface ExtendedSubcategory {
  subcategory_name: string;
  subcategory_item_count: number;
}

interface ExtendedCategory {
  category_name: string;
  category_item_count: number;
  subcategories: ExtendedSubcategory[];
}

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbsProps {
  categoryName?: string;
  subcategoryName?: string;
  productName?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  categoryName,
  subcategoryName,
  productName,
}) => {
  const categories = useSelector(selectCategories) as ExtendedCategory[];

  const breadcrumbItems: BreadcrumbItem[] = useMemo(() => {
    const items: BreadcrumbItem[] = [{ name: 'Home', href: '/' }];

    let selectedCategory: ExtendedCategory | undefined;
    let selectedSubcategory: ExtendedSubcategory | undefined;

    if (categoryName) {
      const targetCatSlug = slugify(categoryName);
      selectedCategory = categories.find(
        (cat) => slugify(cat.category_name) === targetCatSlug,
      );
    }

    if (selectedCategory && subcategoryName) {
      const targetSubSlug = slugify(subcategoryName);
      selectedSubcategory = selectedCategory.subcategories.find(
        (sub) => slugify(sub.subcategory_name) === targetSubSlug,
      );
    }

    if (selectedCategory) {
      items.push({
        name: `${selectedCategory.category_name} (${selectedCategory.category_item_count})`,
        href: `/cat/${slugify(selectedCategory.category_name)}`,
      });
    }

    if (selectedCategory && selectedSubcategory) {
      items.push({
        name: `${selectedSubcategory.subcategory_name} (${selectedSubcategory.subcategory_item_count})`,
        href: `/cat/${slugify(selectedCategory.category_name)}/${slugify(
          selectedSubcategory.subcategory_name,
        )}`,
      });
    }

    return items;
  }, [categories, categoryName, subcategoryName]);

  return (
    <nav
      className="flex flex-wrap items-center text-sm mb-6"
      aria-label="Breadcrumb"
    >
      <ul className="flex items-center space-x-2">
        {breadcrumbItems.map((item, index) => {
          const isLastItem =
            index === breadcrumbItems.length - 1 && !productName;
          return (
            <li key={index} className="flex items-center">
              {isLastItem ? (
                <span className="text-gray-500 cursor-default">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:underline text-primary_1 font-medium"
                >
                  {item.name}
                </Link>
              )}
              {(index < breadcrumbItems.length - 1 || productName) && (
                <span className="text-gray-400 mx-2">/</span>
              )}
            </li>
          );
        })}
        {productName && (
          <li className="flex items-center text-gray-800">{productName}</li>
        )}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
