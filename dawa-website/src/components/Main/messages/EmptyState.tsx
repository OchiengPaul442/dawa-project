import Link from 'next/link';
import Button from '@/components/common/Button';
import { Plus } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export function EmptyState({ title, description, icon }: EmptyStateProps) {
  return (
    <div className="text-center flex justify-center items-center flex-col py-12 bg-gray-50 rounded-lg">
      <div className="inline-block mb-4">{icon}</div>
      <h2 className="text-2xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600 mb-6">{description}</p>
      <Link href="/browse">
        <Button icon={Plus}>Find Things to Discuss</Button>
      </Link>
    </div>
  );
}
