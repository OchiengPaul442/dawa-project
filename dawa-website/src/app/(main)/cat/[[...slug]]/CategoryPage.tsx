'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CardLayout from '@/components/product/CardLayout';
import ProductFilter from '@/components/product/ProductFilter';
import FiltersAndSorting from '@/components/category/FiltersAndSorting';
import CategoriesAndSubcategories from '@/components/category/CategoriesAndSubcategories';
import { productsData, categories } from '@/lib/mock_data';
import CategoriesPage from './CategoriesPage';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

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
    0, 80_000_000,
  ]);
  const [location, setLocation] = useState<string>('');
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  // Find the selected category and subcategory
  const selectedCategory = categories.find(
    (cat) => cat.name.toLowerCase() === category[0]?.toLowerCase(),
  );

  const selectedSubcategory =
    selectedCategory?.subcategories?.find(
      (sub: any) => sub.name.toLowerCase() === category[1]?.toLowerCase(),
    ) || null;

  useEffect(() => {
    applyFilters();
  }, [location, priceRange, selectedColors]);

  const handleViewMore = (productId: number) => {
    router.push(`/prod/${productId}`);
  };

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
    setPriceRange([0, 80_000_000]);
    setFilteredProducts(productsData);
    setFilterOption('default');
  };

  if (!selectedCategory) {
    return <CategoriesPage />;
  }

  // Generate breadcrumb items with counts
  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'Categories', href: '/cat' },
    ...(selectedCategory
      ? [
          {
            name: `${selectedCategory.name} (${selectedCategory.count})`,
            href: `/cat/${selectedCategory.name.toLowerCase()}`,
          },
        ]
      : []),
    ...(selectedSubcategory
      ? [
          {
            name: `${selectedSubcategory.name} (${selectedSubcategory.count})`,
            href: `/cat/${selectedCategory?.name.toLowerCase()}/${selectedSubcategory.name.toLowerCase()}`,
          },
        ]
      : []),
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Breadcrumb */}
      <nav
        className="flex flex-wrap items-center text-sm mb-6"
        aria-label="Breadcrumb"
      >
        <ul className="flex items-center space-x-2">
          {breadcrumbItems.map((item, index) => (
            <li key={index} className="flex items-center">
              <Link
                href={item.href}
                className={`${
                  index === breadcrumbItems.length - 1
                    ? 'text-gray-500 cursor-default'
                    : 'hover:underline text-primary_1 font-medium'
                }`}
              >
                {item.name}
              </Link>
              {index < breadcrumbItems.length - 1 && (
                <span className="text-gray-400 mx-2">/</span>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* Categories, Subcategories, and Filters */}
        <div className="lg:col-span-1 flex flex-col space-y-6 h-auto">
          <CategoriesAndSubcategories
            categoryName={selectedCategory.name}
            categoryCount={selectedCategory.count}
            subcategories={selectedCategory.subcategories}
            parentCategory={category[0]}
          />

          <div className="mt-6">
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
          <FiltersAndSorting
            category={category}
            viewType={viewType}
            setViewType={setViewType}
            filterOption={filterOption}
            handleFilterChange={handleFilterChange}
          />

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
