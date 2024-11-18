import React from 'react';
import ProdPage from './ProdPage';

interface PageProps {
  params: { slug?: string[] };
}

const Page: React.FC<PageProps> = async ({ params }) => {
  const slug = Array.isArray(params.slug)
    ? params.slug
    : params.slug
      ? [params.slug]
      : [];

  return <ProdPage slug={slug} />;
};

export default Page;
