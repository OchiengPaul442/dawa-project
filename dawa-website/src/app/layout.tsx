import './globals.css';
import { Suspense } from 'react';
import { Poppins } from 'next/font/google';
import Provider from '@/components/Provider';
import Loader from '@/components/features/loader/Loading';
import { AuthDialog } from '@/components/dialogs/auth-dialog';
import categoriesData from '@public/categories.json';
import { WishlistProvider } from '@/contexts/WishlistContext';

import { ProfileProvider } from '@/contexts/profile-context';
import { CompleteProfileModal } from '@/components/shared/CompleteProfileModal';
import { Toaster } from 'sonner';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Cast the static JSON data to an array of Category
  const preloadedState = {
    categories: {
      categories: categoriesData as any,
      status: 'succeeded',
      error: null,
    },
  };

  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <Suspense fallback={<Loader />}>
          <Provider preloadedState={preloadedState as any}>
            <WishlistProvider>
              <ProfileProvider>
                <main className="min-h-screen flex flex-col">{children}</main>
                <CompleteProfileModal />
              </ProfileProvider>
            </WishlistProvider>
            <AuthDialog />
          </Provider>
        </Suspense>
        <Toaster position="top-right" expand={true} richColors />
      </body>
    </html>
  );
}
