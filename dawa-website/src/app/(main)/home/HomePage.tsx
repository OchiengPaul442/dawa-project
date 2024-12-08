'use client';
import React from 'react';

import HotSalesCarousel from '@/components/features/carousels/HotSalesCarousel';
import PopularSearchCarousel from '@/components/features/carousels/PopularSearchCarousel';
import RecentlyViewedCarousel from '@/components/features/carousels/RecentlyViewedCarousel';
import Top10ProductCarousel from '@/components/features/carousels/Top10ProductCarousel';
import BestDeals from '@/components/product/BestDeals';
import FlashSale from '@/components/product/FlashSale';
import { CategoriesMenu } from '@/components/features/categories/categories-menu';

const HomePage = () => {
  return (
    <div className="flex flex-col gap-12">
      <section>
        <CategoriesMenu />
      </section>
      <section>
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
      </section>
      <section>
        <RecentlyViewedCarousel />
      </section>
    </div>
  );
};

export default HomePage;
