'use client';

import React, { useState, useMemo, useCallback, useEffect, FC } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';

import CardLayout from '@/components/ProductCards/CardLayout';
import ProductFilter from '@/components/features/filters/ProductFilter';
import FiltersAndSorting from '@/components/features/filters/FiltersAndSorting';
import CategoriesAndSubcategories from '@views/pages/category/CategoriesAndSubcategories';
import Breadcrumbs from '@/components/shared/Breadcrumbs';

import { slugify } from '@/utils/slugify';
import {
  setSelectedCategory,
  setSelectedSubcategory,
} from '@redux-store/slices/categories/categorySlice';
import { useCategoryData } from '@core/hooks/useProductData';

import { Button } from '@/components/ui/button';

import type { Category, Subcategory } from '@/types/category';
import ProductCardSkeleton from '@/components/loaders/ProductCardSkeleton';
import CustomizableNoData from '@/components/shared/no-data';

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
  const router = useRouter();
  const dispatch = useDispatch();

  // Grab categories from the Redux store
  const categories = useSelector(
    (state: any) => state.categories.categories,
  ) as ExtendedCategory[];

  const [viewType, setViewType] = useState<ViewType>('grid');
  const [filterOption, setFilterOption] = useState<FilterOptionType>('default');
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);

  const [appliedPriceRange, setAppliedPriceRange] = useState<[number, number]>([
    0, 1000000000,
  ]);
  const [appliedLocation, setAppliedLocation] = useState<string>('');
  const [appliedSelectedColors, setAppliedSelectedColors] = useState<string[]>(
    [],
  );

  // Derive selectedCategory based on URL slug
  const selectedCategory = useMemo(() => {
    return categories.find(
      (cat) => slugify(cat.category_name) === slugify(category[0] || ''),
    );
  }, [categories, category]);

  // Derive selectedSubcategory
  const selectedSubcategory = useMemo(() => {
    return selectedCategory?.subcategories.find(
      (sub) => slugify(sub.subcategory_name) === slugify(category[1] || ''),
    );
  }, [selectedCategory, category]);

  // Dispatch global references
  useEffect(() => {
    dispatch(setSelectedCategory(selectedCategory || null));
  }, [selectedCategory, dispatch]);

  useEffect(() => {
    dispatch(setSelectedSubcategory(selectedSubcategory || null));
  }, [selectedSubcategory, dispatch]);

  // Fetch category data
  const {
    data: fetchedData,
    error,
    isLoading,
  } = useCategoryData({
    selectedCategory,
    selectedSubcategory,
  });

  useEffect(() => {
    if (fetchedData && fetchedData.data) {
      setProducts(fetchedData.data);
      setFilteredProducts(fetchedData.data);
    } else {
      setProducts([]);
      setFilteredProducts([]);
    }
  }, [fetchedData]);

  // Filtering and sorting
  const applyFilters = useCallback(
    (
      priceRange: [number, number],
      location: string,
      selectedColors: string[],
    ) => {
      let updated = [...products];
      if (location) {
        updated = updated.filter((product) => product.location === location);
      }
      updated = updated.filter(
        (product) =>
          product.price >= priceRange[0] && product.price <= priceRange[1],
      );
      if (selectedColors.length > 0) {
        updated = updated.filter((product) =>
          selectedColors.includes(product.color),
        );
      }
      setFilteredProducts(updated);
    },
    [products],
  );

  const handleApplyFilters = useCallback(
    (
      newPriceRange: [number, number],
      newLocation: string,
      newSelectedColors: string[],
    ) => {
      setAppliedPriceRange(newPriceRange);
      setAppliedLocation(newLocation);
      setAppliedSelectedColors(newSelectedColors);
      applyFilters(newPriceRange, newLocation, newSelectedColors);
    },
    [applyFilters],
  );

  const resetFilters = useCallback(() => {
    setAppliedPriceRange([0, 1000000000]);
    setAppliedLocation('');
    setAppliedSelectedColors([]);
    setFilteredProducts(products);
  }, [products]);

  const handleFilterChange = useCallback(
    (selectedOption: string) => {
      setFilterOption(selectedOption as FilterOptionType);
      let sorted = [...filteredProducts];
      switch (selectedOption) {
        case 'rating':
          sorted.sort((a, b) => b.rating - a.rating);
          break;
        case 'price_low_to_high':
          sorted.sort((a, b) => a.price - b.price);
          break;
        case 'price_high_to_low':
          sorted.sort((a, b) => b.price - a.price);
          break;
        default:
          break;
      }
      setFilteredProducts(sorted);
    },
    [filteredProducts],
  );

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
            {isLoading ? (
              <ProductCardSkeleton ITEMS_PER_PAGE={16} />
            ) : (
              <>
                {filteredProducts.length > 0 ? (
                  <div
                    className={
                      viewType === 'grid'
                        ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6'
                        : 'flex flex-col gap-4'
                    }
                  >
                    {filteredProducts.map((product) => (
                      <CardLayout
                        key={product.id}
                        product={product}
                        viewType={viewType}
                      />
                    ))}
                  </div>
                ) : (
                  <CustomizableNoData
                    title="No products found"
                    description="No products found matching the selected filters."
                  />
                )}
              </>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default CategoryPage;
