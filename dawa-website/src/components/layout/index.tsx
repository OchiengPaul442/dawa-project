import React, { ReactNode } from 'react';

import ScrollToTopButton from '../shared/ScrollToTopButton';
import Footer from './Footer';
import NavBar from './Navbar';
import { ProfileProvider } from '@/contexts/profile-context';
import { BottomNav } from './Navbar/BottomNav';

interface LayoutProps {
  children: ReactNode;

  addFooter?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, addFooter = true }) => {
  return (
    <ProfileProvider>
      <div className="flex flex-col min-h-screen">
        {/* Navigation Bar */}
        <NavBar />

        {/* Main Content */}
        <main className="flex-grow mb-20">{children}</main>

        {/* Scroll to Top Button */}
        <ScrollToTopButton />

        {/* Bottom Navigation Bar */}
        <BottomNav />

        {/* Footer Section */}
        {addFooter && <Footer />}
      </div>
    </ProfileProvider>
  );
};

export default Layout;
