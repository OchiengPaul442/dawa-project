'use client';
import Layout from '@/components/layout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
export default function WishListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout newsletterProps={{ container: false, hide: true }}>
        {children}
      </Layout>
    </QueryClientProvider>
  );
}
