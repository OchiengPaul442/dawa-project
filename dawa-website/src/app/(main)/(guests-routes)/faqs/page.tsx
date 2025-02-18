import Layout from '@/components/layout';
import FAQPage from '@views/pages/faqs/FAQPage';

const page = () => {
  return (
    <Layout addFooter={true}>
      <FAQPage />
    </Layout>
  );
};

export default page;
