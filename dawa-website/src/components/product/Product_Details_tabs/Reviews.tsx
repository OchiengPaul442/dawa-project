'use client';
import CustomImage from '../../common/CustomImage';
import React, { useState } from 'react';
import StarRating from '../../common/StarRating';
import { FaUser, FaCheckCircle } from 'react-icons/fa';
import Button from '@/components/common/Button';

interface ReviewsProps {
  reviews: {
    name: string;
    image?: string;
    isVerified: boolean;
    rating: number;
    review: string;
  }[];
  onAddReview: (review: {
    name: string;
    image?: string;
    isVerified: boolean;
    rating: number;
    review: string;
  }) => void;
}

const Reviews: React.FC<ReviewsProps> = ({ reviews, onAddReview }) => {
  const [reviewForm, setReviewForm] = useState({
    nickname: '',
    email: '',
    review: '',
    rating: 0,
  });

  const [visibleReviews, setVisibleReviews] = useState(5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newReview = {
      name: reviewForm.nickname,
      image: 'https://via.placeholder.com/50',
      isVerified: true,
      rating: reviewForm.rating,
      review: reviewForm.review,
    };
    onAddReview(newReview);
    setReviewForm({ nickname: '', email: '', review: '', rating: 0 });
  };

  const handleLoadMore = () => {
    setVisibleReviews((prev) => prev + 5);
  };

  return (
    <div>
      {/* Submit Review Section */}
      <div>
        <div className="flex flex-wrap gap-3 justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-bold mb-4">Submit Your Review</h3>
            <p className="text-sm text-gray-600 max-w-lg mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          {/* Rating */}
          <div>
            <label className="block text-sm font-medium mb-2">Rating</label>
            <div className="flex items-center space-x-2">
              <StarRating
                initialRating={reviewForm.rating}
                onRate={(rating) => setReviewForm({ ...reviewForm, rating })}
              />
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mb-6">
            {/* Form Inputs */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="flex flex-col gap-4">
                {/* Nickname */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Nickname
                  </label>
                  <input
                    type="text"
                    value={reviewForm.nickname}
                    onChange={(e) =>
                      setReviewForm({ ...reviewForm, nickname: e.target.value })
                    }
                    required
                    className="w-full border border-primary_1 px-4 py-4 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary_1"
                    placeholder="Type your nickname here"
                  />
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={reviewForm.email}
                    onChange={(e) =>
                      setReviewForm({ ...reviewForm, email: e.target.value })
                    }
                    required
                    className="w-full border border-gray-300 px-4 py-4 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary_1"
                    placeholder="Type your email address"
                  />
                </div>
              </div>

              {/* Review */}
              <div>
                <label className="block text-sm font-medium mb-2">Review</label>
                <textarea
                  value={reviewForm.review}
                  onChange={(e) =>
                    setReviewForm({ ...reviewForm, review: e.target.value })
                  }
                  required
                  className="w-full border max-h-[160px] h-full border-gray-300 px-4 py-2 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary_1"
                  placeholder="Type your review here"
                  rows={3}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-start">
              <Button
                type="submit"
                className="px-6 py-2 mt-12 lg:mt-6 bg-primary_1 h-10 text-white font-bold rounded-lg hover:bg-primary_1 transition"
              >
                Submit
              </Button>
            </div>
          </div>
        </form>
      </div>

      {/* Display Reviews */}
      {reviews.slice(0, visibleReviews).map((review, index) => (
        <div
          key={index}
          className="border-t border-gray-200 py-8 flex flex-wrap gap-3 justify-between items-center"
        >
          {/* Reviewer Info */}
          <div className="flex flex-col gap-2 items-start">
            <div className="flex items-center space-x-4">
              {review.image ? (
                <div className="w-12 h-12 overflow-hidden">
                  <CustomImage
                    src={review.image}
                    alt={review.name}
                    fill
                    style={{
                      objectFit: 'cover',
                      borderRadius: '100%',
                    }}
                  />
                </div>
              ) : (
                <div className="w-16 h-16 rounded-xl-full bg-gray-300 flex items-center justify-center">
                  <FaUser className="text-gray-500 text-xl" />
                </div>
              )}

              {/* Reviewer Details */}
              <div className="flex flex-col">
                <div className="flex items-center space-x-2">
                  <h4 className="text-lg font-bold text-gray-800">
                    {review.name}
                  </h4>
                </div>
                {review.isVerified && (
                  <div className="flex items-center space-x-3">
                    {review.isVerified && (
                      <FaCheckCircle
                        className="text-primary_1 text-sm"
                        title="Verified Buyer"
                      />
                    )}
                    <span className="text-sm text-primary_1">
                      Verified Buyer
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Review Text */}
            <p className="text-sm text-gray-600 mt-2">{review.review}</p>
          </div>

          {/* Rating */}
          <div className="flex flex-col items-start gap-2">
            <h4 className="text-3xl font-bold text-primary_1">
              {review.rating.toFixed(1)}
            </h4>
            <StarRating initialRating={review.rating} maxRating={5} readOnly />
          </div>
        </div>
      ))}

      {/* Load More Button */}
      {visibleReviews < reviews.length && (
        <div className="flex justify-center w-full mt-6">
          <Button
            onClick={handleLoadMore}
            className="px-6 py-2 bg-primary_1 h-10 text-white rounded-xl hover:bg-primary_1 transition"
          >
            Load More
          </Button>
        </div>
      )}
    </div>
  );
};

export default Reviews;
