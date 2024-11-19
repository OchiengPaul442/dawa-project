'use client';

import React, { useState, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import {
  FaCar,
  FaHome,
  FaMobileAlt,
  FaTv,
  FaCouch,
  FaHeartbeat,
  FaTshirt,
  FaFutbol,
  FaTools,
  FaGamepad,
  FaPaintBrush,
  FaSkating,
} from 'react-icons/fa';

interface Subcategory {
  name: string;
  count: number;
  icon: React.ReactNode;
}

interface Category {
  name: string;
  count: number;
  subcategories?: Subcategory[];
  icon: React.ReactNode;
}

// Categories data with icons
const categories: Category[] = [
  {
    name: 'Vehicles',
    count: 30141,
    icon: <FaCar className="text-primary_1" />,
    subcategories: [
      { name: 'Cars', count: 22863, icon: <FaCar /> },
      { name: 'Buses & Microbuses', count: 898, icon: <FaCar /> },
      { name: 'Heavy Equipment', count: 338, icon: <FaTools /> },
      { name: 'Motorbikes & Scooters', count: 2539, icon: <FaCar /> },
      { name: 'Trucks & Trailers', count: 1308, icon: <FaCar /> },
      { name: 'Vehicle Parts & Accessories', count: 2161, icon: <FaTools /> },
      { name: 'Watercraft & Boats', count: 34, icon: <FaCar /> },
    ],
  },
  {
    name: 'Property',
    count: 29771,
    icon: <FaHome className="text-primary_1" />,
    subcategories: [
      { name: 'Houses & Apartments', count: 15000, icon: <FaHome /> },
      { name: 'Land & Plots', count: 8000, icon: <FaHome /> },
      { name: 'Commercial Property', count: 6771, icon: <FaHome /> },
    ],
  },
  {
    name: 'Phones & Tablets',
    count: 27766,
    icon: <FaMobileAlt className="text-primary_1" />,
    subcategories: [
      { name: 'Mobile Phones', count: 20000, icon: <FaMobileAlt /> },
      { name: 'Tablets', count: 5000, icon: <FaTv /> },
      { name: 'Accessories', count: 2766, icon: <FaTools /> },
    ],
  },
  {
    name: 'Electronics',
    count: 40091,
    icon: <FaTv className="text-primary_1" />,
    subcategories: [
      { name: 'Computers', count: 15000, icon: <FaTv /> },
      { name: 'TV & Audio', count: 12000, icon: <FaTv /> },
      { name: 'Cameras', count: 8000, icon: <FaTv /> },
      { name: 'Gaming', count: 5091, icon: <FaGamepad /> },
    ],
  },
  {
    name: 'Home, Appliances & Furniture',
    count: 51021,
    icon: <FaCouch className="text-primary_1" />,
    subcategories: [
      { name: 'Furniture', count: 20000, icon: <FaCouch /> },
      { name: 'Kitchen Appliances', count: 15000, icon: <FaTools /> },
      { name: 'Home Decor', count: 16021, icon: <FaPaintBrush /> },
    ],
  },
  {
    name: 'Health & Beauty',
    count: 6737,
    icon: <FaHeartbeat className="text-primary_1" />,
    subcategories: [
      { name: 'Skincare', count: 2000, icon: <FaHeartbeat /> },
      { name: 'Haircare', count: 1500, icon: <FaHeartbeat /> },
      { name: 'Makeup', count: 2237, icon: <FaHeartbeat /> },
      { name: 'Medical Equipment', count: 1000, icon: <FaTools /> },
    ],
  },
  {
    name: 'Fashion',
    count: 24914,
    icon: <FaTshirt className="text-primary_1" />,
    subcategories: [
      { name: 'Clothing', count: 15000, icon: <FaTshirt /> },
      { name: 'Shoes', count: 5000, icon: <FaTshirt /> },
      { name: 'Accessories', count: 4914, icon: <FaTools /> },
    ],
  },
  {
    name: 'Sports, Arts & Outdoors',
    count: 3355,
    icon: <FaFutbol className="text-primary_1" />,
    subcategories: [
      { name: 'Sports Equipment', count: 2000, icon: <FaSkating /> },
      { name: 'Art Supplies', count: 855, icon: <FaPaintBrush /> },
      { name: 'Outdoor Gear', count: 500, icon: <FaSkating /> },
    ],
  },
];

const Sidebar: React.FC = () => {
  const [hoveredCategory, setHoveredCategory] = useState<Category | null>(null);
  const [isCategoryHovered, setIsCategoryHovered] = useState(false);
  const [isSubcategoriesHovered, setIsSubcategoriesHovered] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  // Update screen size to detect large screens
  useEffect(() => {
    const handleResize = () => setIsLargeScreen(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Reset hovered category if neither category nor subcategories are hovered
  useEffect(() => {
    if (!isCategoryHovered && !isSubcategoriesHovered) {
      const timeout = setTimeout(() => setHoveredCategory(null), 200);
      return () => clearTimeout(timeout);
    }
  }, [isCategoryHovered, isSubcategoriesHovered]);

  return (
    <div className="w-full lg:w-[340px]">
      {/* Sidebar Container */}
      <div
        className={`bg-white rounded-xl border sticky top-[100px] ${
          hoveredCategory
            ? 'rounded-r-none border-r-primary_1'
            : 'rounded-xl border-gray-200'
        }`}
      >
        <ScrollArea className="h-[calc(100vh-340px)] lg:h-[calc(100vh-310px)]">
          <div className="p-4 space-y-1">
            {categories.map((category) => (
              <div
                key={category.name}
                className={`p-3 rounded-lg cursor-pointer transition-all duration-200 flex items-center justify-between ${
                  hoveredCategory?.name === category.name
                    ? 'bg-gray-100 text-primary_1'
                    : 'hover:bg-gray-50 hover:text-primary_1'
                }`}
                onMouseEnter={() => {
                  if (isLargeScreen) {
                    setHoveredCategory(category);
                    setIsCategoryHovered(true);
                  }
                }}
                onMouseLeave={() => setIsCategoryHovered(false)}
              >
                <Link
                  href={`/cat/${encodeURIComponent(category.name.toLowerCase())}`}
                  passHref
                >
                  <div className="w-full truncate">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{category.icon}</span>
                      <div className="flex flex-col items-start w-full truncate">
                        <span className="font-sm truncate">
                          {category.name}
                        </span>
                        <span className="text-xs text-gray-500 truncate">{`(${category.count.toLocaleString()})`}</span>
                      </div>
                    </div>
                  </div>
                </Link>
                {isLargeScreen && (
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Subcategories Panel */}
      {isLargeScreen && hoveredCategory && (
        <div
          className="absolute bg-white rounded-r-xl border-r border-y min-w-[340px] left-[340px] top-0 z-30"
          onMouseEnter={() => setIsSubcategoriesHovered(true)}
          onMouseLeave={() => setIsSubcategoriesHovered(false)}
        >
          <ScrollArea className="h-[calc(100vh-340px)] lg:h-[calc(100vh-310px)]">
            <div className="p-4 space-y-1">
              {hoveredCategory.subcategories?.map((subcategory) => (
                <div
                  key={subcategory.name}
                  className="p-3 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors duration-200 flex items-center justify-between"
                >
                  <Link
                    href={`/cat/${encodeURIComponent(hoveredCategory.name.toLowerCase())}/${encodeURIComponent(
                      subcategory.name.toLowerCase(),
                    )}`}
                    passHref
                  >
                    <div className="flex items-center gap-3 justify-between w-full truncate">
                      {subcategory.icon}
                      <span className="font-medium truncate">
                        {subcategory.name}
                      </span>
                      <span className="text-sm text-gray-500 truncate">{`${subcategory.count.toLocaleString()} ads`}</span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
