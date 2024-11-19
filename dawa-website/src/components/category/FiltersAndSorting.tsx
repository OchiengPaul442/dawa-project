'use client';

import React from 'react';
import { FaTh, FaThList } from 'react-icons/fa';

interface FiltersAndSortingProps {
  category: string[];
  viewType: 'grid' | 'list';
  setViewType: (viewType: 'grid' | 'list') => void;
  filterOption:
    | 'default'
    | 'rating'
    | 'price_low_to_high'
    | 'price_high_to_low';
  handleFilterChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const FiltersAndSorting: React.FC<FiltersAndSortingProps> = ({
  category,
  viewType,
  setViewType,
  filterOption,
  handleFilterChange,
}) => {
  return (
    <div className="flex flex-col lg:flex-row flex-wrap justify-between items-center gap-4">
      <h2 className="text-2xl font-semibold capitalize">
        {decodeURIComponent(category.join('/'))}
      </h2>
      <div className="flex items-center gap-2">
        {/* Grid View Button */}
        <button
          onClick={() => setViewType('grid')}
          className={`p-2 rounded-md ${
            viewType === 'grid' ? 'text-primary_1' : 'text-gray-300'
          } transition-colors duration-200`}
          aria-label="View as Grid"
        >
          <FaTh size={18} />
        </button>

        {/* List View Button */}
        <button
          onClick={() => setViewType('list')}
          className={`p-2 rounded-md ${
            viewType === 'list' ? 'text-primary_1' : 'text-gray-300'
          } transition-colors duration-200`}
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
  );
};

export default FiltersAndSorting;
