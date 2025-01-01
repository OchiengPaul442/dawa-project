import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';

interface MessageListSkeletonProps {
  count: number;
}

export function MessageListSkeleton({ count }: MessageListSkeletonProps) {
  return (
    <ul className="space-y-4" role="list" aria-busy="true">
      {Array.from({ length: count }).map((_, index) => (
        <li key={index}>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-start space-x-4">
                {/* Avatar skeleton */}
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex-1 min-w-0 space-y-2">
                  {/* Sender name and timestamp */}
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-4 w-1/6" />
                  </div>
                  {/* Message preview */}
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  {/* Product info */}
                  <div className="flex items-center space-x-2 mt-2">
                    <Skeleton className="h-12 w-12 rounded" />
                    <div className="space-y-1">
                      <Skeleton className="h-3 w-24" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                  </div>
                </div>
                {/* Checkbox skeleton */}
                <Skeleton className="h-5 w-5 rounded" />
              </div>
            </CardContent>
          </Card>
        </li>
      ))}
    </ul>
  );
}
