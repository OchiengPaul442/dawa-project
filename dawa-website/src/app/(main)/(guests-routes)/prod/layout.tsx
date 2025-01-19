import Layout from '@/components/layout';
import mainConfig from '@/configs/mainConfigs';

export default function ProdLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout newsletterProps={{ container: false }}>
      <main className={`${mainConfig.maxWidthClass} min-h-dvh`}>
        {children}
      </main>
    </Layout>
  );
}
