import React from 'react';

import Layout from '@/components/layout';

import HomePage from '@views/pages/home/HomePage';

const page = () => {
  return (
    <Layout newsletterProps={{ container: false }}>
      <HomePage />
    </Layout>
  );
};

export default page;
