'use client';
import React from 'react';
import { FaHeart } from 'react-icons/fa';
import { useAuth } from '@core/hooks/use-auth';
import { useDispatch } from '@redux-store/hooks';
import { openAuthDialog } from '@redux-store/slices/authDialog/authDialogSlice';

interface LikeButtonProps {
  isLiked: boolean;
  onLike: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

export const LikeButton: React.FC<LikeButtonProps> = ({
  isLiked,
  onLike,
  className = '',
}) => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        if (!user) {
          dispatch(openAuthDialog());
          return;
        }
        onLike(e);
      }}
      className={`p-2 bg-white rounded-full ${className}`}
    >
      <FaHeart
        className={`text-xl ${isLiked ? 'text-red-500' : 'text-gray-400'}`}
      />
    </button>
  );
};
