'use client';

import type React from 'react';
import { useEffect, useState, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';
import { FiGrid } from 'react-icons/fi';
import { Menu, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import Logo from '@public/assets/svgs/DAWA_VARIATION_04.svg';
import Logo2 from '@public/assets/svgs/DAWA_VARIATION_06.svg';
import { UserNav } from './user-nav';
import { useAuth } from '@core/hooks/use-auth';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Button from '../../shared/Button';
import { Input } from '@/components/ui/input';
import Sidebar from '@views/pages/category/Sidebar';
import MobileSheetContent from './MobileSheetContent';
import { UserNavSkeleton } from './UserNavSkeleton';
import { useDispatch } from '@redux-store/hooks';
import { openAuthDialog } from '@redux-store/slices/authDialog/authDialogSlice';
import MainConfigs from '@configs/mainConfigs';
import mainConfig from '@configs/mainConfigs';
import { ChatProvider } from '@/views/pages/messages/ChatContext';
import { useProfile } from '@/contexts/profile-context';

interface NavBarProps {
  closeOnSelect?: boolean;
}

const DEFAULT_AVATAR = '/assets/default-avatar.png';

const NavBar: React.FC<NavBarProps> = ({ closeOnSelect = true }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isSticky, setIsSticky] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { userProfile, isLoading } = useProfile();

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showDropdown]);

  const handleSheetItemClick = () => {
    if (closeOnSelect) {
      setIsSheetOpen(false);
    }
  };

  const handleSellClick = () => {
    if (!user) {
      dispatch(openAuthDialog());
    } else {
      router.push('/post-ad');
    }
  };

  const normalizedUserProfile = userProfile && {
    first_name: userProfile.user.first_name,
    last_name: userProfile.user.last_name,
    email: userProfile.user.email,
    user_profile_picture:
      (userProfile as any).user_profile_picture || DEFAULT_AVATAR,
  };

  return (
    <ChatProvider>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
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

            <Link
              href={MainConfigs.homePageUrl}
              className="flex-shrink-0 lg:hidden"
            >
              <Logo2
                className={`w-auto transition-all duration-300 lg:-ml-8 ease-in-out ${
                  isSticky ? 'h-24 -my-4' : 'h-28 -my-9'
                }`}
              />
            </Link>

            <div className="hidden lg:flex items-center gap-6">
              <Link href={MainConfigs.homePageUrl} className="flex-shrink-0">
                <Logo
                  className={`w-auto transition-all duration-300 lg:-ml-8 ease-in-out ${
                    isSticky ? 'h-20 -my-4' : 'h-24 -my-8'
                  }`}
                />
              </Link>

              {pathname !== '/' &&
                pathname !== '/cat' &&
                pathname !== '/home' && (
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
                          className="absolute left-0 top-full mt-2 w-auto z-50"
                        >
                          <Sidebar onSelect={handleSheetItemClick} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
            </div>

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

            <div className="flex items-center gap-4">
              {isLoading || !normalizedUserProfile ? (
                <UserNavSkeleton />
              ) : user ? (
                <>
                  <UserNav user={normalizedUserProfile} onLogout={logout} />
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      className="text-white px-6 py-2 bg-gray-700 font-semibold h-10 text-sm transition-all duration-300"
                      onClick={handleSellClick}
                    >
                      Sell
                    </Button>
                  </motion.div>
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
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      className="text-white px-6 py-2 bg-gray-700 font-semibold h-10 text-sm rounded-full transition-all duration-300 hover:bg-gray-800"
                      onClick={handleSellClick}
                    >
                      Sell
                    </Button>
                  </motion.div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={`lg:hidden bg-white`}>
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
      </motion.nav>
    </ChatProvider>
  );
};

export default NavBar;
