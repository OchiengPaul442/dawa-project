import React, { ReactNode } from 'react';

import TopBar from '@/components/layout/TopBar';

import ScrollToTopButton from '../common/ScrollToTopButton';
import Footer from './Footer';
import NavBar from './Navbar';
import Newsletter from './NewsLetter';

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
      {/* Contact Information Banner */}
      <TopBar />

      {/* Navigation Bar */}
      <NavBar />

      {/* Main Content */}
      <main className="flex-grow">{children}</main>

      {/* Newsletter Section */}
      {newsletterProps && <Newsletter {...newsletterProps} />}

      {/* Scroll to Top Button */}
      <ScrollToTopButton />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
