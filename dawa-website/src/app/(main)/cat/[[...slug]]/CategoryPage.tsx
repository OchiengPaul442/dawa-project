'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/category/Sidebar';
import CardLayout from '@/components/product/CardLayout';
import ProductFilter from '@/components/product/ProductFilter';
import CategoriesPage from './CategoriesPage';
import FiltersAndSorting from '@/components/category/FiltersAndSorting';
import { productsData } from '@/lib/mock_data';

interface CategoryPageProps {
  category: string[];
}

const CategoryPage: React.FC<CategoryPageProps> = ({ category }) => {
  const router = useRouter();
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
  const [filterOption, setFilterOption] = useState<
    'default' | 'rating' | 'price_low_to_high' | 'price_high_to_low'
  >('default');
  const [filteredProducts, setFilteredProducts] = useState<any[]>(productsData);
  const [priceRange, setPriceRange] = useState<[number, number]>([
    20_000_000, 80_000_000,
  ]);
  const [location, setLocation] = useState<string>('');
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  const handleViewMore = (productId: number) => {
    router.push(`/prod/${productId}`);
  };

  // Apply filters
  const applyFilters = () => {
    let filtered = [...productsData];

    if (location) {
      filtered = filtered.filter((product) => product.location === location);
    }

    filtered = filtered.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1],
    );

    if (selectedColors.length > 0) {
      filtered = filtered.filter((product) =>
        selectedColors.includes(product.color),
      );
    }

    setFilteredProducts(filtered);
  };

  // Handle filter sorting
  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = event.target.value as
      | 'default'
      | 'rating'
      | 'price_low_to_high'
      | 'price_high_to_low';
    setFilterOption(selectedOption);

    let sortedProducts = [...filteredProducts];

    if (selectedOption === 'rating') {
      sortedProducts = sortedProducts.sort((a, b) => b.rating - a.rating);
    } else if (selectedOption === 'price_low_to_high') {
      sortedProducts = sortedProducts.sort((a, b) => a.price - b.price);
    } else if (selectedOption === 'price_high_to_low') {
      sortedProducts = sortedProducts.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(sortedProducts);
  };

  const resetFilters = () => {
    setLocation('');
    setSelectedColors([]);
    setPriceRange([20_000_000, 80_000_000]);
    setFilteredProducts(productsData);
    setFilterOption('default');
  };

  if (category.length === 0) {
    return <CategoriesPage />;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* Sidebar and Filters */}
        <div className="lg:col-span-1 relative">
          <div className="space-y-8">
            <Sidebar />
            <ProductFilter
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              location={location}
              setLocation={setLocation}
              selectedColors={selectedColors}
              setSelectedColors={setSelectedColors}
              applyFilters={applyFilters}
              resetFilters={resetFilters}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-14">
          {/* Filters and Sorting */}
          <FiltersAndSorting
            category={category}
            viewType={viewType}
            setViewType={setViewType}
            filterOption={filterOption}
            handleFilterChange={handleFilterChange}
          />

          {/* Products */}
          <div
            className={`${
              viewType === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'flex flex-col gap-4'
            }`}
          >
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <CardLayout
                  key={product.id}
                  product={product}
                  viewType={viewType}
                  onViewMore={handleViewMore}
                />
              ))
            ) : (
              <p className="text-center text-gray-500 w-full col-span-full">
                No products found matching the selected filters.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
