'use client';

import { motion } from 'framer-motion';
import { Home, Bookmark, PlusCircle, MessageSquare, User } from 'lucide-react';
import Link from 'next/link';
import { useScrollDirection } from '@/hooks/useScrollDirection';

const navItems = [
  { icon: Home, label: 'Home', href: '/' },
  { icon: Bookmark, label: 'Favorites', href: '/favorites' },
  { icon: PlusCircle, label: 'Sell', href: '/sell' },
  { icon: MessageSquare, label: 'Messages', href: '/messages' },
  { icon: User, label: 'Profile', href: '/profile' },
];

export function BottomNav() {
  const { scrollDirection, pathname } = useScrollDirection();

  return (
    <motion.nav
      className="fixed bottom-0 left-0 right-0 z-50 sm:hidden"
      initial={{ y: 0 }}
      animate={{ y: scrollDirection === 'down' ? '100%' : 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mx-auto">
        <div className="flex justify-around items-center h-16 bg-white bg-opacity-80 backdrop-blur-md border-t border-gray-200 rounded-t-3xl shadow-lg">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className="flex flex-col items-center w-16 py-1"
              >
                <motion.div
                  className={`p-2 rounded-full ${isActive ? 'bg-orange-100' : ''}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <item.icon
                    className={`w-6 h-6 ${isActive ? 'text-orange-500' : 'text-gray-700'}`}
                  />
                </motion.div>
                <span
                  className={`text-xs mt-1 ${isActive ? 'text-orange-500 font-medium' : 'text-gray-700'}`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
}
