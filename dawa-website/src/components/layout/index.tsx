import React, { ReactNode } from 'react';

import ScrollToTopButton from '../shared/ScrollToTopButton';
import Footer from './Footer';
import NavBar from './Navbar';
import Newsletter from './NewsLetter';
import { BottomNav } from './Navbar/BottomNav';

interface LayoutProps {
  children: ReactNode;
  newsletterProps?: {
    container?: boolean;
    hide?: boolean;
  };
}

const Layout: React.FC<LayoutProps> = ({ children, newsletterProps }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation Bar */}
      <NavBar />

      {/* Main Content */}
      <main className="flex-grow">{children}</main>

      {/* Newsletter Section */}
      {newsletterProps && <Newsletter {...newsletterProps} />}

      {/* Scroll to Top Button */}
      <ScrollToTopButton />

      {/* Bottom Navigation Bar */}
      <BottomNav />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
