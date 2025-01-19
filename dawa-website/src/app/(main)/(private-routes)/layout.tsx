import Layout from '@/components/layout';
import mainConfig from '@/configs/mainConfigs';
import AuthGuard from '@hocs/AuthGuard';
export default function WishListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <Layout newsletterProps={{ container: false, hide: true }}>
        <main className={`${mainConfig.maxWidthClass} min-h-dvh`}>
          {children}
        </main>
      </Layout>
    </AuthGuard>
  );
}
