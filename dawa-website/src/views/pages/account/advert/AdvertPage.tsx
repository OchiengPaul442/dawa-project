'use client';

import { useState } from 'react';
import { useProfile } from '@/contexts/profile-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  PlusCircle,
  Package2,
  ShoppingCart,
  Banknote,
  Pencil,
  PauseCircle,
  ArrowUpRight,
  Tag,
} from 'lucide-react';
import { formatCurrency } from '@/utils/CurrencyFormatter';
import { Skeleton } from '@/components/ui/skeleton';
import { EditAdvertSheet } from './edit-advert-sheet';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { formatDate } from '@/utils/dateFormatter';

export function AdvertsClient() {
  const { items, isLoading, mutate } = useProfile();
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const handleUpdateSuccess = () => {
    mutate(); // Refresh the data
    setSelectedItem(null); // Close the edit sheet
  };

  if (isLoading) {
    return <AdvertsSkeleton />;
  }

  const stats = [
    {
      title: 'Total Adverts',
      value: items?.total_items || 0,
      icon: Package2,
      description: `${items?.available_items || 0} active, ${items?.sold_items || 0} sold`,
    },
    {
      title: 'Available Items',
      value: items?.available_items || 0,
      icon: ShoppingCart,
      description: 'Currently listed for sale',
    },
    {
      title: 'Total Value',
      value: formatCurrency(
        items?.item_details?.reduce(
          (acc: number, item: any) => acc + item.price,
          0,
        ) || 0,
      ),
      icon: Banknote,
      description: 'Combined value of all items',
      isCurrency: true,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between flex-wrap gap-4 items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">My Adverts</h2>
          <p className="text-gray-600">
            Manage and track your advertisement campaigns
          </p>
        </div>
        <Link href="/my-shop">
          <Button className="bg-primary_1 hover:bg-primary_1/90">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Advert
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-primary_1" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stat.isCurrency ? `${stat.value}` : stat.value}
              </div>
              <p className="text-xs text-gray-500">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Adverts</CardTitle>
          <Link href="/my-shop">
            <Button variant="link" className="text-primary group">
              View All
              <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {items?.item_details?.map((item: any) => (
              <AdvertItem
                key={item.id}
                item={item}
                onEdit={() => setSelectedItem(item)}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedItem && (
        <EditAdvertSheet
          isOpen={!!selectedItem}
          onClose={() => setSelectedItem(null)}
          item={selectedItem}
          onUpdate={handleUpdateSuccess}
        />
      )}
    </div>
  );
}

function AdvertItem({ item, onEdit }: { item: any; onEdit: () => void }) {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
      <div className="flex gap-4">
        <img
          src={item.images[0]?.image_url || '/placeholder.svg'}
          alt={item.name}
          className="w-20 h-20 object-cover rounded-lg"
        />
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold line-clamp-1">{item.name}</h3>
            {item.item_negotiable && (
              <Badge variant="secondary" className="text-xs text-green-600">
                <Tag className="h-3 w-3 mr-1" />
                Negotiable
              </Badge>
            )}
          </div>
          <p className="text-sm font-medium text-primary_1">
            {formatCurrency(item.price)}
          </p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>{item.location}</span>
            <span>•</span>
            <span>{formatDate(item.created_at)}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          className="h-9 px-3"
          onClick={onEdit}
        >
          <Pencil className="h-4 w-4 mr-2" />
          Edit
        </Button>
        <Button variant="outline" size="sm" className="h-9 px-3" disabled>
          <PauseCircle className="h-4 w-4 mr-2" />
          Pause
        </Button>
      </div>
    </div>
  );
}

function AdvertsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64 mt-2" />
        </div>
        <Skeleton className="h-10 w-40" />
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-4 w-24" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-4 w-32 mt-2" />
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-32" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-24 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
