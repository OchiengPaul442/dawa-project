'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { useDispatch } from '@/redux-store/hooks';
import { openAuthDialog } from '@/redux-store/slices/authDialog/authDialogSlice';
import Logo2 from '@public/assets/svgs/DAWA_VARIATION_06.svg';
import Button from '@/components/shared/Button';
import { Input } from '@/components/ui/input';
import MainConfigs from '@/configs/mainConfigs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import BackButton from '@/components/shared/BackButton';

// Import dropdown components (adjust import paths as needed)
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import {
  MessageSquare,
  Settings,
  User,
  ShoppingCart,
  LogOut,
} from 'lucide-react';

import { setSelectedUserId } from '@/redux-store/slices/myshop/selectedUserSlice';
import { useAuth } from '@/@core/hooks/use-auth';

const MobileNav: React.FC<any> = ({
  isHomePage,
  user,
  normalizedUserProfile,
  normalizedUserFromAuth,
  onLogout,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSearch = () => setIsSearchOpen((prev) => !prev);

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
      className="md:hidden bg-white shadow-md"
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
              // Instead of linking directly, we use a dropdown menu for the user avatar.
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="ghost"
                      className="relative rounded-full h-10 w-10 p-1 overflow-hidden"
                    >
                      <Avatar className="h-full w-full">
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
                    </Button>
                  </motion.div>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-56 mt-2"
                  align="end"
                  forceMount
                >
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {`${normalizedUserProfile?.first_name || normalizedUserFromAuth?.first_name} ${
                          normalizedUserProfile?.last_name ||
                          normalizedUserFromAuth?.last_name
                        }`}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                      <Link href="/account">
                        <div className="flex items-center cursor-pointer">
                          <User className="mr-2 h-4 w-4" />
                          <span>Account</span>
                        </div>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/my-shop">
                        <button
                          type="button"
                          className="flex items-center cursor-pointer"
                          onClick={() => {
                            // Store the selected seller ID in localStorage if needed
                            localStorage.setItem(
                              'selectedShopId',
                              String(user.id),
                            );
                            dispatch(setSelectedUserId(user.id as any));
                          }}
                        >
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          <span>My Shop</span>
                        </button>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/account/settings">
                        <div className="flex items-center cursor-pointer">
                          <Settings className="mr-2 h-4 w-4" />
                          <span>Settings</span>
                        </div>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={onLogout}
                    className="text-red-600 flex items-center"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
