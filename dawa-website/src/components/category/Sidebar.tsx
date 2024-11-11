import React, { useEffect, useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SidebarProps {
  height?: string;
}

// Define categories outside the component to ensure stable reference
const categories = [
  {
    name: 'Laptop & Computer',
    count: 45,
    subcategories: ['Hardware', 'Memory', 'Storage', 'Software'],
  },
  {
    name: 'Smartphone',
    count: 21,
    subcategories: ['Android', 'iOS'],
  },
  {
    name: 'TV',
    count: 32,
    subcategories: ['Smart TV', 'LED', 'OLED', 'QLED'],
  },
  {
    name: 'Wireless Hardware',
    count: 129,
    subcategories: ['Routers', 'Wi-Fi Extenders', 'Modems'],
  },
  {
    name: 'Virtual Reality',
    count: 29,
    subcategories: ['Headsets', 'Accessories'],
  },
  {
    name: 'Ultrabook',
    count: 44,
  },
  {
    name: 'Desktop PC’s',
    count: 34,
  },
  {
    name: 'Speaker',
    count: 49,
    subcategories: ['Bluetooth', 'Wired'],
  },
  {
    name: 'Routers',
    count: 129,
  },
  {
    name: 'PC Components',
    count: 129,
    subcategories: ['Processors', 'Graphics Cards', 'RAM', 'Storage'],
  },
];

const Sidebar: React.FC<SidebarProps> = ({ height = '500px' }) => {
  const [openCategory, setOpenCategory] = useState<string>(categories[0].name);
  const [activeCategory, setActiveCategory] = useState<string>(
    categories[0].name,
  );

  useEffect(() => {
    setOpenCategory(categories[0].name);
  }, []);

  const toggleCategory = (categoryName: string) => {
    if (openCategory === categoryName) {
      setOpenCategory('');
    } else {
      setOpenCategory(categoryName);
    }
    setActiveCategory(categoryName);
  };

  return (
    <ScrollArea
      className="max-h-full w-full bg-white border border-gray-200 rounded-2xl p-4"
      style={{ height }}
    >
      <h2 className="font-semibold text-lg mb-4">Show all categories</h2>
      <ul className="space-y-4">
        {categories.map((category) => (
          <li key={category.name} className="flex flex-col">
            <div
              role="button"
              tabIndex={0}
              onClick={() => toggleCategory(category.name)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  toggleCategory(category.name);
                }
              }}
              className={`flex items-center justify-between font-semibold cursor-pointer transition-colors duration-200 ${
                activeCategory === category.name
                  ? 'text-primary_1'
                  : 'text-gray-900'
              }`}
              aria-expanded={openCategory === category.name}
            >
              <span className="flex items-center">
                {category.name}
                <span className="ml-2 text-sm text-gray-400">
                  ({category.count})
                </span>
              </span>
            </div>
            {category.subcategories && openCategory === category.name && (
              <ul className="ml-4 mt-2 space-y-1 text-sm text-gray-600">
                {category.subcategories.map((sub) => (
                  <li
                    key={sub}
                    className="hover:text-gray-800 transition-colors duration-200 cursor-pointer"
                  >
                    {sub}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </ScrollArea>
  );
};

export default Sidebar;
