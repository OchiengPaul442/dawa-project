import type React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export const ShopSkeleton: React.FC = () => (
  <div className="container mx-auto px-4 py-8 space-y-8">
    {/* Header Card */}
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex flex-col sm:flex-row items-center sm:space-x-6 space-y-4 sm:space-y-0">
        {/* Profile Image Skeleton */}
        <Skeleton className="w-24 h-24 sm:w-32 sm:h-32 rounded-full" />
        {/* Info Skeleton */}
        <div className="flex-grow space-y-4">
          <Skeleton className="h-8 w-40 sm:w-64" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-32 sm:w-48" />
            <Skeleton className="h-4 w-24 sm:w-32" />
          </div>
        </div>
        {/* Action Buttons Skeleton */}
        <div className="flex space-x-3">
          <Skeleton className="h-10 w-20 sm:w-24 inline-block" />
          <Skeleton className="h-10 w-20 sm:w-24 inline-block" />
        </div>
      </div>
    </div>

    {/* Banner Skeleton */}
    <Skeleton className="h-12 w-full" />

    {/* Main Content Skeleton */}
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar Skeleton */}
      <aside className="w-full lg:w-1/4">
        <Skeleton className="w-full h-48 sm:h-64 lg:h-[600px]" />
      </aside>
      {/* Products Grid Skeleton */}
      <main className="w-full lg:w-3/4 space-y-6">
        <Skeleton className="h-12 w-full" />
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="w-full h-48 sm:h-64 lg:h-[300px]" />
          ))}
        </div>
      </main>
    </div>
  </div>
);

export default ShopSkeleton;
