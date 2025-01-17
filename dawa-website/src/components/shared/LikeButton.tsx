'use client';
import React from 'react';
import { FaHeart } from 'react-icons/fa';
import { openAuthDialog } from '@redux-store/slices/authDialog/authDialogSlice';
import { useDispatch } from '@redux-store/hooks';
import { useAuth } from '@core/hooks/use-auth';
import { useWishlistActions } from '@core/hooks/useWishlistActions';

interface LikeButtonProps {
  productId: string;
  className?: string;
}

export const LikeButton: React.FC<LikeButtonProps> = ({
  productId,
  className = '',
}) => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { isInWishlist, toggle } = useWishlistActions();

  const isLiked = isInWishlist(productId);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!user) {
      dispatch(openAuthDialog());
      return;
    }
    // This calls our toggler in the custom hook
    toggle(productId);
  };

  return (
    <button
      onClick={handleClick}
      className={`p-2 bg-white rounded-full ${className}`}
    >
      <FaHeart
        className={`text-xl ${isLiked ? 'text-red-500' : 'text-gray-400'}`}
      />
    </button>
  );
};
