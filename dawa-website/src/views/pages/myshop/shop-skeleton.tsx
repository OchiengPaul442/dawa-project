import type React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export const ShopSkeleton: React.FC = () => (
  <div className="container mx-auto px-4 py-8">
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center space-x-6">
        <Skeleton className="w-24 h-24 rounded-full" />
        <div className="space-y-4 flex-grow">
          <Skeleton className="h-8 w-64" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
        <div className="space-x-3">
          <Skeleton className="h-10 w-32 inline-block" />
          <Skeleton className="h-10 w-32 inline-block" />
        </div>
      </div>
    </div>

    <div className="mt-8">
      <Skeleton className="h-12 w-full" />
    </div>

    <div className="flex flex-col lg:flex-row gap-8 mt-8">
      <aside className="w-full lg:w-1/4">
        <Skeleton className="h-[600px] w-full" />
      </aside>
      <main className="w-full lg:w-3/4 space-y-6">
        <Skeleton className="h-12 w-full" />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-[300px]" />
          ))}
        </div>
      </main>
    </div>
  </div>
);
