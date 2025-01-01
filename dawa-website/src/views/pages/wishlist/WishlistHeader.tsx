'use client';
import { FaRegTrashCan } from 'react-icons/fa6';
import React, { FC, useCallback } from 'react';
import { Heart } from 'lucide-react';
import Button from '../../../components/shared/Button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface WishlistHeaderProps {
  totalItems: number;
  allSelected: boolean;
  onSelectAll: (checked: boolean) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  selectedCount: number;
  onRemoveSelected: () => void;
}

const WishlistHeader: FC<WishlistHeaderProps> = ({
  totalItems,
  allSelected,
  onSelectAll,
  sortBy,
  onSortChange,
  selectedCount,
  onRemoveSelected,
}) => {
  const handleSelectAll = useCallback(
    (checked: boolean) => {
      onSelectAll(checked);
    },
    [onSelectAll],
  );

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-primary_1" />
            <h1 className="text-sm md:text-lg lg:text-xl font-semibold text-gray-900">
              My Favorites
            </h1>
            <span className="text-gray-500">({totalItems} items)</span>
          </div>
          <div className="h-6 w-px bg-gray-200" />
          <div className="flex items-center gap-2">
            <Checkbox checked={allSelected} onCheckedChange={handleSelectAll} />
            <span className="text-sm text-gray-600">Select All</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {selectedCount > 0 && (
            <Button
              onClick={onRemoveSelected}
              className="flex items-center bg-gray-700"
              icon={FaRegTrashCan}
            >
              Remove Selected ({selectedCount})
            </Button>
          )}

          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="w-[180px] h-10">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date-added" className="h-10 cursor-pointer">
                Date Added
              </SelectItem>
              <SelectItem value="price-low" className="h-10 cursor-pointer">
                Price: Low to High
              </SelectItem>
              <SelectItem value="price-high" className="h-10 cursor-pointer">
                Price: High to Low
              </SelectItem>
              <SelectItem value="orders" className="h-10 cursor-pointer">
                Most Orders
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default React.memo(WishlistHeader);
