import type React from 'react';
import CardLayout from '@/components/ProductCards/CardLayout';
import type { SimilarItem } from '@/types/product';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import EmptyState from './EmptyState';
import { useRouter } from 'next/navigation';

interface SimilarProductsProps {
  similarItems: SimilarItem[];
}

const SimilarProducts: React.FC<SimilarProductsProps> = ({ similarItems }) => {
  const router = useRouter();
  if (!similarItems || similarItems.length === 0) {
    return (
      <EmptyState
        title="No Similar Products"
        description="We couldn't find any similar products at this time."
      />
    );
  }

  return (
    <div className="mt-16 bg-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-primary_1">Similar Products</h2>
        <Button
          variant="link"
          onClick={() => router.push(`/cat/${similarItems[0].category}`)}
          className="text-primary group"
        >
          View All
          <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          <span className="sr-only">View all similar products</span>
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {similarItems.map((item) => (
          <CardLayout
            key={item.id}
            product={{
              ...item,
              images: [{ image_id: '1', image_url: item.image }],
            }}
            viewType="grid"
          />
        ))}
      </div>
    </div>
  );
};

export default SimilarProducts;
