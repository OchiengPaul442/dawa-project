import CategoryPage from './CategoryPage';

const Page = ({ params }: { params: any }) => {
  return (
    <div>
      <CategoryPage category={params.id} />
    </div>
  );
};

export default Page;
