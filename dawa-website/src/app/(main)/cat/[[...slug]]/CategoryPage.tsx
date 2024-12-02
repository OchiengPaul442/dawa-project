'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import CardLayout from '@/components/product/CardLayout';
import ProductFilter from '@/components/product/ProductFilter';
import FiltersAndSorting from '@/components/category/FiltersAndSorting';
import CategoriesAndSubcategories from '@/components/category/CategoriesAndSubcategories';
import { productsData, categories } from '@/lib/mock_data';
import CategoriesPage from './CategoriesPage';
import Link from 'next/link';
import CustomPagination from '@/components/common/CustomPagination';

// Types
interface CategoryPageProps {
  category: string[];
}

interface BreadcrumbItem {
  name: string;
  href: string;
}

type FilterOptionType =
  | 'default'
  | 'rating'
  | 'price_low_to_high'
  | 'price_high_to_low';
type ViewType = 'grid' | 'list';

const ITEMS_PER_PAGE = 9;

const CategoryPage: React.FC<CategoryPageProps> = ({ category }) => {
  const router = useRouter();
  const [viewType, setViewType] = useState<ViewType>('grid');
  const [filterOption, setFilterOption] = useState<FilterOptionType>('default');
  const [currentPage, setCurrentPage] = useState(1);

  // Filter states
  const [filteredProducts, setFilteredProducts] = useState<any[]>(productsData);
  const [appliedPriceRange, setAppliedPriceRange] = useState<[number, number]>([
    0, 1000000000,
  ]);
  const [appliedLocation, setAppliedLocation] = useState<string>('');
  const [appliedSelectedColors, setAppliedSelectedColors] = useState<string[]>(
    [],
  );

  // Memoized values
  const selectedCategory = useMemo(
    () =>
      categories.find(
        (cat) => cat.name.toLowerCase() === category[0]?.toLowerCase(),
      ),
    [category],
  );

  const selectedSubcategory = useMemo(
    () =>
      selectedCategory?.subcategories?.find(
        (sub: any) => sub.name.toLowerCase() === category[1]?.toLowerCase(),
      ),
    [selectedCategory, category],
  );

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  // Results summary text
  const resultsSummary = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE + 1;
    const end = Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length);
    return `Showing ${start}-${end} of ${filteredProducts.length} results`;
  }, [currentPage, filteredProducts.length]);

  const breadcrumbItems: BreadcrumbItem[] = useMemo(
    () => [
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
    ],
    [selectedCategory, selectedSubcategory],
  );

  // Handlers
  const handleViewMore = useCallback(
    (productId: number) => {
      router.push(`/prod/${productId}`);
    },
    [router],
  );

  const applyFilters = useCallback(
    (
      priceRange: [number, number],
      location: string,
      selectedColors: string[],
    ) => {
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
      setCurrentPage(1);
    },
    [],
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
    setFilteredProducts(productsData);
    setCurrentPage(1);
  }, []);

  const handleFilterChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedOption = event.target.value as FilterOptionType;
      setFilterOption(selectedOption);

      let sortedProducts = [...filteredProducts];
      switch (selectedOption) {
        case 'rating':
          sortedProducts.sort((a, b) => b.rating - a.rating);
          break;
        case 'price_low_to_high':
          sortedProducts.sort((a, b) => a.price - b.price);
          break;
        case 'price_high_to_low':
          sortedProducts.sort((a, b) => b.price - a.price);
          break;
        default:
          break;
      }

      setFilteredProducts(sortedProducts);
      setCurrentPage(1);
    },
    [filteredProducts],
  );

  if (!selectedCategory) {
    return <CategoriesPage />;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Breadcrumb Navigation */}
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
        {/* Sidebar */}
        <div className="lg:col-span-1 flex flex-col space-y-6 h-auto">
          <CategoriesAndSubcategories
            categoryName={selectedCategory.name}
            categoryCount={selectedCategory.count}
            subcategories={selectedCategory.subcategories}
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
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Filters and Content Container */}
          <div className="space-y-6">
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
              {paginatedProducts.length > 0 ? (
                paginatedProducts.map((product) => (
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

          {/* Pagination with Results Summary */}
          {filteredProducts.length > 0 && (
            <div className="border-t border-gray-200 mt-20 pt-6 w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="text-sm text-gray-600">{resultsSummary}</div>
                <div className="w-full">
                  <CustomPagination
                    currentPage={currentPage}
                    totalItems={filteredProducts.length}
                    itemsPerPage={ITEMS_PER_PAGE}
                    onPageChange={setCurrentPage}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
