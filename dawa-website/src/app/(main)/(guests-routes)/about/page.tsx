import Layout from '@/components/layout';
import About_Page from '@views/pages/about/AboutPage';

const AboutPage = () => {
  return (
    <Layout newsletterProps={{ container: true }}>
      <About_Page />
    </Layout>
  );
};

export default AboutPage;
