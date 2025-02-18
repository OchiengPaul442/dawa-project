import MyShop from '@/views/pages/myshop/myShopPage';
import Layout from '@/components/layout';

const page = () => {
  return (
    <Layout addFooter={false}>
      <MyShop />
    </Layout>
  );
};

export default page;
