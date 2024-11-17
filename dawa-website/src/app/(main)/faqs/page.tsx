import Layout from '@/components/layout';
import FAQPage from './FAQPage';

const page = () => {
  return (
    <Layout newsletterProps={{ container: false, hide: true }}>
      <FAQPage />
    </Layout>
  );
};

export default page;
