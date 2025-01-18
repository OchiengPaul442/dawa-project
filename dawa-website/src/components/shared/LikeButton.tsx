'use client';

import React from 'react';
import { Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { openAuthDialog } from '@redux-store/slices/authDialog/authDialogSlice';
import { useDispatch } from '@redux-store/hooks';
import { useAuth } from '@core/hooks/use-auth';
import { useWishlistActions } from '@core/hooks/useWishlistActions';

interface LikeButtonProps {
  productId: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'minimal' | 'floating';
}

export const LikeButton: React.FC<LikeButtonProps> = ({
  productId,
  className = '',
  size = 'md',
  variant = 'default',
}) => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { isInWishlist, toggle } = useWishlistActions();
  const [isHovered, setIsHovered] = React.useState(false);
  const [hasClicked, setHasClicked] = React.useState(false);

  const isLiked = isInWishlist(productId);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setHasClicked(true);

    // Reset the click animation after 1s
    setTimeout(() => setHasClicked(false), 1000);

    if (!user) {
      dispatch(openAuthDialog());
      return;
    }
    toggle(productId);
  };

  const sizeClasses = {
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-3',
  };

  const heartSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const variants = {
    default: 'bg-white shadow-lg hover:shadow-xl',
    minimal: 'bg-transparent hover:bg-black/5',
    floating: 'bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl',
  };

  return (
    <motion.button
      onClick={handleClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={cn(
        'relative rounded-full transition-all duration-300',
        variants[variant],
        sizeClasses[size],
        className,
        isLiked && 'bg-red-50',
      )}
    >
      <AnimatePresence>
        {hasClicked && isLiked && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.2, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute inset-0 rounded-full bg-red-500/20"
          />
        )}
      </AnimatePresence>

      <motion.div
        animate={{
          scale: isLiked ? (isHovered ? 0.9 : 1) : 1,
          rotate: hasClicked ? [0, -20, 20, 0] : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 15,
        }}
      >
        <Heart
          className={cn(
            heartSizes[size],
            'transition-colors duration-300',
            isLiked
              ? 'fill-red-500 stroke-red-500'
              : 'stroke-gray-600 group-hover:stroke-gray-900',
          )}
        />
      </motion.div>

      {/* Like count tooltip */}
      <AnimatePresence>
        {isHovered && variant !== 'minimal' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-gray-900 px-2 py-1 text-xs text-white"
          >
            {isLiked ? 'Remove from wishlist' : 'Add to wishlist'}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};
