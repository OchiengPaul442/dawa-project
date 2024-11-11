// components/product/ProductFilter.tsx
'use client';
import React, { useState } from 'react';
import { FaCheckCircle, FaMinus, FaPlus } from 'react-icons/fa';
import { Range } from 'react-range';

import { formatPrice } from '@/lib/utils';

import { Button } from '../ui/button';

interface ProductFilterProps {
  priceRange: [number, number];
  setPriceRange: React.Dispatch<React.SetStateAction<[number, number]>>;
  location: string;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
  selectedColors: string[];
  setSelectedColors: React.Dispatch<React.SetStateAction<string[]>>;
  applyFilters: () => void;
  resetFilters: () => void;
}

const MIN_PRICE = 0;
const MAX_PRICE = 100_000_000; // 100,000,000 UGX (100 million UGX)
const STEP = 100_000; // 100,000 UGX

const allColors = [
  'White',
  'Black',
  'Blue',
  'Red',
  'Green',
  'Yellow',
  'Purple',
];

const ProductFilter: React.FC<ProductFilterProps> = ({
  priceRange,
  setPriceRange,
  location,
  setLocation,
  selectedColors,
  setSelectedColors,
  applyFilters,
  resetFilters,
}) => {
  const [showMoreColors, setShowMoreColors] = useState(false);

  const toggleSelectAllColors = () => {
    if (selectedColors.length === allColors.length) {
      setSelectedColors([]);
    } else {
      setSelectedColors(allColors);
    }
  };

  const displayedColors = showMoreColors ? allColors : allColors.slice(0, 4);

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">Filters</h3>

      {/* Price Range Slider */}
      <div className="mb-6">
        <label className="text-sm font-semibold text-gray-500 mb-2">
          Price range (UGX)
        </label>
        <Range
          values={priceRange}
          step={STEP}
          min={MIN_PRICE}
          max={MAX_PRICE}
          onChange={(values) => setPriceRange([values[0], values[1]])}
          renderTrack={({ props, children }) => {
            // Cast props to any to safely extract 'key'
            const { key, style, ...restProps } = props as any;
            return (
              <div
                {...restProps}
                className="w-full h-1 bg-gray-300 rounded-full mt-4"
                style={{
                  ...style,
                  background: `linear-gradient(to right, gray 0%, gray ${
                    ((priceRange[0] - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) *
                    100
                  }%, orange ${
                    ((priceRange[0] - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) *
                    100
                  }%, orange ${
                    ((priceRange[1] - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) *
                    100
                  }%, gray ${
                    ((priceRange[1] - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) *
                    100
                  }%, gray 100%)`,
                }}
              >
                {children}
              </div>
            );
          }}
          renderThumb={({ props }) => {
            // Cast props to any to safely extract 'key'
            const { key, ...restProps } = props as any;
            return (
              <div
                key={key}
                {...restProps}
                className="w-4 h-4 bg-primary_1 rounded-full shadow outline-none"
              >
                <div className="w-3 h-3 bg-primary_1 rounded-full" />
              </div>
            );
          }}
        />
        <div className="flex justify-between text-sm text-gray-700 mt-2">
          <span>{formatPrice(priceRange[0])}</span>
          <span>{formatPrice(priceRange[1])}</span>
        </div>
      </div>

      {/* Location Dropdown */}
      <div className="mb-4">
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-3 bg-white text-gray-500 font-medium border border-gray-200 rounded-md"
          aria-label="Choose Location"
        >
          <option value="">Choose Location</option>
          <option value="Kampala">Kampala</option>
          <option value="Gulu">Gulu</option>
          <option value="Mbarara">Mbarara</option>
          <option value="Jinja">Jinja</option>
          <option value="Fort Portal">Fort Portal</option>
        </select>
      </div>

      {/* Color Selection */}
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-gray-500">Color</label>
          <button
            onClick={toggleSelectAllColors}
            className="text-gray-500 text-sm flex items-center"
            aria-label="Select or Deselect All Colors"
          >
            <FaCheckCircle
              className={
                selectedColors.length === allColors.length
                  ? 'text-primary_1'
                  : 'text-gray-400'
              }
            />
            <span className="ml-1">Select All</span>
          </button>
        </div>
        <div className="flex flex-wrap gap-2 py-4 mt-2">
          {displayedColors.map((color) => (
            <button
              key={color}
              onClick={() =>
                setSelectedColors((prevColors) =>
                  prevColors.includes(color)
                    ? prevColors.filter((c) => c !== color)
                    : [...prevColors, color],
                )
              }
              className={`px-4 py-3 rounded-md text-sm ${
                selectedColors.includes(color)
                  ? 'bg-orange-100 text-primary_1 border border-primary_2'
                  : 'bg-transparent text-primary_1 border border-primary_2'
              }`}
              aria-pressed={selectedColors.includes(color)}
              aria-label={`Filter by ${color} color`}
            >
              {color}
            </button>
          ))}
        </div>
        {allColors.length > 4 && (
          <button
            onClick={() => setShowMoreColors(!showMoreColors)}
            className="text-primary_1 text-sm mt-2 flex items-center"
          >
            {showMoreColors ? (
              <>
                <FaMinus className="mr-1" />
                Show Less
              </>
            ) : (
              <>
                <FaPlus className="mr-1" />
                Show More
              </>
            )}
          </button>
        )}
      </div>

      {/* Filter and Reset Buttons */}
      <div className="flex flex-col gap-2 mt-6">
        <Button
          onClick={applyFilters}
          className="w-full bg-primary_1 text-white py-2 h-12 rounded-xl hover:bg-primary_1 font-semibold"
        >
          FILTER
        </Button>
        <Button
          onClick={resetFilters}
          className="w-full bg-transparent text-primary_1 shadow-none hover:bg-transparent h-12 font-semibold"
        >
          Reset Filter
        </Button>
      </div>
    </div>
  );
};

export default ProductFilter;
