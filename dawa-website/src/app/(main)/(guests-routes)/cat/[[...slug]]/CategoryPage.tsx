'use client';

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';

import CardLayout from '@/components/ProductCards/CardLayout';
import ProductFilter from '@/components/features/filters/ProductFilter';
import FiltersAndSorting from '@/components/features/categories/FiltersAndSorting';
import CategoriesAndSubcategories from '@views/pages/category/CategoriesAndSubcategories';
import CategoriesPage from '@/views/pages/category/CategoriesPage';
import CustomPagination from '@/components/shared/CustomPagination';

import { slugify } from '@/utils/slugify';
import {
  setSelectedCategory,
  setSelectedSubcategory,
} from '@redux-store/slices/categories/categorySlice';
import { useCategoryData } from '@core/hooks/useProductData';

import type { Category, Subcategory } from '@/types/category';

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

const ITEMS_PER_PAGE = 12;

interface CategoryPageProps {
  category: string[];
}

// Extend imported types to include missing fields
interface ExtendedSubcategory extends Subcategory {
  subcategory_item_count: number;
}

interface ExtendedCategory extends Category {
  category_item_count: number;
  subcategories: ExtendedSubcategory[];
}

const CategoryPage: React.FC<CategoryPageProps> = ({ category }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  // Cast the categories from Redux store to our extended type
  const categories = useSelector(
    (state: any) => state.categories.categories,
  ) as ExtendedCategory[];

  const [viewType, setViewType] = useState<ViewType>('grid');
  const [filterOption, setFilterOption] = useState<FilterOptionType>('default');
  const [currentPage, setCurrentPage] = useState(1);

  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [appliedPriceRange, setAppliedPriceRange] = useState<[number, number]>([
    0, 1000000000,
  ]);
  const [appliedLocation, setAppliedLocation] = useState<string>('');
  const [appliedSelectedColors, setAppliedSelectedColors] = useState<string[]>(
    [],
  );

  const selectedCategory: ExtendedCategory | undefined = useMemo(() => {
    return categories.find(
      (cat) => slugify(cat.category_name) === slugify(category[0] || ''),
    );
  }, [categories, category]);

  const selectedSubcategory: ExtendedSubcategory | undefined = useMemo(() => {
    return selectedCategory?.subcategories.find(
      (sub) => slugify(sub.subcategory_name) === slugify(category[1] || ''),
    );
  }, [selectedCategory, category]);

  useEffect(() => {
    if (selectedCategory) {
      dispatch(setSelectedCategory(selectedCategory));
    } else {
      dispatch(setSelectedCategory(null));
    }
  }, [selectedCategory, dispatch]);

  useEffect(() => {
    if (selectedSubcategory) {
      dispatch(setSelectedSubcategory(selectedSubcategory));
    } else {
      dispatch(setSelectedSubcategory(null));
    }
  }, [selectedSubcategory, dispatch]);

  // Use the custom SWR hook to fetch category data
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

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const resultsSummary = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE + 1;
    const end = Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length);
    return `Showing ${start}-${end} of ${filteredProducts.length} results`;
  }, [currentPage, filteredProducts.length]);

  const breadcrumbItems: BreadcrumbItem[] = useMemo(() => {
    const items: BreadcrumbItem[] = [{ name: 'Home', href: '/' }];

    if (selectedCategory) {
      items.push({
        name: `${selectedCategory.category_name} (${selectedCategory.category_item_count})`,
        href: `/cat/${slugify(selectedCategory.category_name)}`,
      });
    }

    if (selectedSubcategory && selectedCategory) {
      items.push({
        name: `${selectedSubcategory.subcategory_name} (${selectedSubcategory.subcategory_item_count})`,
        href: `/cat/${slugify(selectedCategory.category_name)}/${slugify(selectedSubcategory.subcategory_name)}`,
      });
    }

    return items;
  }, [selectedCategory, selectedSubcategory]);

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
      let filtered = [...products];

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
    setCurrentPage(1);
  }, [products]);

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
                className={
                  index === breadcrumbItems.length - 1
                    ? 'text-gray-500 cursor-default'
                    : 'hover:underline text-primary_1 font-medium'
                }
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

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-10">
        {/* Sidebar */}
        <aside className="lg:col-span-1 flex flex-col space-y-6">
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
            <FiltersAndSorting
              category={category}
              viewType={viewType}
              setViewType={setViewType}
              filterOption={filterOption}
              handleFilterChange={handleFilterChange}
            />

            {isLoading ? (
              <div className="flex justify-center items-center h-full py-16">
                <div className="SpinnerLoader"></div>
              </div>
            ) : (
              <div
                className={
                  viewType === 'grid'
                    ? 'grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6'
                    : 'flex flex-col gap-4'
                }
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
            )}
          </div>

          {!isLoading && filteredProducts.length > 0 && (
            <div className="border-t border-gray-200 mt-8 pt-6 w-full">
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
        </main>
      </div>
    </div>
  );
};

export default CategoryPage;
