import React from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { slugify } from '@/utils/slugify';
import { useSelector } from '@/redux-store/hooks';
import { selectCategories } from '@/redux-store/slices/categories/categories';

import { useDispatch } from '@redux-store/hooks';
import { useRouter } from 'next/navigation';
import {
  Truck,
  Home,
  Phone,
  Tv,
  Sofa,
  Palette,
  Wrench,
  ShoppingBag,
  Activity,
  Briefcase,
  Heart,
} from 'lucide-react';
import { useAuth } from '@/@core/hooks/use-auth';
import { openAuthDialog } from '@/redux-store/slices/authDialog/authDialogSlice';

// Map category names to icons
const categoryIconMap: Record<string, React.ElementType> = {
  Vehicles: Truck,
  Property: Home,
  'Phones & Tablets': Phone,
  Electronics: Tv,
  'Home, Appliances & Furniture': Sofa,
  'Health & Beauty': Palette,
  Fashion: ShoppingBag,
  'Sports, Arts & Outdoors': Activity,
  'Seeking Work CVs': Briefcase,
  Services: Wrench,
  Jobs: Briefcase,
  'Babies & Kids': ShoppingBag,
  Pets: Heart,
  'Agriculture & Food': Wrench,
  'Commercial Equipment & Tools': Wrench,
  'Repair & Construction': Wrench,
};

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
        const Icon = categoryIconMap[category_name] || Wrench;
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
