'use client';

import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSearchProducts } from '@/@core/hooks/useProductData';
import { normalizeProducts } from '@/utils/normalizeProductData';
import CardLayout from '@/components/ProductCards/CardLayout';
import ProductFilter from '@/components/features/filters/ProductFilter';
import FiltersAndSorting from '@/components/features/filters/FiltersAndSorting';
import CustomizableNoData from '@/components/shared/no-data';
import { OopsComponent } from '@/components/shared/oops-component';
import Loader from '@/components/Loader';

const SearchPage: React.FC = () => {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get('query') || '';
  const { searchQuery, productsData, isLoading, isError } =
    useSearchProducts(queryParam);

  // Filter criteria states
  const [appliedPriceRange, setAppliedPriceRange] = useState<[number, number]>([
    0, 1_000_000_000,
  ]);
  const [appliedLocation, setAppliedLocation] = useState<string>('');
  const [appliedSelectedColors, setAppliedSelectedColors] = useState<string[]>(
    [],
  );

  // View type and sorting option states
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
  const [filterOption, setFilterOption] = useState<string>('default');
  const handleFilterChange = (value: string) => setFilterOption(value);

  // Category filter state
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const handleCategorySelect = (category: string) =>
    setSelectedCategory(category);

  // Normalize fetched products (defaulting to an empty array if no data)
  const normalizedProducts = useMemo(
    () => normalizeProducts(productsData || []),
    [productsData],
  );

  // Derive unique categories from normalized products and include "all"
  const uniqueCategories = useMemo(() => {
    const cats = new Set<string>();
    normalizedProducts.forEach((product) => {
      if (product.category) cats.add(product.category);
    });
    return ['all', ...Array.from(cats)];
  }, [normalizedProducts]);

  // Filter products based on the applied criteria
  const filteredProducts = useMemo(() => {
    return normalizedProducts.filter((product) => {
      // Price filtering
      const price = Number(product.price);
      if (price < appliedPriceRange[0] || price > appliedPriceRange[1]) {
        return false;
      }

      // Location filtering (case-insensitive)
      if (appliedLocation && product.location) {
        if (
          !product.location
            .toLowerCase()
            .includes(appliedLocation.toLowerCase())
        ) {
          return false;
        }
      }

      // Colors filtering (if applicable)
      if (appliedSelectedColors.length > 0) {
        const productColors: string[] = (product as any).colors || [];
        if (
          !appliedSelectedColors.some((color) => productColors.includes(color))
        ) {
          return false;
        }
      }

      // Category filtering (if a specific category is selected)
      if (
        selectedCategory !== 'all' &&
        (product.category ?? '').toLowerCase() !==
          selectedCategory.toLowerCase()
      ) {
        return false;
      }

      return true;
    });
  }, [
    normalizedProducts,
    appliedPriceRange,
    appliedLocation,
    appliedSelectedColors,
    selectedCategory,
  ]);

  // Sorting logic based on the selected filter option
  const sortedProducts = useMemo(() => {
    const products = [...filteredProducts];
    switch (filterOption) {
      case 'price_low_to_high':
        products.sort((a, b) => Number(a.price) - Number(b.price));
        break;
      case 'price_high_to_low':
        products.sort((a, b) => Number(b.price) - Number(a.price));
        break;
      default:
        // Default: sort by newest first (using dateAdded)
        products.sort(
          (a, b) =>
            new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime(),
        );
        break;
    }
    return products;
  }, [filteredProducts, filterOption]);

  // Handlers to update filter criteria from ProductFilter component
  const handleApplyFilters = (
    newPriceRange: [number, number],
    newLocation: string,
    newSelectedColors: string[],
  ) => {
    setAppliedPriceRange(newPriceRange);
    setAppliedLocation(newLocation);
    setAppliedSelectedColors(newSelectedColors);
  };

  const handleResetFilters = () => {
    setAppliedPriceRange([0, 1_000_000_000]);
    setAppliedLocation('');
    setAppliedSelectedColors([]);
  };

  return (
    <div className="min-h-screen space-y-6">
      <header className="border-b pb-4">
        {isLoading ? (
          <div className="h-10 w-full max-w-[350px] bg-gray-300 animate-pulse rounded" />
        ) : (
          <h1 className="text-3xl font-bold text-gray-900">
            {searchQuery || queryParam}
          </h1>
        )}
      </header>
      <main>
        {/* Grid layout for responsive design */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar: Product Filters */}
          <aside className="lg:col-span-1">
            <ProductFilter
              appliedPriceRange={appliedPriceRange}
              appliedLocation={appliedLocation}
              appliedSelectedColors={appliedSelectedColors}
              onApplyFilters={handleApplyFilters}
              onResetFilters={handleResetFilters}
            />
          </aside>

          {/* Main Content: Filters & Product List */}
          <section className="lg:col-span-3">
            <FiltersAndSorting
              category={uniqueCategories}
              selectedCategory={selectedCategory}
              onCategorySelect={handleCategorySelect}
              categoryTitle=""
              viewType={viewType}
              setViewType={setViewType}
              filterOption={filterOption}
              handleFilterChange={handleFilterChange}
              arrowVisible={true}
              autoScroll={true}
            />

            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <Loader />
              </div>
            ) : isError ? (
              <OopsComponent />
            ) : sortedProducts.length > 0 ? (
              <div
                className={`grid gap-3 mt-6 ${
                  viewType === 'grid'
                    ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4'
                    : 'grid-cols-1'
                }`}
              >
                {sortedProducts.map((product) => (
                  <CardLayout
                    key={product.id}
                    product={product as any}
                    viewType={viewType}
                  />
                ))}
              </div>
            ) : (
              <CustomizableNoData
                title="No products found"
                description="Sorry, we couldn't find any products that match your search criteria."
              />
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default SearchPage;
