'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { Range, getTrackBackground } from 'react-range';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { locations } from '@/data/locations';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { LocationDialog } from '../../dialogs/location-dialog';

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
const MAX_PRICE = 1_000_000_000;
const STEP = 100_000;
const DEFAULT_MIN = 20_000_000;
const DEFAULT_MAX = 80_000_000;
const CURRENCY = 'UGX';

const allColors = [
  'White',
  'Black',
  'Blue',
  'Red',
  'Green',
  'Yellow',
  'Purple',
];

const formatCurrency = (value: number) => {
  return value.toLocaleString('en-UG', {
    style: 'currency',
    currency: 'UGX',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

const ProductFilter: React.FC<ProductFilterProps> = ({
  appliedPriceRange,
  appliedLocation,
  appliedSelectedColors,
  onApplyFilters,
  onResetFilters,
}) => {
  const [tempPriceRange, setTempPriceRange] =
    useState<[number, number]>(appliedPriceRange);
  const [tempLocation, setTempLocation] = useState<string>(appliedLocation);
  const [tempSelectedColors, setTempSelectedColors] = useState<string[]>(
    appliedSelectedColors,
  );
  const [showMoreColors, setShowMoreColors] = useState(false);
  const [minInput, setMinInput] = useState(formatCurrency(tempPriceRange[0]));
  const [maxInput, setMaxInput] = useState(formatCurrency(tempPriceRange[1]));
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    setTempPriceRange(appliedPriceRange);
    setTempLocation(appliedLocation);
    setTempSelectedColors(appliedSelectedColors);
    setMinInput(formatCurrency(appliedPriceRange[0]));
    setMaxInput(formatCurrency(appliedPriceRange[1]));
  }, [appliedPriceRange, appliedLocation, appliedSelectedColors]);

  const handlePriceChange = (values: number[]) => {
    setTempPriceRange([values[0], values[1]]);
    setMinInput(formatCurrency(values[0]));
    setMaxInput(formatCurrency(values[1]));
  };

  const handleInputChange = (value: string, isMin: boolean) => {
    const numValue = parseInt(value.replace(/[^0-9]/g, '')) || 0;

    if (isMin) {
      setMinInput(formatCurrency(numValue));
      if (numValue <= tempPriceRange[1]) {
        setTempPriceRange([numValue, tempPriceRange[1]]);
      }
    } else {
      setMaxInput(formatCurrency(numValue));
      if (numValue >= tempPriceRange[0]) {
        setTempPriceRange([tempPriceRange[0], numValue]);
      }
    }
  };

  const toggleSelectAllColors = () => {
    setTempSelectedColors(
      tempSelectedColors.length === allColors.length ? [] : [...allColors],
    );
  };

  const toggleColor = (color: string) => {
    setTempSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color],
    );
  };

  const displayedColors = useMemo(
    () => (showMoreColors ? allColors : allColors.slice(0, 4)),
    [showMoreColors],
  );

  const handleApply = () => {
    onApplyFilters(tempPriceRange, tempLocation, tempSelectedColors);
  };

  const handleReset = () => {
    setTempPriceRange([DEFAULT_MIN, DEFAULT_MAX]);
    setMinInput(formatCurrency(DEFAULT_MIN));
    setMaxInput(formatCurrency(DEFAULT_MAX));
    setTempLocation('');
    setTempSelectedColors([]);
    onResetFilters();
  };

  return (
    <Collapsible
      open={isExpanded}
      onOpenChange={setIsExpanded}
      className="bg-white border border-gray-200 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md"
    >
      <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="w-9 font-thin p-0">
            {isExpanded ? <FiMinus /> : <FiPlus />}
          </Button>
        </CollapsibleTrigger>
      </div>

      <CollapsibleContent>
        <div className="p-4 space-y-6">
          {/* Custom Price Range Inputs */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">
              Price Range ({CURRENCY})
            </label>
            <div className="flex gap-3 items-center">
              <div className="flex-1">
                <Input
                  type="text"
                  value={minInput}
                  onChange={(e) => handleInputChange(e.target.value, true)}
                  className="w-full"
                  placeholder="Min"
                />
              </div>
              <span className="text-gray-400">-</span>
              <div className="flex-1">
                <Input
                  type="text"
                  value={maxInput}
                  onChange={(e) => handleInputChange(e.target.value, false)}
                  className="w-full"
                  placeholder="Max"
                />
              </div>
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="px-2">
            <Range
              values={tempPriceRange}
              step={STEP}
              min={MIN_PRICE}
              max={MAX_PRICE}
              onChange={handlePriceChange}
              renderTrack={({ props, children }) => {
                const { key, ...restProps }: any = props;
                return (
                  <div
                    key={key}
                    {...restProps}
                    className="w-full h-1 bg-gray-200 rounded-full"
                    style={{
                      background: getTrackBackground({
                        values: tempPriceRange,
                        colors: ['#E0E0E0', '#FFA200', '#E0E0E0'],
                        min: MIN_PRICE,
                        max: MAX_PRICE,
                      }),
                    }}
                  >
                    {children}
                  </div>
                );
              }}
              renderThumb={({ props }) => {
                const { key, ...restProps } = props;
                return (
                  <div
                    key={key}
                    {...restProps}
                    className="w-5 h-5 bg-[#FFA200] rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-[#FFA200] focus:ring-opacity-50"
                  />
                );
              }}
            />
          </div>

          {/* Location Dropdown */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">
              Location
            </label>
            <LocationDialog
              locations={locations}
              selectedLocation={tempLocation}
              onLocationSelect={setTempLocation}
            />
          </div>

          {/* Color Selection */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-gray-600">Color</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleSelectAllColors}
                className="text-[#FFA200] hover:text-[#FF8C00] transition-colors h-auto py-1"
              >
                <FaCheckCircle
                  className={`mr-2 ${tempSelectedColors.length === allColors.length ? 'text-[#FFA200]' : 'text-gray-400'}`}
                />
                Select All
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {displayedColors.map((color) => (
                <Button
                  key={color}
                  onClick={() => toggleColor(color)}
                  variant={
                    tempSelectedColors.includes(color) ? 'secondary' : 'outline'
                  }
                  size="sm"
                  className={`transition-all duration-200 ${
                    tempSelectedColors.includes(color)
                      ? 'bg-[#FFF4E0] text-[#FFA200] hover:bg-[#FFE0B2]'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {color}
                </Button>
              ))}
            </div>
            {allColors.length > 4 && (
              <Button
                variant="link"
                size="sm"
                onClick={() => setShowMoreColors(!showMoreColors)}
                className="text-[#FFA200] hover:text-[#FF8C00] transition-colors p-0 h-auto"
              >
                {showMoreColors ? (
                  <FiMinus className="mr-2" />
                ) : (
                  <FiPlus className="mr-2" />
                )}
                {showMoreColors ? 'Show Less' : 'Show More'}
              </Button>
            )}
          </div>

          {/* Filter and Reset Buttons */}
          <div className="space-y-3 pt-2">
            <Button
              onClick={handleApply}
              className="w-full bg-[#FFA200] text-white hover:bg-[#FF8C00] transition-all duration-200"
            >
              Apply Filters
            </Button>
            <Button
              onClick={handleReset}
              variant="outline"
              className="w-full border-[#FFA200] text-[#FFA200] hover:bg-[#FFF4E0] transition-all duration-200"
            >
              Reset Filters
            </Button>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default ProductFilter;
