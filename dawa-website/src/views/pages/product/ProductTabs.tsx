'use client';

import React, { useState } from 'react';
import Description from './Description';
import Specification from './Specification';
import Reviews from './Reviews';
import StarRating from '../../../components/shared/StarRating';

import { Progress } from '@/components/ui/progress';

const ProductTabs: React.FC<any> = ({ product }) => {
  const [activeTab, setActiveTab] = useState('description');
  const [reviews, setReviews] = useState(product.reviews || []);

  const handleAddReview = (review: {
    name: string;
    image?: string;
    isVerified: boolean;
    rating: number;
    review: string;
  }) => {
    setReviews((prevReviews: any) => [...prevReviews, review]);
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex flex-wrap lg:flex-nowrap gap-6">
        {/* Rating Summary Section */}
        <div className="bg-primary_1 h-full max-h-[650px] text-white p-6 rounded-lg shadow-md flex flex-col items-center w-full lg:w-1/4">
          {/* Overall Rating */}
          <div className="flex items-baseline">
            <h1 className="text-[80px] font-bold leading-none relative">
              {product.rating.toFixed(1)}
              <span className="absolute bottom-1 right-[-20px] text-[20px] font-normal text-white/25">
                /5
              </span>
            </h1>
          </div>

          <div className="mt-2 mb-4">
            <StarRating
              initialRating={product.rating}
              maxRating={5}
              starSize={28}
              filledColor="fill-[#EBFF00] text-[#EBFF00]"
              emptyColor="text-white"
              readOnly
            />
          </div>
          <p className="text-sm">{reviews.length} Reviews</p>

          {/* Star Distribution */}
          <div className="mt-6 w-full space-y-4">
            {[5, 4, 3, 2, 1].map((stars) => {
              const starCount = reviews.filter(
                (review: any) => Math.round(review.rating) === stars,
              ).length;
              const percentage = (starCount / reviews.length) * 100;

              return (
                <div
                  key={stars}
                  className="flex flex-col items-center gap-2 space-x-3"
                >
                  {/* Star Rating for each row */}
                  <div className="flex-shrink-0 w-full flex px-1 justify-between items-center">
                    <StarRating
                      initialRating={stars}
                      maxRating={stars}
                      starSize={12}
                      filledColor="fill-white text-white"
                      emptyColor="text-white"
                      readOnly
                    />
                    {/* Star Count */}
                    <span className="text-xs font-medium">{starCount}</span>
                  </div>
                  {/* Progress Bar */}
                  <div className="flex-1 w-full">
                    <Progress
                      value={percentage}
                      className="bg-white/15"
                      indicatorClassName="bg-white"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tabs and Content Section */}
        <div className="w-full flex flex-col gap-6 lg:px-6 lg:w-3/4">
          {/* Tabs Navigation */}
          <div className="flex justify-between items-center bg-gray-100 px-4 lg:px-6 rounded-md overflow-x-auto">
            {[
              'Description',
              'Specification',
              `Reviews (${reviews.length})`,
            ].map((tab, index) => (
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
            ))}
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
    </div>
  );
};

export default ProductTabs;
