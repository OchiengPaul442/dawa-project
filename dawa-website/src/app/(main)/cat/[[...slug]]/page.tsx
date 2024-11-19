import CategoryPage from './CategoryPage';

interface PageProps {
  params: Promise<{
    slug?: string[];
  }>;
}

export default async function Page({ params }: PageProps) {
  // Wait for params to resolve
  const resolvedParams = await params;

  const slug = Array.isArray(resolvedParams?.slug)
    ? resolvedParams.slug
    : resolvedParams?.slug
      ? [resolvedParams.slug]
      : [];

  return <CategoryPage category={slug} />;
}
