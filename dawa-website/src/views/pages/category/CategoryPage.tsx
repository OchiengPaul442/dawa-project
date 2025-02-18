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

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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

  // Grab categories from the Redux store (extended type)
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

  // State to control mobile modals
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);

  // Derive selectedCategory based on the URL slug
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

  // Dispatch to Redux for global reference
  useEffect(() => {
    dispatch(setSelectedCategory(selectedCategory || null));
  }, [selectedCategory, dispatch]);

  useEffect(() => {
    dispatch(setSelectedSubcategory(selectedSubcategory || null));
  }, [selectedSubcategory, dispatch]);

  // Custom hook to fetch data for this category or subcategory
  const {
    data: fetchedData,
    error,
    isLoading,
  } = useCategoryData({
    selectedCategory,
    selectedSubcategory,
  });

  // Update products state on fetch
  useEffect(() => {
    if (fetchedData && fetchedData.data) {
      setProducts(fetchedData.data);
      setFilteredProducts(fetchedData.data);
    } else {
      setProducts([]);
      setFilteredProducts([]);
    }
  }, [fetchedData]);

  // Filtering and Sorting Logic
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
          // 'default' case: no sorting
          break;
      }
      setFilteredProducts(sorted);
    },
    [filteredProducts],
  );

  // If no category is found, show nothing (or consider redirecting)
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

      {/* Mobile header buttons for Filters and Categories */}
      <div className="lg:hidden flex justify-between items-center p-4 bg-white shadow-sm">
        <Button
          variant="outline"
          onClick={() => setMobileCategoriesOpen(true)}
          className="w-1/2 mr-2"
        >
          Categories
        </Button>
        <Button
          variant="outline"
          onClick={() => setMobileFiltersOpen(true)}
          className="w-1/2 ml-2"
        >
          Filters
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-10">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex flex-col space-y-6">
          <CategoriesAndSubcategories
            categoryName={selectedCategory.category_name}
            categoryCount={selectedCategory.category_item_count}
            subcategories={selectedCategory.subcategories.map((sub) => ({
              name: sub.subcategory_name,
              count: sub.subcategory_item_count,
            }))}
            parentCategory={category[0]}
          />
          <div className="mt-6">
            <ProductFilter
              appliedPriceRange={appliedPriceRange}
              appliedLocation={appliedLocation}
              appliedSelectedColors={appliedSelectedColors}
              onApplyFilters={handleApplyFilters}
              onResetFilters={resetFilters}
            />
          </div>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-3">
          <div className="space-y-6">
            {/* Filters and Sorting Controls */}
            <FiltersAndSorting
              category={category}
              viewType={viewType}
              setViewType={setViewType}
              filterOption={filterOption}
              handleFilterChange={handleFilterChange}
            />

            {/* Loading State */}
            {isLoading ? (
              <ProductCardSkeleton ITEMS_PER_PAGE={16} />
            ) : (
              <>
                {filteredProducts.length > 0 ? (
                  <div
                    className={
                      viewType === 'grid'
                        ? 'grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6'
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

      {/* Mobile Categories Modal */}
      <Dialog
        open={mobileCategoriesOpen}
        onOpenChange={setMobileCategoriesOpen}
      >
        <DialogContent className="p-0 m-0 w-full h-full max-w-full">
          <DialogHeader className="px-4 py-4 border-b border-gray-200">
            <DialogTitle className="text-xl font-semibold">
              Categories
            </DialogTitle>
          </DialogHeader>
          <div className="p-4 overflow-auto h-full">
            <CategoriesAndSubcategories
              categoryName={selectedCategory.category_name}
              categoryCount={selectedCategory.category_item_count}
              subcategories={selectedCategory.subcategories.map((sub) => ({
                name: sub.subcategory_name,
                count: sub.subcategory_item_count,
              }))}
              parentCategory={category[0]}
            />
            <div className="mt-4">
              <Button
                onClick={() => setMobileCategoriesOpen(false)}
                className="w-full bg-[#FFA200] text-white hover:bg-[#FF8C00] transition-all"
              >
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Mobile Filters Modal */}
      <Dialog open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
        <DialogContent className="p-0 m-0 w-full h-full max-w-full">
          <DialogHeader className="px-4 py-4 border-b border-gray-200">
            <DialogTitle className="text-xl font-semibold">Filters</DialogTitle>
          </DialogHeader>
          <div className="p-4 overflow-auto h-full">
            <ProductFilter
              appliedPriceRange={appliedPriceRange}
              appliedLocation={appliedLocation}
              appliedSelectedColors={appliedSelectedColors}
              onApplyFilters={(priceRange, location, colors) => {
                handleApplyFilters(priceRange, location, colors);
                setMobileFiltersOpen(false);
              }}
              onResetFilters={resetFilters}
            />
            <div className="mt-4">
              <Button
                onClick={() => setMobileFiltersOpen(false)}
                className="w-full bg-[#FFA200] text-white hover:bg-[#FF8C00] transition-all"
              >
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CategoryPage;
