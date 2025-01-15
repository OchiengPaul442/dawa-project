'use client';

import React, { useState } from 'react';
import Description from './Description';
import Specification from './Specification';
import Reviews from './Reviews';
import { Review } from './ReviewItem';

const ProductTabs: React.FC<any> = ({ product }) => {
  const [activeTab, setActiveTab] = useState('description');
  const [reviews, setReviews] = useState<Review[]>(product.reviews || []);

  const handleAddReview = (review: Review) => {
    setReviews((prevReviews) => [...prevReviews, review]);
  };

  return (
    <div className="flex flex-wrap lg:flex-nowrap gap-6">
      {/* Tabs and Content Section */}
      <div className="w-full flex flex-col gap-6 lg:w-[111%]">
        {/* Tabs Navigation */}
        <div className="flex justify-between items-center bg-gray-100 px-4 lg:px-6 rounded-md overflow-x-auto">
          {['Description', 'Specification', `Reviews (${reviews.length})`].map(
            (tab, index) => (
              <button
                key={index}
                className={`relative py-2 md:py-4 px-2 md:px-4 text-center transition-all ${
                  activeTab === tab.toLowerCase().replace(/\s\(.+?\)/, '')
                    ? 'text-primary_1 font-semibold'
                    : 'text-gray-600'
                }`}
                onClick={() =>
                  setActiveTab(tab.toLowerCase().replace(/\s\(.+?\)/, ''))
                }
              >
                {tab}
                {activeTab === tab.toLowerCase().replace(/\s\(.+?\)/, '') && (
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-[3px] w-6 md:w-8 bg-primary_1 rounded-t"></span>
                )}
              </button>
            ),
          )}
        </div>

        {/* Tabs Content */}
        <div>
          {activeTab === 'description' && (
            <Description title={product.title} images={product.images} />
          )}
          {activeTab === 'specification' && (
            <Specification specifications={product.specifications} />
          )}
          {activeTab === 'reviews' && (
            <Reviews reviews={reviews} onAddReview={handleAddReview} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductTabs;
