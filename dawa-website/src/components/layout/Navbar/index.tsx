'use client';

import React, { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaSearch } from 'react-icons/fa';
import { FiGrid } from 'react-icons/fi';
import { HiOutlineMenu } from 'react-icons/hi';
import Link from 'next/link';
import Logo from '@public/assets/svgs/DAWA_VARIATION_04.svg';
import Sidebar from '@/components/category/Sidebar';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import Button from '../../common/Button';

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
    setIsSheetOpen(false);
  };

  const navLinks = [
    { href: '/cat', label: 'All Categories' },
    { href: '/cat/vehicles', label: 'Vehicles' },
    { href: '/cat/property', label: 'Property' },
    {
      href: `/cat/${encodeURIComponent('phones & Tablets')}`,
      label: 'Phones & Tablets',
    },
    {
      href: `/cat/${encodeURIComponent('electronics')}`,
      label: 'Electronics',
    },
    {
      href: `/cat/${encodeURIComponent('health & beauty')}`,
      label: 'Health & Beauty',
    },
    {
      href: `/cat/${encodeURIComponent('fashion')}`,
      label: 'Fashion',
    },
    {
      href: `/cat/${encodeURIComponent('sports, Arts & Outdoors')}`,
      label: 'Sports, Arts & Outdoors',
    },
    {
      href: `/cat/${encodeURIComponent('hot deals')}`,
      label: 'HOT DEALS',
    },
  ];

  return (
    <nav className="bg-white relative z-50">
      {/* Section 1: Top Nav */}
      <div
        className={`${
          isSticky ? 'fixed top-0 left-0 right-0 z-50 bg-white shadow' : ''
        } transition-all duration-300 ease-in-out`}
      >
        <div
          className={`container mx-auto flex items-center justify-between ${
            isSticky ? 'py-1 lg:py-0 h-16' : 'py-2 h-20'
          } px-4 transition-all duration-300 ease-in-out gap-8`}
        >
          {/* Menu Trigger for Mobile */}
          <div className="flex items-center gap-4 lg:hidden">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <button>
                  <HiOutlineMenu className="text-2xl text-gray-700" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <SheetHeader>
                  <SheetTitle>
                    <Link href="/" className="flex items-center">
                      <Logo className={`w-auto h-24 -ml-8`} />
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4 mt-4">
                  {navLinks.map(({ href, label }) => (
                    <Link
                      key={href}
                      href={href}
                      className={`flex items-center ${
                        label === 'HOT DEALS'
                          ? 'font-extrabold text-primary_1'
                          : 'font-semibold text-[#4D4D4D]'
                      }`}
                      onClick={handleSheetItemClick}
                    >
                      {label}
                    </Link>
                  ))}
                  <div className="relative mt-4 flex justify-between items-center">
                    <button
                      onClick={() => {
                        handleSheetItemClick;
                        router.push('/wishlist');
                      }}
                      className="flex items-center"
                    >
                      <FaHeart className="text-xl text-gray-700 cursor-pointer" />
                      <span className="ml-2">Favorites</span>
                    </button>
                    <span className="bg-primary_1 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                      12
                    </span>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Logo for Larger Screens */}
          <div className="hidden lg:flex items-center">
            <Link href="/">
              <Logo
                className={`w-auto transition-all duration-300 ease-in-out ${
                  isSticky ? 'h-16' : 'h-24'
                } -ml-8`}
              />
            </Link>
          </div>

          {/* All Categories Dropdown Trigger (conditionally rendered) */}
          {pathname !== '/cat' && (
            <div className="relative" ref={dropdownRef}>
              <button
                className="hidden lg:flex items-center gap-2 text-gray-700 hover:text-primary_1"
                onClick={() => setShowDropdown((prev) => !prev)}
              >
                <FiGrid className="text-2xl" />
              </button>
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

          {/* Search Bar */}
          <div className="flex-1 flex items-center">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search here..."
                className="w-full h-12 py-2 pl-5 pr-12 text-sm bg-gray-100 rounded-md focus:outline-none"
              />
              <button className="absolute right-4 top-1/2 transform -translate-y-1/2 text-primary_1">
                <FaSearch className="text-lg" />
              </button>
            </div>
          </div>

          {/* Icons and Buttons */}
          <div className="flex items-center gap-8">
            {/* Favorites Icon with Badge */}
            <Link
              href="/wishlist"
              className="relative hidden lg:flex items-center"
            >
              <FaHeart className="text-xl text-gray-700 cursor-pointer" />
              <span className="absolute -top-1.5 -right-2 bg-primary_1 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                12
              </span>
            </Link>

            {/* Login and Sign Up Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <Link href="/login" passHref>
                <Button className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-4 py-2 font-bold h-10 text-xs shadow-none">
                  LOGIN
                </Button>
              </Link>
              <Link href="/register" passHref>
                <Button className="bg-primary_1 hover:bg-primary_1 text-white px-4 py-2 font-bold h-10 text-xs">
                  SIGN UP
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
