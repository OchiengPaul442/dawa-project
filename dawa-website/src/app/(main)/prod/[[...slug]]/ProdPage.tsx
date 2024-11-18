import React from 'react';

interface ProdPageProps {
  slug: string[];
}

const ProdPage: React.FC<ProdPageProps> = ({ slug }) => {
  if (slug.length === 0) {
    // Handle `/prod` route
    return (
      <div>
        <h1>Welcome to the Prod Page</h1>
        <p>This is the default content for /prod.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Dynamic Route</h1>
      <p>Slug: {slug.join(' / ')}</p>
    </div>
  );
};

export default ProdPage;
