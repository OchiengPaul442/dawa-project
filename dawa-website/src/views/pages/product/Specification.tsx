'use client';

import React, { useState } from 'react';

interface SpecificationProps {
  specifications: {
    title: string;
    details: Record<string, string>;
  }[];
}

const Specification: React.FC<SpecificationProps> = ({ specifications }) => {
  const [visibleCount, setVisibleCount] = useState(2);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 2);
  };

  return (
    <div>
      {specifications.slice(0, visibleCount).map((spec, index) => (
        <div
          key={index}
          className="flex items-center justify-between flex-row flex-wrap gap-3 mb-6 border-b border-gray-200 py-8"
        >
          <div className="flex flex-col gap-2 items-start">
            <h3 className="text-lg font-bold mb-2">{spec.title}</h3>
            <p className="text-sm text-gray-600 max-w-xs mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <ul className="text-gray-600 max-w-xs w-full">
            {Object.entries(spec.details).map(([key, value]) => (
              <li key={key} className="flex justify-between text-sm mb-1">
                <span className="font-semibold text-gray-800">{key}</span>
                <span>{value}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
      {visibleCount < specifications.length && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleLoadMore}
            className="px-6 py-2 text-sm font-bold text-primary_1 border border-primary_1 rounded hover:bg-primary_1 hover:text-white transition"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default Specification;
