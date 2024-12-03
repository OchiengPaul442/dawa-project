import '@/styles/globals.css';

import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { Providers } from '@/lib/providers';
import { AuthDialog } from '@/components/dialogs/auth-dialog';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: 'Dawa Online Store',
  description: 'Dawa is an online store for all your daily needs.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <Providers>
          {children}

          <AuthDialog />
        </Providers>
      </body>
    </html>
  );
}
