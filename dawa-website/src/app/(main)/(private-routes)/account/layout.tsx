import Sidebar, { MobileNav } from '@/views/auth/Sidebar';
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
          <div className="py-4 md:px-8">
            <MobileNav />
          </div>
        </header>
        <main className="flex-1 bg-gray-100">
          <div className="md:px-8 py-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
