import Layout from '@/components/layout';

export default function WishListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout newsletterProps={{ container: false, hide: true }}>
      {children}
    </Layout>
  );
}
