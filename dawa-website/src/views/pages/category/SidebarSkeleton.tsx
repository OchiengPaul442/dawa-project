'use client';
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const SidebarSkeleton: React.FC = () => {
  return (
    <div className="p-4 space-y-2">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="flex items-center justify-between gap-4 p-3 bg-gray-100 rounded-md"
        >
          <div className="flex items-center gap-3">
            {/* Icon Skeleton */}
            <Skeleton className="h-8 w-8 rounded-full" />
            {/* Text Skeleton */}
            <div className="flex flex-col gap-1 w-full">
              <Skeleton className="h-4 w-2/3 rounded-md" />
              <Skeleton className="h-3 w-1/2 rounded-md" />
            </div>
          </div>
          {/* Chevron Skeleton */}
          <Skeleton className="h-5 w-5 rounded-full" />
        </div>
      ))}
    </div>
  );
};

export default SidebarSkeleton;
