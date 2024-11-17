import React, { useState, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface Subcategory {
  name: string;
  count: number;
}

interface Category {
  name: string;
  count: number;
  subcategories?: Subcategory[];
}

// Categories data
const categories: Category[] = [
  {
    name: 'Vehicles',
    count: 30141,
    subcategories: [
      { name: 'Cars', count: 22863 },
      { name: 'Buses & Microbuses', count: 898 },
      { name: 'Heavy Equipment', count: 338 },
      { name: 'Motorbikes & Scooters', count: 2539 },
      { name: 'Trucks & Trailers', count: 1308 },
      { name: 'Vehicle Parts & Accessories', count: 2161 },
      { name: 'Watercraft & Boats', count: 34 },
    ],
  },
  {
    name: 'Property',
    count: 29771,
    subcategories: [
      { name: 'Houses & Apartments', count: 15000 },
      { name: 'Land & Plots', count: 8000 },
      { name: 'Commercial Property', count: 6771 },
    ],
  },
  {
    name: 'Phones & Tablets',
    count: 27766,
    subcategories: [
      { name: 'Mobile Phones', count: 20000 },
      { name: 'Tablets', count: 5000 },
      { name: 'Accessories', count: 2766 },
    ],
  },
  {
    name: 'Electronics',
    count: 40091,
    subcategories: [
      { name: 'Computers', count: 15000 },
      { name: 'TV & Audio', count: 12000 },
      { name: 'Cameras', count: 8000 },
      { name: 'Gaming', count: 5091 },
    ],
  },
  {
    name: 'Home, Appliances & Furniture',
    count: 51021,
    subcategories: [
      { name: 'Furniture', count: 20000 },
      { name: 'Kitchen Appliances', count: 15000 },
      { name: 'Home Decor', count: 16021 },
    ],
  },
  {
    name: 'Health & Beauty',
    count: 6737,
    subcategories: [
      { name: 'Skincare', count: 2000 },
      { name: 'Haircare', count: 1500 },
      { name: 'Makeup', count: 2237 },
      { name: 'Medical Equipment', count: 1000 },
    ],
  },
  {
    name: 'Fashion',
    count: 24914,
    subcategories: [
      { name: 'Clothing', count: 15000 },
      { name: 'Shoes', count: 5000 },
      { name: 'Accessories', count: 4914 },
    ],
  },
  {
    name: 'Sports, Arts & Outdoors',
    count: 3355,
    subcategories: [
      { name: 'Sports Equipment', count: 2000 },
      { name: 'Art Supplies', count: 855 },
      { name: 'Outdoor Gear', count: 500 },
    ],
  },
];

const Sidebar: React.FC = () => {
  const [hoveredCategory, setHoveredCategory] = useState<Category | null>(null);
  const [isCategoryHovered, setIsCategoryHovered] = useState(false);
  const [isSubcategoriesHovered, setIsSubcategoriesHovered] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  // Detect if the screen is large-sized (lg: and above)
  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };
    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Hide subcategories panel if neither the category nor the subcategories are hovered
  useEffect(() => {
    if (!isCategoryHovered && !isSubcategoriesHovered) {
      const timeout = setTimeout(() => {
        setHoveredCategory(null);
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [isCategoryHovered, isSubcategoriesHovered]);

  return (
    <div className="w-full lg:w-[320px]">
      {/* Sidebar Container */}
      <div
        className={`bg-white rounded-xl border border-gray-200 sticky top-[100px] transition-all duration-200 ${
          hoveredCategory ? 'rounded-r-none' : 'rounded-xl'
        }`}
      >
        <ScrollArea className="h-[calc(100vh-320px)] lg:h-[calc(100vh-400px)]">
          <div className="p-4 space-y-1">
            {categories.map((category) => (
              <div
                key={category.name}
                className={`p-3 rounded-lg cursor-pointer transition-all duration-200 flex items-center justify-between ${
                  hoveredCategory?.name === category.name
                    ? 'bg-gray-100 text-orange-500'
                    : 'hover:bg-gray-50 hover:text-orange-500'
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
                  href={`/categories/${encodeURIComponent(category.name.toLowerCase())}`}
                  passHref
                  className="w-full"
                >
                  <span className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3">
                      <span className="font-medium">{category.name}</span>
                      <span className="text-sm text-gray-500">
                        {`(${category.count.toLocaleString()})`}
                      </span>
                    </div>
                    {isLargeScreen && (
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    )}
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Subcategories Panel */}
      {isLargeScreen && hoveredCategory && (
        <div
          className="absolute bg-white rounded-r-xl border-r border-y min-w-[320px] left-[320px] top-0 z-50"
          onMouseEnter={() => setIsSubcategoriesHovered(true)}
          onMouseLeave={() => setIsSubcategoriesHovered(false)}
        >
          <ScrollArea className="h-[calc(100vh-320px)] lg:h-[calc(100vh-400px)]">
            <div className="p-4 space-y-1">
              {hoveredCategory.subcategories?.map((subcategory) => (
                <div
                  key={subcategory.name}
                  className="p-3 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors duration-200 flex items-center justify-between"
                >
                  <Link
                    href={`/categories/${encodeURIComponent(
                      hoveredCategory.name.toLowerCase(),
                    )}/${encodeURIComponent(subcategory.name.toLowerCase())}`}
                    passHref
                    className="w-full"
                  >
                    <span className="flex items-center justify-between w-full">
                      <span className="font-medium">{subcategory.name}</span>
                      <span className="text-sm text-gray-500">
                        {`${subcategory.count.toLocaleString()} ads`}
                      </span>
                    </span>
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
