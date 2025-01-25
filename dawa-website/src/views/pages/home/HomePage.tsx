import { CategoriesMenu } from '@/components/features/categories/categories-menu';
import mainConfig from '@/configs/mainConfigs';
import ProductPage from '@/views/pages/trendingProducts';
import dynamic from 'next/dynamic';
const Sidebar = dynamic(() => import('@views/pages/category/Sidebar'));

export default function HomePage() {
  return (
    <div className={`flex flex-col ${mainConfig.maxWidthClass} gap-12`}>
      <section>
        <CategoriesMenu />
      </section>
      <section>
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
      </section>
    </div>
  );
}
