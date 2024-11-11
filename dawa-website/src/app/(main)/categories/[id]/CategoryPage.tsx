'use client';
import React, { useState } from 'react';
import { FaTh, FaThList } from 'react-icons/fa';

import BannerSection from '@/components/category/BannerSection';
import Sidebar from '@/components/category/Sidebar';
import CardLayout from '@/components/product/CardLayout';
import ProductFilter from '@/components/product/ProductFilter';

interface CategoryPageProps {
  category: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  imageUrl: string;
  sku?: string;
  location: string;
  color: string;
  features?: string[];
}

const productsData: Product[] = [
  {
    id: 1,
    name: 'MacBook Pro 2020 With 260 SSD',
    price: 1480000,
    originalPrice: 3200000,
    rating: 4.5,
    reviews: 12,
    imageUrl:
      'https://images.unsplash.com/photo-1600262300671-295cb21f4d06?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8TWFjQm9vayUyMFBybyUyMDIwMjAlMjBXaXRoJTIwU1NEfGVufDB8fDB8fHww',
    sku: '123141241251251',
    location: 'Kampala',
    color: 'White',
    features: [
      'Direct Full Array',
      'Quantum Dot Technology',
      'Ambient Mode',
      'One Remote Control',
    ],
  },
  {
    id: 2,
    name: 'Dell XPS 15 Ultra',
    price: 500000000,
    originalPrice: 600000000,
    rating: 4.8,
    reviews: 25,
    imageUrl:
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8RGVsbCUyMFhQUyUyMDE1fGVufDB8fDB8fHww',
    sku: '987654321098765',
    location: 'Gulu',
    color: 'Black',
    features: [
      'InfinityEdge Display',
      'Intel i9 Processor',
      '32GB RAM',
      '1TB SSD',
    ],
  },
  {
    id: 3,
    name: 'Asus ZenBook 14',
    price: 75000,
    originalPrice: 100000,
    rating: 4.2,
    reviews: 8,
    imageUrl:
      'https://images.unsplash.com/photo-1593642532973-d31b6557fa68?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8QXN1cyUyMFplbkJvb2slMjAxNHxlbnwwfHwwfHw%3D',
    sku: '192837465564738',
    location: 'Jinja',
    color: 'Blue',
    features: ['OLED Display', 'AMD Ryzen Processor', '16GB RAM', '512GB SSD'],
  },
  {
    id: 4,
    name: 'Budget Laptop 2023',
    price: 5000,
    originalPrice: 8000,
    rating: 3.8,
    reviews: 5,
    imageUrl:
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8QnVkZ2V0JTIwTGFwdG9wJTIwMjAyM3xlbnwwfHwwfHx8MA%3D%3D',
    sku: '555666777888999',
    location: 'Fort Portal',
    color: 'Green',
    features: [
      'Basic Display',
      'Intel Celeron Processor',
      '4GB RAM',
      '128GB SSD',
    ],
  },
  {
    id: 5,
    name: 'Elite Laptop Pro Max',
    price: 100_000_000,
    originalPrice: 150_000_000,
    rating: 5.0,
    reviews: 50,
    imageUrl:
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8RWxpZ2UlMjBMYXB0b3B8ZW58MHx8MHx8',
    sku: '999888777666555',
    location: 'Mbarara',
    color: 'Purple',
    features: [
      '4K Display',
      'Intel Xeon Processor',
      '64GB RAM',
      '4TB SSD',
      'Advanced Cooling System',
      'Liquid Metal Finish',
    ],
  },
  // Add more products as needed, ensuring some have prices <10,000 and >500 million UGX
];

const CategoryPage: React.FC<CategoryPageProps> = ({ category }) => {
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
  const [filterOption, setFilterOption] = useState<
    'default' | 'rating' | 'price_low_to_high' | 'price_high_to_low'
  >('default');
  const [filteredProducts, setFilteredProducts] =
    useState<Product[]>(productsData);
  const [priceRange, setPriceRange] = useState<[number, number]>([
    20_000_000, 80_000_000,
  ]); // Default range: 500k to 10m
  const [location, setLocation] = useState<string>('');
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  // Price range constants
  const MIN_PRICE = 0;
  const MAX_PRICE = 100_000_000; // 100 million UGX
  const STEP = 100_000; // 100,000 UGX

  const handleViewMore = (productId: number) => {
    console.log(`View more details for product ID: ${productId}`);
  };

  // Function to apply filters
  const applyFilters = () => {
    let filtered = [...productsData];

    // Apply location filter
    if (location) {
      filtered = filtered.filter((product) => product.location === location);
    }

    // Apply price range filter
    filtered = filtered.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1],
    );

    // Apply color filter
    if (selectedColors.length > 0) {
      filtered = filtered.filter((product) =>
        selectedColors.includes(product.color),
      );
    }

    setFilteredProducts(filtered);
  };

  // Function to handle sorting/filtering by rating or price
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

  // Function to reset all filters
  const resetFilters = () => {
    setLocation('');
    setSelectedColors([]);
    setPriceRange([500_000, 10_000_000]);
    setFilteredProducts(productsData);
    setFilterOption('default');
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col w-full lg:grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="space-y-8">
          <Sidebar height="400px" />

          {/* Filter Section */}
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

        <div className="col-span-3 space-y-14">
          <BannerSection />

          {/* Filters and Sorting Options */}
          <div className="flex flex-row flex-wrap justify-between items-center gap-4">
            <h2 className="text-2xl font-semibold">Laptop Products</h2>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setViewType('grid')}
                className={
                  viewType === 'grid' ? 'text-primary_1' : 'text-gray-400'
                }
                aria-label="View as Grid"
              >
                <FaTh size={18} />
              </button>
              <button
                onClick={() => setViewType('list')}
                className={
                  viewType === 'list' ? 'text-primary_1' : 'text-gray-400'
                }
                aria-label="View as List"
              >
                <FaThList size={18} />
              </button>

              {/* Filter Dropdown */}
              <select
                value={filterOption}
                onChange={handleFilterChange}
                className="text-black font-semibold bg-transparent focus:outline-none cursor-pointer rounded-md px-2 py-1"
                aria-label="Sort Products"
              >
                <option value="default">Popularity</option>
                <option value="price_low_to_high">Price: Low to High</option>
                <option value="price_high_to_low">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>

          {/* Products Display */}
          <div
            className={`flex ${
              viewType === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'
                : 'flex-col gap-4'
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
