import Layout from '@/components/layout';
import AuthGuard from '@hocs/AuthGuard';
export default function WishListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <Layout newsletterProps={{ container: false, hide: true }}>
        <main className="max-w-7xl mx-auto min-h-screen px-4">{children}</main>
      </Layout>
    </AuthGuard>
  );
}
