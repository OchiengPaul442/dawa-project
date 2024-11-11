// CategoriesPage.tsx
'use client';
import React from 'react';
import {
  FaDesktop,
  FaHeadphones,
  FaLaptop,
  FaTabletAlt,
  FaWifi,
} from 'react-icons/fa';

import BestDealsCarousel from '@/components/carousels/BestDealsCarousel';
import HotSalesCarousel from '@/components/carousels/HotSalesCarousel';
import RecentlyViewedCarousel from '@/components/carousels/RecentlyViewedCarousel';
import BannerSection from '@/components/category/BannerSection';
import Sidebar from '@/components/category/Sidebar';

const CategoriesPage = () => {
  const subCategories = [
    {
      name: 'Laptop',
      count: 24,
      icon: <FaLaptop className="text-gray-600" size={32} />,
    },
    {
      name: 'Ultrabook',
      count: 24,
      icon: <FaTabletAlt className="text-gray-600" size={32} />,
    },
    {
      name: 'Desktop/PC',
      count: 24,
      icon: <FaDesktop className="text-gray-600" size={32} />,
    },
    {
      name: 'All in One PC',
      count: 24,
      icon: <FaDesktop className="text-gray-600" size={32} />,
    },
    {
      name: 'Routers',
      count: 24,
      icon: <FaWifi className="text-gray-600" size={32} />,
    },
    {
      name: 'Speakers',
      count: 24,
      icon: <FaHeadphones className="text-gray-600" size={32} />,
    },
  ];

  return (
    <div className="container mx-auto px-4 lg:px-0 mt-8 space-y-12">
      {/* Main layout grid */}
      <section className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Section */}
        <div className="lg:col-span-1">
          <Sidebar />
        </div>

        {/* Main Content Section */}
        <div className="lg:col-span-3 space-y-8">
          {/* Banner Section */}
          <BannerSection />

          {/* Subcategories Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {subCategories.map((subCategory, index) => (
              <div
                key={index}
                className="flex flex-col items-center cursor-pointer justify-center p-6 bg-gray-100 border border-gray-200 rounded-2xl text-center hover:bg-gray-200 transition"
              >
                {subCategory.icon}
                <h3 className="text-lg font-semibold mt-2">
                  {subCategory.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {subCategory.count} Products
                </p>
              </div>
            ))}
          </div>

          {/* Best Deals Carousel */}
          <BestDealsCarousel />
        </div>
      </section>

      {/* Carousels Section */}
      <section className="grid grid-cols-1 gap-8">
        <HotSalesCarousel />
        <RecentlyViewedCarousel />
      </section>
    </div>
  );
};

export default CategoriesPage;
