import ProdPage from './ProdPage';

interface PageProps {
  params: Promise<{
    slug?: string[];
  }>;
}

const Page = async ({ params }: PageProps) => {
  // Wait for params to resolve
  const resolvedParams = await params;

  const slug = resolvedParams?.slug
    ? Array.isArray(resolvedParams.slug)
      ? resolvedParams.slug
      : [resolvedParams.slug]
    : [];

  return <ProdPage slug={slug} />;
};

export default Page;
