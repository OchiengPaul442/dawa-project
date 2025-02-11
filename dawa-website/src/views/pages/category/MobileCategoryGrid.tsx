import React from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { slugify } from '@/utils/slugify';
import { useSelector } from '@/redux-store/hooks';
import { selectCategories } from '@/redux-store/slices/categories/categories';

import { useDispatch } from '@redux-store/hooks';
import { useRouter } from 'next/navigation';
import { categoryIconMap, UniversalFallbackIcon } from './icon-maps';
import { useAuth } from '@/@core/hooks/use-auth';
import { openAuthDialog } from '@/redux-store/slices/authDialog/authDialogSlice';

const MobileCategoryGrid: React.FC = React.memo(() => {
  const router = useRouter();
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories) as any;
  const { user } = useAuth();

  const handleSellClick = () => {
    if (!user) {
      dispatch(openAuthDialog());
    } else {
      router.push('/post-ad');
    }
  };

  return (
    <div className="grid grid-cols-4 gap-2">
      {/* Post Ad Button */}
      <button
        onClick={handleSellClick}
        className="flex flex-col items-center justify-center p-4 bg-gray-700 text-white aspect-square rounded-lg"
      >
        <Plus className="h-6 w-6 mb-2" />
        <span className="text-xs text-center">Post ad</span>
      </button>

      {/* Category List */}
      {categories.map(({ category_name }: any) => {
        // Get the icon component for the category;
        // fallback to UniversalFallbackIcon if none is defined.
        const Icon = categoryIconMap[category_name] || UniversalFallbackIcon;
        const categorySlug = slugify(category_name);

        return (
          <Link key={category_name} href={`/subs/${categorySlug}`}>
            <div className="flex flex-col items-center justify-center p-4 bg-gray-100 border aspect-square rounded-lg">
              <Icon className="h-6 w-6 mb-2 text-primary" />
            </div>
            <span className="text-xs text-center line-clamp-2 mt-2 w-full">
              {category_name}
            </span>
          </Link>
        );
      })}
    </div>
  );
});

MobileCategoryGrid.displayName = 'MobileCategoryGrid';
export default MobileCategoryGrid;
