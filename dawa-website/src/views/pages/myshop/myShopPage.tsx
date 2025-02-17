'use client';

import { useState, useEffect, useMemo } from 'react';
import { useShopData } from '@core/hooks/useProductData';
import { useDispatch, useSelector } from '@/redux-store/hooks';
import { setSelectedUserId } from '@/redux-store/slices/myshop/selectedUserSlice';
import { ShopHeader } from './shop-header';
import { ShopContent } from './shop-content';
import { ShopSkeleton } from './shop-skeleton';
import { ErrorDisplay } from './error-display';
import type { FilterOption } from './types';
import { useAuth } from '@/@core/hooks/use-auth';

const MyShop: React.FC = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const selectedUserId = useSelector((state: any) => state.myShop.userId);
  const { shopData, isLoading, isError } = useShopData(selectedUserId);

  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
  const [filterOption, setFilterOption] = useState<FilterOption>('default');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [appliedPriceRange, setAppliedPriceRange] = useState<[number, number]>([
    0, 1000000000,
  ]);
  const [appliedLocation, setAppliedLocation] = useState('');
  const [appliedSelectedColors, setAppliedSelectedColors] = useState<string[]>(
    [],
  );

  // Fix the type error by explicitly casting the mapped category value to a string.
  const categories = useMemo(() => {
    if (!shopData?.items?.item_details) return ['all'];
    const uniqueCategories: string[] = Array.from(
      new Set(
        shopData.items.item_details.map((item: any) => item.category as string),
      ),
    );
    return ['all', ...uniqueCategories];
  }, [shopData?.items?.item_details]);

  // Set the selected user id only if it's not already set.
  useEffect(() => {
    if (!selectedUserId && user?.id) {
      dispatch(setSelectedUserId(user.id as any));
    }
  }, [dispatch, selectedUserId, user]);

  const handleFilterChange = (value: FilterOption) => {
    setFilterOption(value);
  };

  const handleApplyFilters = (
    priceRange: [number, number],
    location: string,
    selectedColors: string[],
  ) => {
    setAppliedPriceRange(priceRange);
    setAppliedLocation(location);
    setAppliedSelectedColors(selectedColors);
  };

  const handleResetFilters = () => {
    setAppliedPriceRange([0, 1000000000]);
    setAppliedLocation('');
    setAppliedSelectedColors([]);
    setSelectedCategory('all');
    setFilterOption('default');
  };

  // Determine if the current user is the shop owner (admin).
  // (Adjust this logic as needed. For example, you might compare user.id with selectedUserId.)
  const isAdmin = user?.id === selectedUserId;

  if (isLoading) {
    return <ShopSkeleton />;
  }

  if (isError) {
    return <ErrorDisplay />;
  }

  if (!shopData) {
    return <ErrorDisplay message="No shop data available" />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <ShopHeader
          user={shopData.user_profile}
          stats={shopData.items}
          isAdmin={isAdmin}
        />
        <ShopContent
          shopData={shopData}
          viewType={viewType}
          setViewType={setViewType}
          filterOption={filterOption}
          handleFilterChange={handleFilterChange}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={categories}
          appliedPriceRange={appliedPriceRange}
          appliedLocation={appliedLocation}
          appliedSelectedColors={appliedSelectedColors}
          handleApplyFilters={handleApplyFilters}
          handleResetFilters={handleResetFilters}
          isAdmin={isAdmin}
        />
      </div>
    </div>
  );
};

export default MyShop;
