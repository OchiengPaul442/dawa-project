'use client';
import React from 'react';

// import HotSalesCarousel from '@/components/features/carousels/HotSalesCarousel';
// import PopularSearchCarousel from '@/components/features/carousels/PopularSearchCarousel';
// import Top10ProductCarousel from '@/components/features/carousels/Top10ProductCarousel';
// import BestDeals from '@/views/shared/BestDeals';
// import FlashSale from '@/components/features/carousels/FlashSale';
import RecentlyViewedCarousel from '@/components/features/carousels/RecentlyViewedCarousel';
import { CategoriesMenu } from '@/components/features/categories/categories-menu';
import ProductPage from '@/views/pages/AllProducts';

const HomePage = () => {
  return (
    <div className="flex flex-col gap-12">
      <section>
        <CategoriesMenu />
      </section>
      <section>
        <ProductPage />
      </section>
      {/* <section>
        <BestDeals />
      </section>
      <section>
        <Top10ProductCarousel />
      </section>
      <section>
        <PopularSearchCarousel />
      </section>
      <section>
        <FlashSale />
      </section>
      <section>
        <HotSalesCarousel />
      </section> */}
      <section>
        <RecentlyViewedCarousel />
      </section>
    </div>
  );
};

export default HomePage;
