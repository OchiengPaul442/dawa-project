'use client';

import type React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { User, X, Search } from 'lucide-react';
import { useDispatch } from '@redux-store/hooks';
import { openAuthDialog } from '@redux-store/slices/authDialog/authDialogSlice';
import Logo2 from '@public/assets/svgs/DAWA_VARIATION_06.svg';
import Button from '@/components/shared/Button';
import { Input } from '@/components/ui/input';
import MainConfigs from '@/configs/mainConfigs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import BackButton from '@/components/shared/BackButton';

const MobileNav: React.FC<any> = ({
  isHomePage,
  user,
  normalizedUserProfile,
  normalizedUserFromAuth,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchTerm = (
      e.currentTarget.elements.namedItem('search') as HTMLInputElement
    ).value;
    // Implement your search logic here
    console.log('Searching for:', searchTerm);
    setIsSearchOpen(false);
  };

  return (
    <motion.div
      className="lg:hidden bg-white shadow-md"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {!isHomePage && <BackButton />}
          <Link href={MainConfigs.homePageUrl} className="flex-shrink-0">
            <Logo2 className="h-20 -m-6 w-auto" />
          </Link>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-primary_1"
              onClick={toggleSearch}
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
            {user ? (
              <Link href="/account">
                <Avatar className="h-8 w-8 ring-2 ring-primary_1/50">
                  <AvatarImage
                    src={
                      normalizedUserProfile?.user_profile_picture ||
                      normalizedUserFromAuth?.user_profile_picture
                    }
                    alt={`${normalizedUserProfile?.first_name || normalizedUserFromAuth?.first_name} ${
                      normalizedUserProfile?.last_name ||
                      normalizedUserFromAuth?.last_name
                    }`}
                  />
                  <AvatarFallback className="bg-primary_1 text-white">
                    {(
                      normalizedUserProfile?.first_name ||
                      normalizedUserFromAuth?.first_name
                    )?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </Link>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                className="text-primary_1"
                onClick={() => dispatch(openAuthDialog())}
              >
                <User className="h-5 w-5" />
                <span className="sr-only">Login</span>
              </Button>
            )}
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="border-t border-gray-200"
          >
            <form
              onSubmit={handleSearch}
              className="container mx-auto px-4 py-3"
            >
              <div className="relative">
                <Input
                  type="search"
                  name="search"
                  placeholder="Search products..."
                  className="w-full h-10 pl-10 pr-4 border-primary_1 focus:ring-2 focus:ring-primary_1 focus:border-transparent"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                  onClick={toggleSearch}
                >
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close search</span>
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default MobileNav;
