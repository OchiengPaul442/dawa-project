import Layout from '@/components/layout';
export default function WishListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout newsletterProps={{ container: false, hide: true }}>
      <main className="max-w-7xl mx-auto min-h-screen px-4">{children}</main>
    </Layout>
  );
}
