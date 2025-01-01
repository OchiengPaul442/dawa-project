import Layout from '@/components/layout';

export default function ProdLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Layout newsletterProps={{ container: false }}>{children}</Layout>;
}
