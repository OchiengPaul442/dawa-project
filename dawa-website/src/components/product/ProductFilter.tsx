'use client';

import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaMinus, FaPlus } from 'react-icons/fa';
import { Range } from 'react-range';
import { formatPrice } from '@/lib/utils';

import { Button } from '../ui/button';

interface ProductFilterProps {
  appliedPriceRange: [number, number];
  appliedLocation: string;
  appliedSelectedColors: string[];
  onApplyFilters: (
    priceRange: [number, number],
    location: string,
    selectedColors: string[],
  ) => void;
  onResetFilters: () => void;
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
  appliedPriceRange,
  appliedLocation,
  appliedSelectedColors,
  onApplyFilters,
  onResetFilters,
}) => {
  // **Temporary Filter States**
  const [tempPriceRange, setTempPriceRange] =
    useState<[number, number]>(appliedPriceRange);
  const [tempLocation, setTempLocation] = useState<string>(appliedLocation);
  const [tempSelectedColors, setTempSelectedColors] = useState<string[]>(
    appliedSelectedColors,
  );

  const [showMoreColors, setShowMoreColors] = useState(false);

  // Update temporary states when applied filters change
  useEffect(() => {
    setTempPriceRange(appliedPriceRange);
    setTempLocation(appliedLocation);
    setTempSelectedColors(appliedSelectedColors);
  }, [appliedPriceRange, appliedLocation, appliedSelectedColors]);

  const toggleSelectAllColors = () => {
    if (tempSelectedColors.length === allColors.length) {
      setTempSelectedColors([]);
    } else {
      setTempSelectedColors(allColors);
    }
  };

  const displayedColors = showMoreColors ? allColors : allColors.slice(0, 4);

  const handleApply = () => {
    onApplyFilters(tempPriceRange, tempLocation, tempSelectedColors);
  };

  const handleReset = () => {
    setTempPriceRange([0, 80000000]);
    setTempLocation('');
    setTempSelectedColors([]);
    onResetFilters();
  };

  return (
    <section className="bg-white border border-gray-200 p-4 rounded-md shadow-sm transition-all duration-300 hover:shadow-md space-y-6">
      <h3 className="text-lg font-semibold text-gray-800">Filters</h3>

      {/* Price Range Slider */}
      <div>
        <label className="text-sm font-medium text-gray-600 mb-2 block">
          Price Range (UGX)
        </label>
        <Range
          values={tempPriceRange}
          step={STEP}
          min={MIN_PRICE}
          max={MAX_PRICE}
          onChange={(values) => setTempPriceRange([values[0], values[1]])}
          renderTrack={({ props, children }) => {
            const { key, ...otherProps } = props as any;
            return (
              <div
                {...otherProps}
                key={key}
                className="w-full h-2 bg-gray-200 rounded-full mt-4 relative"
                style={{
                  background: `linear-gradient(to right, #E0E0E0 0%, #E0E0E0 ${
                    ((tempPriceRange[0] - MIN_PRICE) /
                      (MAX_PRICE - MIN_PRICE)) *
                    100
                  }%, #FFA200 ${
                    ((tempPriceRange[0] - MIN_PRICE) /
                      (MAX_PRICE - MIN_PRICE)) *
                    100
                  }%, #FFA200 ${
                    ((tempPriceRange[1] - MIN_PRICE) /
                      (MAX_PRICE - MIN_PRICE)) *
                    100
                  }%, #E0E0E0 ${
                    ((tempPriceRange[1] - MIN_PRICE) /
                      (MAX_PRICE - MIN_PRICE)) *
                    100
                  }%, #E0E0E0 100%)`,
                }}
              >
                {children}
              </div>
            );
          }}
          renderThumb={({ props }) => {
            const { key, ...otherProps } = props; // Extract `key` from props
            return (
              <div
                {...otherProps}
                key={key}
                className="w-4 h-4 bg-[#FFA200] rounded-full shadow outline-none"
              ></div>
            );
          }}
        />

        <div className="flex justify-between text-sm text-gray-700 mt-2">
          <span>{formatPrice(tempPriceRange[0])}</span>
          <span>{formatPrice(tempPriceRange[1])}</span>
        </div>
      </div>

      {/* Location Dropdown */}
      <div>
        <label className="text-sm font-medium text-gray-600 mb-2 block">
          Location
        </label>
        <select
          value={tempLocation}
          onChange={(e) => setTempLocation(e.target.value)}
          className="w-full p-2 bg-gray-50 text-gray-800 font-medium border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FFA200] outline-none"
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
      <div>
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-600">Color</label>
          <button
            onClick={toggleSelectAllColors}
            className="text-[#FFA200] text-sm flex items-center"
          >
            <FaCheckCircle
              className={`mr-1 ${
                tempSelectedColors.length === allColors.length
                  ? 'text-[#FFA200]'
                  : 'text-gray-400'
              }`}
            />
            Select All
          </button>
        </div>
        <div className="flex flex-wrap gap-2 py-2">
          {displayedColors.map((color) => (
            <button
              key={color}
              onClick={() =>
                setTempSelectedColors((prevColors) =>
                  prevColors.includes(color)
                    ? prevColors.filter((c) => c !== color)
                    : [...prevColors, color],
                )
              }
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                tempSelectedColors.includes(color)
                  ? 'bg-[#FFF4E0] border-[#FFA200] text-[#FFA200]'
                  : 'bg-gray-50 border-gray-300 text-gray-800 hover:bg-gray-100'
              } border`}
            >
              {color}
            </button>
          ))}
        </div>
        {allColors.length > 4 && (
          <button
            onClick={() => setShowMoreColors(!showMoreColors)}
            className="text-[#FFA200] text-sm mt-2 flex items-center"
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
      <div className="space-y-2">
        <Button
          onClick={handleApply}
          className="w-full bg-[#FFA200] text-white py-2 rounded-md shadow hover:bg-[#FF8C00] transition-all duration-200"
        >
          Apply Filters
        </Button>
        <Button
          onClick={handleReset}
          className="w-full bg-transparent text-[#FFA200] border border-[#FFA200] py-2 rounded-md hover:bg-[#FFF4E0] transition-all duration-200"
        >
          Reset Filters
        </Button>
      </div>
    </section>
  );
};

export default ProductFilter;
