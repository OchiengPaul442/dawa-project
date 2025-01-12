import Layout from '@/components/layout';
import RecentlyViewedCarousel from '@/components/features/carousels/RecentlyViewedCarousel';

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
        <RecentlyViewedCarousel />
      </section>
    </Layout>
  );
}
