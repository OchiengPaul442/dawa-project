'use client';

import React from 'react';
import Link from 'next/link';
import { FaHeart, FaBell, FaEnvelope } from 'react-icons/fa';
import { CategoriesNav } from './categories-nav';
import { Button } from '@/components/ui/button';
import Logo from '@public/assets/svgs/DAWA_VARIATION_04.svg';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';

interface MobileSheetContentProps {
  onClose: () => void;
}

const MobileSheetContent: React.FC<MobileSheetContentProps> = ({ onClose }) => {
  const router = useRouter();
  const { user } = useAuth();

  const handleNavigation = (href: string) => {
    onClose();
    router.push(href);
  };

  return (
    <div className="flex flex-col gap-4 mt-4">
      {/* Logo */}
      <Link
        href="/"
        onClick={onClose}
        className="flex items-center justify-center"
      >
        <Logo className="w-auto h-20" />
      </Link>

      {/* All Categories Link */}
      <Button
        variant="ghost"
        onClick={() => {
          handleNavigation('/cat');
        }}
        className="flex justify-start items-center gap-2 py-2 hover:bg-gray-50 rounded-xl px-2"
      >
        <span className="text-lg">📂</span>
        <span className="ml-2">All Categories</span>
      </Button>

      {/* Categories Navigation */}
      <CategoriesNav
        className="flex flex-col gap-4"
        itemClassName="py-2 hover:bg-gray-50 rounded-xl px-2"
        isSheet={true}
      />

      {user && (
        <>
          {/* Favorites Link */}
          <div className="relative flex items-center bg-gray-100 p-2 rounded-xl">
            <button
              onClick={() => handleNavigation('/wishlist')}
              className="flex items-center gap-2 w-full"
            >
              <FaHeart className="text-xl text-gray-700" />
              <span>Favorites</span>
            </button>
            <span className="bg-primary_1 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
              12
            </span>
          </div>

          {/* Notifications Link */}
          <div className="relative flex items-center bg-gray-100 p-2 rounded-xl">
            <button
              onClick={() => handleNavigation('/notifications')}
              className="flex items-center gap-2 w-full"
            >
              <FaBell className="text-xl text-gray-700" />
              <span>Notifications</span>
            </button>
            <span className="bg-primary_1 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
              5
            </span>
          </div>

          {/* Messages Link */}
          <div className="relative flex items-center bg-gray-100 p-2 rounded-xl">
            <button
              onClick={() => handleNavigation('/messages')}
              className="flex items-center gap-2 w-full"
            >
              <FaEnvelope className="text-xl text-gray-700" />
              <span>Messages</span>
            </button>
            <span className="bg-primary_1 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
              3
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default React.memo(MobileSheetContent);
