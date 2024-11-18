import CategoryPage from './CategoryPage';

export default function Page({ params }: { params: { slug?: string[] } }) {
  const slug = params?.slug || [];

  return (
    <div>
      <CategoryPage category={slug} />
    </div>
  );
}
