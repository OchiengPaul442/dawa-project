'use client';

import type React from 'react';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useDispatch } from '@redux-store/hooks';
import { useAuth } from '@core/hooks/use-auth';
import { useProfile } from '@/contexts/profile-context';
import { openAuthDialog } from '@redux-store/slices/authDialog/authDialogSlice';
import { ChatProvider } from '@/views/pages/messages/ChatContext';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';

export const DEFAULT_AVATAR = '/assets/default-avatar.png';

export const normalizeUserProfile = (userProfile: any): any | null => {
  if (!userProfile) return null;
  return {
    first_name: userProfile.user.first_name,
    last_name: userProfile.user.last_name,
    email: userProfile.user.email,
    user_profile_picture: userProfile.user_profile_picture || DEFAULT_AVATAR,
  };
};

export const normalizeUserFromAuth = (user: any): any | null => {
  if (!user) return null;
  return {
    first_name: user.name.split(' ')[0],
    last_name: user.name.split(' ')[1],
    email: user.email,
    user_profile_picture: user.image,
  };
};

const NavBar: React.FC<any> = ({ closeOnSelect = true }) => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const router = useRouter(); // Added router import and declaration
  const isHomePage = pathname === '/' || pathname === '/home';

  const [isSticky, setIsSticky] = useState(false);

  const { user, loading, logout } = useAuth();
  const { userProfile } = useProfile();

  const normalizedUserProfile = normalizeUserProfile(userProfile);
  const normalizedUserFromAuth = normalizeUserFromAuth(user);

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSellClick = () => {
    if (!user) {
      dispatch(openAuthDialog());
    } else {
      router.push('/post-ad');
    }
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
          <DesktopNav
            isSticky={isSticky}
            user={normalizedUserProfile || normalizedUserFromAuth}
            loading={loading}
            logout={logout}
            handleSellClick={handleSellClick}
          />
          <MobileNav
            isHomePage={isHomePage}
            user={user}
            normalizedUserProfile={normalizedUserProfile}
            normalizedUserFromAuth={normalizedUserFromAuth}
          />
        </motion.nav>
      </div>
    </ChatProvider>
  );
};

export default NavBar;
