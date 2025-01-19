'use client';

import type React from 'react';
import { useMemo } from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronsRight } from 'lucide-react';
import { slugify } from '@/utils/slugify';
import { useSelector } from '@/redux-store/hooks';
import { selectCategories } from '@/redux-store/slices/categories/categories';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ScrollArea } from '@/components/ui/scroll-area';

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
        href: `/cat/${slugify(selectedCategory.category_name)}/${slugify(selectedSubcategory.subcategory_name)}`,
      });
    }

    return items;
  }, [categories, categoryName, subcategoryName]);

  const renderBreadcrumbContent = () => (
    <ScrollArea className="w-full">
      <ul className="flex items-center space-x-1 whitespace-nowrap">
        {breadcrumbItems.map((item, index) => {
          const isLastItem =
            index === breadcrumbItems.length - 1 && !productName;
          return (
            <li key={index} className="flex items-center">
              {isLastItem ? (
                <span
                  className="text-gray-500 cursor-default truncate max-w-[150px]"
                  title={item.name}
                >
                  {item.name}
                </span>
              ) : (
                <>
                  <Link
                    href={item.href}
                    className="hover:underline text-primary_1 font-medium truncate max-w-[150px]"
                    title={item.name}
                  >
                    {item.name}
                  </Link>
                  <ChevronRight className="h-4 w-4 text-gray-400 mx-1 flex-shrink-0" />
                </>
              )}
            </li>
          );
        })}
        {productName && (
          <li className="flex items-center">
            <ChevronRight className="h-4 w-4 text-gray-400 mx-1 flex-shrink-0" />
            <span
              className="text-gray-800 truncate max-w-[150px]"
              title={productName}
            >
              {productName}
            </span>
          </li>
        )}
      </ul>
    </ScrollArea>
  );

  return (
    <nav className="mb-6" aria-label="Breadcrumb">
      <div className="hidden sm:block">{renderBreadcrumbContent()}</div>
      <div className="sm:hidden">
        <Collapsible>
          <CollapsibleTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-between"
            >
              <span className="truncate mr-2">
                {productName || subcategoryName || categoryName || 'Home'}
              </span>
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2">
            {renderBreadcrumbContent()}
          </CollapsibleContent>
        </Collapsible>
      </div>
    </nav>
  );
};

export default Breadcrumbs;
