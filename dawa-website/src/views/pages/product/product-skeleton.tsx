import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';

export default function ProductSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left column - Main image and thumbnails */}
          <div className="lg:col-span-7 bg-white p-4 rounded-lg">
            <Skeleton className="w-full aspect-[4/3] rounded-lg mb-4" />
            <div className="grid grid-cols-5 gap-2">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="aspect-square rounded-md" />
              ))}
            </div>
          </div>

          {/* Right column - Product details */}
          <div className="lg:col-span-5 space-y-6">
            {/* Title and Price */}
            <div className="bg-white p-4 rounded-lg space-y-4">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-10 w-48" />
              <div className="inline-block">
                <Skeleton className="h-6 w-24 rounded-full" />
              </div>
            </div>

            {/* Seller Information Card */}
            <Card className="p-4 bg-white">
              <h2 className="text-lg font-semibold mb-4">
                <Skeleton className="h-6 w-40" />
              </h2>
              <div className="flex items-center gap-4 mb-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-5 w-36" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
              <Skeleton className="h-4 w-28" />
            </Card>

            {/* Action Buttons */}
            <div className="bg-white p-4 rounded-lg space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
              <Skeleton className="h-10 w-full" />
            </div>

            {/* Quick Actions Card */}
            <Card className="p-4 bg-white">
              <h3 className="text-sm font-semibold mb-3">
                <Skeleton className="h-4 w-28" />
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-5" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-5" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            </Card>

            {/* Safety & Reporting */}
            <Card className="p-4 bg-white">
              <h3 className="text-sm font-semibold mb-3">
                <Skeleton className="h-4 w-40" />
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-5" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-5" />
                  <Skeleton className="h-4 w-28" />
                </div>
              </div>
            </Card>

            {/* Share buttons */}
            <div className="bg-white p-4 rounded-lg">
              <div className="flex gap-2">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-8 w-8 rounded-full" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Description Tabs */}
        <div className="mt-8 bg-white p-4 rounded-lg">
          <div className="border-b flex gap-8 mb-6">
            {['Description', 'Specification', 'Reviews'].map((_, i) => (
              <Skeleton key={i} className="h-6 w-24" />
            ))}
          </div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
