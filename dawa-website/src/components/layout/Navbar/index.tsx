'use client';

import React, { useEffect, useState, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';
import { FiGrid } from 'react-icons/fi';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import Logo from '@public/assets/svgs/DAWA_VARIATION_04.svg';
import { CategoriesNav } from './categories-nav';
import { UserNav } from './user-nav';
import { useAuth } from '@/hooks/use-auth';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Button from '../../common/Button';
import { Input } from '@/components/ui/input';
import Sidebar from '@/components/category/Sidebar';
import MobileSheetContent from './MobileSheetContent';
import { UserNavSkeleton } from './UserNavSkeleton';

interface NavBarProps {
  closeOnSelect?: boolean;
}

const NavBar: React.FC<NavBarProps> = ({ closeOnSelect = true }) => {
  const router = useRouter();
  const [isSticky, setIsSticky] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { user, loading, logout, counters } = useAuth();

  // Track scroll position to set sticky state
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
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
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showDropdown]);

  // Close the sheet when an item inside it is clicked
  const handleSheetItemClick = () => {
    if (closeOnSelect) {
      setIsSheetOpen(false);
    }
  };

  return (
    <nav className="bg-white relative z-50">
      {/* Section 1: Top Nav */}
      <div
        className={`${
          isSticky ? 'fixed top-0 left-0 right-0 z-50 bg-white shadow-md' : ''
        } transition-all duration-300 ease-in-out w-full`}
      >
        <div
          className={`container mx-auto flex flex-col lg:flex-row ${
            isSticky ? 'py-2' : 'py-4'
          } px-4 transition-all duration-300 ease-in-out`}
        >
          {/* Main Navigation Row */}
          <div className="flex items-center justify-between w-full lg:w-auto lg:flex-grow">
            {/* Menu Trigger for Mobile */}
            <div className="flex items-center gap-4 lg:hidden">
              <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetTrigger asChild className="w-12 h-12">
                  <Button
                    icon={Menu}
                    className="rounded-full bg-primary_1 h-8 w-8"
                  ></Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <MobileSheetContent onClose={() => setIsSheetOpen(false)} />
                </SheetContent>
              </Sheet>
            </div>

            {/* Logo */}
            <div className="flex items-center -mr-6  justify-end md:justify-center flex-1 lg:justify-start lg:-ml-6 lg:flex-none">
              <Link href="/">
                <Logo
                  className={`w-auto transition-all duration-300 ease-in-out ${
                    isSticky ? 'h-16' : 'h-20'
                  }`}
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            {pathname !== '/cat' && (
              <div className="relative hidden lg:block" ref={dropdownRef}>
                <Button
                  icon={FiGrid}
                  className="flex items-center gap-2 text-gray-700 bg-transparent shadow-none hover:text-primary_1 rounded-xl"
                  onClick={() => setShowDropdown((prev) => !prev)}
                >
                  <span>All Categories</span>
                </Button>
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

            {/* Search Bar (for large screens) */}
            <div className="hidden lg:flex items-center flex-grow mx-4">
              <div className="relative w-full">
                <Input
                  type="text"
                  placeholder="Search here..."
                  className="w-full h-12 pl-5 pr-12 bg-gray-100 rounded-lg border-0 focus-visible:ring-primary_1"
                />
                <Button
                  icon={FaSearch}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary_1 shadow rounded-xl h-8 w-8"
                ></Button>
              </div>
            </div>

            {/* Auth Section */}
            <div className="hidden md:flex items-center gap-4">
              {loading ? (
                <UserNavSkeleton />
              ) : user ? (
                <UserNav user={user} onLogout={logout} counters={counters} />
              ) : (
                <div className="flex items-center gap-3">
                  <Link href="/login" passHref>
                    <Button className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-4 py-2 font-bold h-10 text-xs shadow-none">
                      LOGIN
                    </Button>
                  </Link>
                  <Link href="/register" passHref>
                    <Button className="bg-primary_1 text-white px-4 py-2 font-bold h-10 text-xs">
                      SIGN UP
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Search Bar Row (for small screens) */}
          <div className="flex items-center w-full mt-4 lg:hidden">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Search here..."
                className="w-full h-12 pl-5 pr-12 bg-gray-100 rounded-lg border-0 focus-visible:ring-primary_1"
              />
              <Button
                icon={FaSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary_1 shadow rounded-xl h-8 w-8"
              ></Button>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Categories Nav */}
      <div className="border-b hidden lg:block">
        <div className="container mx-auto px-4">
          <CategoriesNav
            className="flex items-center gap-8 h-12"
            itemClassName="text-sm hover:text-primary_1"
          />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
