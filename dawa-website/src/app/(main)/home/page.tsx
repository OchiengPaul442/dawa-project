import React from 'react';

import Layout from '@/components/layout';

import HomePage from './HomePage';

const page = () => {
  return (
    <Layout newsletterProps={{ container: false }}>
      <HomePage />
    </Layout>
  );
};

export default page;
