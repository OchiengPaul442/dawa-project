import RecentlyViewedCarousel from '@/components/features/carousels/RecentlyViewedCarousel';
import { CategoriesMenu } from '@/components/features/categories/categories-menu';
import ProductPage from '@/views/pages/trendingProducts';
import dynamic from 'next/dynamic';
import HotSalesCarousel from '@/components/features/carousels/HotSalesCarousel';
const Sidebar = dynamic(() => import('@views/pages/category/Sidebar'));

export default function HomePage() {
  return (
    <div className="flex flex-col gap-12">
      <section>
        <CategoriesMenu />
      </section>
      <section>
        <div className="container mx-auto px-4">
          <div className="flex gap-4">
            <div className="hidden lg:block w-72 flex-shrink-0">
              <div className="sticky top-6 z-40">
                <Sidebar />
              </div>
            </div>
            <div className="flex-grow min-w-0 z-30">
              <ProductPage />
            </div>
          </div>
        </div>
      </section>
      <section>
        <HotSalesCarousel />
      </section>
      <section>
        <RecentlyViewedCarousel />
      </section>
    </div>
  );
}
