import Layout from '@/components/layout';
import RecentlyViewedCarousel from '@/components/features/carousels/RecentlyViewedCarousel';
import mainConfig from '@/configs/mainConfigs';

export default function CategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout newsletterProps={{ container: false }}>
      <div className={`${mainConfig.maxWidthClass}`}>
        {children}
        {/* Carousels Section */}
        <section>
          <RecentlyViewedCarousel />
        </section>
      </div>
    </Layout>
  );
}
