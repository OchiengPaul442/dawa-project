'use client';

import React from 'react';
import { FaTh, FaThList } from 'react-icons/fa';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';

interface FiltersAndSortingProps {
  category: string[];
  viewType: 'grid' | 'list';
  setViewType: (viewType: 'grid' | 'list') => void;
  filterOption:
    | 'default'
    | 'rating'
    | 'price_low_to_high'
    | 'price_high_to_low';
  handleFilterChange: (value: string) => void;
}

const FiltersAndSorting: React.FC<FiltersAndSortingProps> = React.memo(
  ({ category, viewType, setViewType, filterOption, handleFilterChange }) => {
    return (
      <div className="space-y-4">
        {/* Creatively formatted category display */}
        <div className="bg-gradient-to-r from-primary_1/10 to-primary_1/5 p-4 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Browse Categories
          </h2>
          <div className="flex flex-wrap gap-2">
            {category.length === 0 ? (
              <Badge
                variant="outline"
                className="text-primary_1 border-primary_1"
              >
                All Categories
              </Badge>
            ) : (
              category.map((cat, index) => (
                <React.Fragment key={cat}>
                  <Badge
                    variant="outline"
                    className="text-primary_1 border-primary_1"
                  >
                    {cat
                      .replace(/-/g, ' ')
                      .replace(/\b\w/g, (char) => char.toUpperCase())}
                  </Badge>
                  {index < category.length - 1 && (
                    <Separator orientation="vertical" className="h-5" />
                  )}
                </React.Fragment>
              ))
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Button
              variant={viewType === 'grid' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setViewType('grid')}
              aria-label="View as Grid"
              className={` hover:bg-primary_1 transition-colors ${
                viewType === 'grid' ? 'text-white bg-gray-700' : 'text-gray-400'
              }`}
            >
              <FaTh className="h-4 w-4" />
            </Button>
            <Button
              variant={viewType === 'list' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setViewType('list')}
              aria-label="View as List"
              className={` hover:bg-primary_1 transition-colors ${
                viewType === 'list' ? 'text-white bg-gray-700' : 'text-gray-400'
              }`}
            >
              <FaThList className="h-4 w-4" />
            </Button>
          </div>

          <Select value={filterOption} onValueChange={handleFilterChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Popularity</SelectItem>
              <SelectItem value="price_low_to_high">
                Price: Low to High
              </SelectItem>
              <SelectItem value="price_high_to_low">
                Price: High to Low
              </SelectItem>
              {/* <SelectItem value="rating">Rating</SelectItem> */}
            </SelectContent>
          </Select>
        </div>
      </div>
    );
  },
);

FiltersAndSorting.displayName = 'FiltersAndSorting';

export default FiltersAndSorting;
