import Layout from '@/components/layout';
import mainConfig from '@/configs/mainConfigs';
import AuthGuard from '@hocs/AuthGuard';
import { Toaster } from 'sonner';

export default function WishListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <Layout addFooter={false}>
        <main className={`${mainConfig.maxWidthClass} min-h-dvh`}>
          {children}
          <Toaster position="top-right" />
        </main>
      </Layout>
    </AuthGuard>
  );
}
