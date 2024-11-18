import Layout from '@/components/layout';
import HotSalesCarousel from '@/components/carousels/HotSalesCarousel';
import RecentlyViewedCarousel from '@/components/carousels/RecentlyViewedCarousel';

export default function CategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout newsletterProps={{ container: false }}>
      {children}
      {/* Carousels Section */}
      <section className="grid grid-cols-1 gap-8">
        <HotSalesCarousel />
        <RecentlyViewedCarousel />
      </section>
    </Layout>
  );
}
