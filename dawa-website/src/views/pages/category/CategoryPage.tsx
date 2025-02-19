'use client';

import React, {
  useState,
  useMemo,
  useCallback,
  useEffect,
  FC,
  useRef,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import CardLayout from '@/components/ProductCards/CardLayout';
import ProductFilter from '@/components/features/filters/ProductFilter';
import FiltersAndSorting from '@/components/features/filters/FiltersAndSorting';
import CategoriesAndSubcategories from '@views/pages/category/CategoriesAndSubcategories';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import CustomizableNoData from '@/components/shared/no-data';
import { OopsComponent } from '@/components/shared/oops-component';

import { slugify } from '@/utils/slugify';
import {
  setSelectedCategory,
  setSelectedSubcategory,
} from '@redux-store/slices/categories/categorySlice';
import { useProductsData } from '@core/hooks/useProductData';

import type { Category, Subcategory } from '@/types/category';
import ProductCardSkeleton from '@/components/loaders/ProductCardSkeleton';
import useInfiniteScroll, {
  UseInfiniteScrollOptions,
} from '@/@core/hooks/useInfiniteScroll';
import SingleSkeletonCard from '@/components/loaders/SingleSkeletonCard';
import { normalizeProducts } from '@/utils/normalizeProductData';

type FilterOptionType =
  | 'default'
  | 'rating'
  | 'price_low_to_high'
  | 'price_high_to_low';
type ViewType = 'grid' | 'list';

interface ExtendedSubcategory extends Subcategory {
  subcategory_item_count: number;
}

interface ExtendedCategory extends Category {
  category_item_count: number;
  subcategories: ExtendedSubcategory[];
}

interface CategoryPageProps {
  category: string[];
}

const CategoryPage: FC<CategoryPageProps> = ({ category }) => {
  const dispatch = useDispatch();

  // Get categories from Redux.
  const categories = useSelector(
    (state: any) => state.categories.categories,
  ) as ExtendedCategory[];

  const [viewType, setViewType] = useState<ViewType>('grid');
  const [filterOption, setFilterOption] = useState<FilterOptionType>('default');

  // Filter/sort related states (if needed).
  const [appliedPriceRange, setAppliedPriceRange] = useState<[number, number]>([
    0, 1000000000,
  ]);
  const [appliedLocation, setAppliedLocation] = useState<string>('');
  const [appliedSelectedColors, setAppliedSelectedColors] = useState<string[]>(
    [],
  );

  // Derive selected category from the URL slug.
  const selectedCategory = useMemo(() => {
    return categories.find(
      (cat) => slugify(cat.category_name) === slugify(category[0] || ''),
    );
  }, [categories, category]);

  // Derive selected subcategory.
  const selectedSubcategory = useMemo(() => {
    return selectedCategory?.subcategories.find(
      (sub) => slugify(sub.subcategory_name) === slugify(category[1] || ''),
    );
  }, [selectedCategory, category]);

  // Dispatch global selected values.
  useEffect(() => {
    dispatch(setSelectedCategory(selectedCategory || null));
  }, [selectedCategory, dispatch]);

  useEffect(() => {
    dispatch(setSelectedSubcategory(selectedSubcategory || null));
  }, [selectedSubcategory, dispatch]);

  // Generate the request body for products API.
  const productsBody = useMemo(() => {
    if (selectedSubcategory) {
      return { subcategory_id: selectedSubcategory.id };
    } else if (selectedCategory) {
      return { category_id: selectedCategory.id };
    }
    return null;
  }, [selectedCategory, selectedSubcategory]);

  // Use the hook to fetch paginated product data.
  const {
    productsData,
    nextPageUrl,
    isLoading: isProductsLoading,
    isError: productsError,

    setSize,
  } = useProductsData(productsBody);

  // Normalize the raw products.
  const normalizedProductsData = useMemo(() => {
    return normalizeProducts(productsData);
  }, [productsData]);

  // Infinite scroll: attach observer to load more pages.
  const loadMoreRef = useRef<HTMLDivElement>(null);
  useInfiniteScroll(
    loadMoreRef,
    () => {
      setSize((prevSize: number) => prevSize + 1);
    },
    {
      threshold: 1,
      enabled: !!nextPageUrl && !isProductsLoading,
    } as UseInfiniteScrollOptions,
  );

  // UI Handlers for filtering/sorting.
  const handleApplyFilters = useCallback(
    (
      newPriceRange: [number, number],
      newLocation: string,
      newSelectedColors: string[],
    ) => {
      setAppliedPriceRange(newPriceRange);
      setAppliedLocation(newLocation);
      setAppliedSelectedColors(newSelectedColors);
      // Additional filtering logic can be implemented here if needed.
    },
    [],
  );

  const resetFilters = useCallback(() => {
    setAppliedPriceRange([0, 1000000000]);
    setAppliedLocation('');
    setAppliedSelectedColors([]);
  }, []);

  const handleFilterChange = useCallback((selectedOption: string) => {
    setFilterOption(selectedOption as FilterOptionType);
    // Sorting logic if needed.
  }, []);

  if (!selectedCategory) {
    return null;
  }

  return (
    <>
      {/* Breadcrumbs */}
      <div className="hidden md:block">
        <Breadcrumbs
          categoryName={selectedCategory.category_name}
          subcategoryName={selectedSubcategory?.subcategory_name}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-10">
        {/* Sidebar */}
        <aside className="flex lg:flex-col gap-6">
          <CategoriesAndSubcategories
            categoryName={selectedCategory.category_name}
            categoryCount={selectedCategory.category_item_count}
            subcategories={selectedCategory.subcategories.map((sub) => ({
              name: sub.subcategory_name,
              count: sub.subcategory_item_count,
            }))}
            parentCategory={category[0]}
          />
          <ProductFilter
            appliedPriceRange={appliedPriceRange}
            appliedLocation={appliedLocation}
            appliedSelectedColors={appliedSelectedColors}
            onApplyFilters={handleApplyFilters}
            onResetFilters={resetFilters}
          />
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-3">
          <div className="space-y-6">
            <FiltersAndSorting
              category={category}
              viewType={viewType}
              setViewType={setViewType}
              filterOption={filterOption}
              handleFilterChange={handleFilterChange}
            />
            {isProductsLoading ? (
              <ProductCardSkeleton
                ITEMS_PER_PAGE={16}
                gridClass="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3"
              />
            ) : productsError ? (
              <OopsComponent />
            ) : normalizedProductsData.length > 0 ? (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {normalizedProductsData.map((product, index) => (
                    <CardLayout
                      key={`${product.id}-${index}`}
                      product={product as unknown as any}
                      viewType={viewType}
                    />
                  ))}
                  {isProductsLoading &&
                    // Calculate skeleton cards: fill remaining cells plus one extra full row.
                    (() => {
                      const columns = 4;
                      const productCount = normalizedProductsData.length;
                      const remainder = productCount % columns;
                      const fillCount = remainder > 0 ? columns - remainder : 0;
                      const additionalSkeletonCount = columns;
                      const totalSkeletonCount =
                        fillCount + additionalSkeletonCount;
                      return Array.from({ length: totalSkeletonCount }).map(
                        (_, idx) => (
                          <SingleSkeletonCard key={`skeleton-${idx}`} />
                        ),
                      );
                    })()}
                </div>
                {/* Sentinel element */}
                <div ref={loadMoreRef} className="h-1" />
              </>
            ) : (
              <CustomizableNoData
                title="No products found"
                description="No products found matching the selected filters."
              />
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default CategoryPage;
