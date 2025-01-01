import './globals.css';

import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import Provider from '@/components/Provider';
import { AuthDialog } from '@/components/dialogs/auth-dialog';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: 'Dawa Online Store',
  description: 'Dawa is an online store for all your daily needs.',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <Provider>
          {children}

          <AuthDialog />
        </Provider>
      </body>
    </html>
  );
}
