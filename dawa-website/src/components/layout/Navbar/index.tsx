'use client';

import React, { useState, useRef, useEffect, MouseEvent } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';
import { FiGrid } from 'react-icons/fi';
import { Menu, ChevronLeft, User } from 'lucide-react';
import { useDispatch } from '@redux-store/hooks';

import { useAuth } from '@core/hooks/use-auth';
import { useProfile } from '@/contexts/profile-context';
import { openAuthDialog } from '@redux-store/slices/authDialog/authDialogSlice';

import Logo2 from '@public/assets/svgs/DAWA_VARIATION_06.svg';
import Logo3 from '@public/assets/svgs/DAWA VARIATION-01.svg';
import { UserNav } from './user-nav';
import { UserNavSkeleton } from './UserNavSkeleton';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Button from '../../shared/Button';
import { Input } from '@/components/ui/input';
import Sidebar from '@views/pages/category/Sidebar';
import MobileSheetContent from './MobileSheetContent';
import MainConfigs from '@configs/mainConfigs';
import mainConfig from '@configs/mainConfigs';
import { ChatProvider } from '@/views/pages/messages/ChatContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface NavBarProps {
  closeOnSelect?: boolean;
}

const DEFAULT_AVATAR = '/assets/default-avatar.png';

const NavBar: React.FC<NavBarProps> = ({ closeOnSelect = true }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const pathname = usePathname();
  const isHomePage = pathname === '/' || pathname === '/home';

  const [isSticky, setIsSticky] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { user, loading, logout } = useAuth();
  const { userProfile } = useProfile();

  const normalizedUserProfile = userProfile
    ? {
        first_name: userProfile.user.first_name,
        last_name: userProfile.user.last_name,
        email: userProfile.user.email,
        user_profile_picture:
          (userProfile as any).user_profile_picture || DEFAULT_AVATAR,
      }
    : null;

  const normalizedUserFromAuth = user
    ? {
        first_name: user.name.split(' ')[0],
        last_name: user.name.split(' ')[1],
        email: user.email,
        user_profile_picture: user.image,
      }
    : null;

  // For mobile sheet, close after item selection.
  const handleSheetItemClick = () => {
    if (closeOnSelect) {
      setIsSheetOpen(false);
    }
  };

  // For desktop dropdown, close the categories dropdown.
  const handleDesktopCategorySelect = () => {
    setShowDropdown(false);
  };

  const handleSellClick = () => {
    if (!user) {
      dispatch(openAuthDialog());
    } else {
      router.push('/post-ad');
    }
  };

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      const mouseEvent = event as unknown as MouseEvent;
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(mouseEvent.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  const renderDesktopNav = () => (
    <div className="bg-white hidden sm:block">
      <div
        className={`${mainConfig.maxWidthClass} flex items-center justify-between ${
          isSticky ? 'py-2' : 'py-4'
        } transition-all duration-300 ease-in-out`}
      >
        <div className="lg:hidden">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button
                icon={Menu}
                className="rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 h-10 w-10"
              />
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
              <MobileSheetContent onClose={() => setIsSheetOpen(false)} />
            </SheetContent>
          </Sheet>
        </div>

        <Link href={MainConfigs.homePageUrl} className="flex-shrink-0">
          <Logo2
            className={`w-auto transition-all duration-300 lg:-ml-8 ease-in-out ${
              isSticky ? 'h-24 -my-4' : 'h-28 -my-9'
            }`}
          />
        </Link>

        {/* Categories dropdown for Desktop */}
        <div className="hidden lg:flex items-center gap-6">
          {pathname !== '/' && pathname !== '/cat' && pathname !== '/home' && (
            <div className="relative" ref={dropdownRef}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  icon={FiGrid}
                  className="flex items-center gap-2 text-gray-700 bg-transparent shadow-none hover:text-primary_1 rounded-xl"
                  onClick={() => setShowDropdown((prev) => !prev)}
                >
                  <span>Categories</span>
                </Button>
              </motion.div>
              <AnimatePresence>
                {showDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="absolute left-0 top-full mt-2 w-auto z-[9999]"
                  >
                    <Sidebar onSelect={handleDesktopCategorySelect} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Search Bar */}
        <div className="hidden lg:flex items-center flex-grow mx-8">
          <div className="relative w-full max-w-2xl">
            <Input
              type="text"
              placeholder="Search products..."
              className="w-full h-12 pl-5 pr-12 bg-gray-100 rounded-lg border-0 focus-visible:ring-2 focus-visible:ring-primary_1 transition-all duration-300"
            />
            <Button
              icon={FaSearch}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary_1 text-white hover:bg-primary_1/90 rounded-lg h-8 w-8 transition-all duration-300"
            />
          </div>
        </div>

        {/* User Navigation & Sell Button */}
        <div className="flex items-center gap-4">
          {loading ? (
            <UserNavSkeleton />
          ) : user ? (
            <>
              <UserNav
                user={normalizedUserProfile || normalizedUserFromAuth}
                onLogout={logout}
              />
              <Button
                className="text-white px-6 py-2 bg-gray-700 font-semibold h-10 text-sm transition-all duration-300"
                onClick={handleSellClick}
              >
                Sell
              </Button>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center">
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-primary_1 font-medium transition-colors duration-300"
                >
                  Log in
                </Link>
                <span className="mx-2 text-gray-400">|</span>
                <Link
                  href="/register"
                  className="text-primary_1 font-semibold hover:text-primary_1/80 transition-colors duration-300"
                >
                  Sign up
                </Link>
              </div>
              <Button
                className="text-white px-6 py-2 bg-gray-700 font-semibold h-10 text-sm transition-all duration-300 hover:bg-gray-800"
                onClick={handleSellClick}
              >
                Sell
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderMobileNav = () => {
    if (isHomePage) {
      return (
        <div className="lg:hidden rounded-b-xl bg-primary_1 shadow-sm">
          <div className="container mx-auto px-4 py-3 border-b">
            <div className="flex items-center justify-between">
              <Link href={MainConfigs.homePageUrl} className="flex-shrink-0">
                <Logo3 className="h-20 -m-5 w-auto" />
              </Link>
              {user ? (
                <Link href="/account">
                  <Avatar className="h-8 w-8 ring-2 ring-white/50">
                    <AvatarImage
                      src={
                        normalizedUserProfile?.user_profile_picture ||
                        normalizedUserFromAuth?.user_profile_picture
                      }
                      alt={`${
                        normalizedUserProfile?.first_name ||
                        normalizedUserFromAuth?.first_name
                      } ${
                        normalizedUserProfile?.last_name ||
                        normalizedUserFromAuth?.last_name
                      }`}
                    />
                    <AvatarFallback className="bg-white/10 text-white">
                      {(
                        normalizedUserProfile?.first_name ||
                        normalizedUserFromAuth?.first_name
                      )?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </Link>
              ) : (
                <Button
                  className="h-8 w-8 p-0 rounded-full bg-white/10 hover:bg-white/20"
                  onClick={() => dispatch(openAuthDialog())}
                >
                  <span className="sr-only">Login</span>
                  <User className="h-5 w-5 text-white" />
                </Button>
              )}
            </div>
          </div>
          <div className="px-4 py-6">
            <div className="container mx-auto">
              <h2 className="text-white text-center mb-4 text-lg font-medium">
                What are you looking for?
              </h2>
              <div className="max-w-xl mx-auto relative">
                <Input
                  type="text"
                  placeholder="I am looking for..."
                  className="w-full h-12 pl-4 pr-12 bg-white rounded-lg border-0 focus-visible:ring-0 text-base placeholder:text-gray-400 shadow-lg"
                />
                <Button
                  icon={FaSearch}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white bg-gray-700 h-8 w-8 p-0"
                />
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="lg:hidden bg-white">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between">
          <ChevronLeft
            className="w-8 h-8 text-primary_1 mr-3 cursor-pointer"
            onClick={() => router.back()}
          />
          <div className="relative w-full">
            <Input
              type="text"
              placeholder="Search products..."
              className="w-full h-12 pl-5 pr-12 bg-gray-100 rounded-lg border-0 focus-visible:ring-2 focus-visible:ring-primary_1 transition-all duration-300"
            />
            <Button
              icon={FaSearch}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary_1 text-white hover:bg-primary_1/90 rounded-lg h-8 w-8 transition-all duration-300"
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <ChatProvider>
      <div className="relative z-50">
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, type: 'tween', ease: 'anticipate' }}
          className="mb-8"
        >
          {renderDesktopNav()}
          {renderMobileNav()}
        </motion.nav>
      </div>
    </ChatProvider>
  );
};

export default NavBar;
