'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { categories } from '@/lib/mock_data';
import { ChevronRight } from 'lucide-react';

export default function CategoriesPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string[] | undefined;

  // If there are two segments in the URL, redirect to the custom subcategory page
  React.useEffect(() => {
    if (slug && slug.length === 2) {
      router.push(`/cat/${slug[0]}/${slug[1]}`);
    }
  }, [slug, router]);

  if (!slug || slug.length === 0) {
    return <AllCategories />;
  }

  const category = categories.find((cat) => cat.href === `/cat/${slug[0]}`);

  if (!category) {
    return <div>Category not found</div>;
  }

  return (
    <div className="container mx-auto px-4 mt-8">
      {/* Category Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">{category.name}</h1>
        <p className="text-gray-600 mt-1">
          Explore {category.count.toLocaleString()} items in{' '}
          {category.subcategories.length} subcategories
        </p>
      </div>

      {/* Subcategories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {category.subcategories.map((subcat) => (
          <Link
            key={subcat.href}
            href={subcat.href}
            className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200 flex items-center group"
          >
            <div className="bg-gray-100 rounded-full p-4 mr-4">
              {React.createElement(subcat.icon, {
                className: 'w-6 h-6 text-gray-600',
              })}
            </div>
            <div className="flex-grow">
              <h2 className="font-semibold text-gray-900">{subcat.name}</h2>
              <p className="text-sm text-gray-500">
                {subcat.count.toLocaleString()} items
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-orange-500 transition-colors duration-200" />
          </Link>
        ))}
      </div>

      {/* Explore Other Categories */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Explore Other Categories</h2>
        <div className="flex flex-wrap gap-3">
          {categories
            .filter((cat) => cat.href !== `/cat/${slug[0]}`)
            .map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className="inline-flex items-center px-4 py-2 rounded-lg bg-white border border-gray-200 hover:border-orange-500 transition-colors duration-200"
              >
                {React.createElement(cat.icon, {
                  className: 'w-4 h-4 text-gray-600 mr-2',
                })}
                <span className="text-sm">{cat.name}</span>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}

function AllCategories() {
  return (
    <div className="container mx-auto px-4 my-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">All Categories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <Link
            key={category.href}
            href={category.href}
            className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200 flex items-center group"
          >
            <div className="bg-gray-100 rounded-full p-4 mr-4">
              {React.createElement(category.icon, {
                className: 'w-6 h-6 text-gray-600',
              })}
            </div>
            <div className="flex-grow">
              <h2 className="font-semibold text-gray-900">{category.name}</h2>
              <p className="text-sm text-gray-500">
                {category.count.toLocaleString()} items
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-orange-500 transition-colors duration-200" />
          </Link>
        ))}
      </div>
    </div>
  );
}
