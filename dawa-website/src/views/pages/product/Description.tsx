'use client';
import React from 'react';

interface DescriptionProps {
  title: string;
  images: string[];
}

const Description: React.FC<DescriptionProps> = ({ title, images }) => {
  return (
    <div className="space-y-8">
      {/* Section 1 */}
      <div>
        <h2 className="text-xl font-bold mb-4">
          See the best picture no matter where you sit
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute
          irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
          fugiat nulla pariatur. Excepturi sunt occaecat cupidatat non proident,
          sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>

      {/* Section 2 */}
      <div>
        <h2 className="text-xl font-bold mb-4">
          Powerful intelligence for perfection
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
          aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
          qui ratione voluptatem sequi nesciunt.
        </p>
      </div>

      {/* Section 3 */}
      <div>
        <h2 className="text-xl font-bold mb-4">The power of less</h2>
        <p className="text-gray-600 leading-relaxed">
          Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis
          suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis
          autem vel eum iure reprehenderit qui in ea voluptate velit esse quam
          nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo
          voluptas nulla pariatur.
        </p>
      </div>
    </div>
  );
};

export default Description;
