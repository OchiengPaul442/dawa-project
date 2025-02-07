import Sidebar, { MobileNav } from '@/views/auth/Sidebar';
import { ProfileProvider } from '@/contexts/profile-context';
import type { ReactNode } from 'react';

export default function AuthenticatedLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar className="hidden lg:block" />
      <div className="flex flex-1 flex-col">
        <header className="bg-white shadow-sm lg:hidden">
          <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <MobileNav />
          </div>
        </header>
        <main className="flex-1 bg-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
