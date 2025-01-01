import Sidebar, { MobileNav } from '@/components/Main/account/Sidebar';

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="md:bg-white border-t border-gray-200">
      <div>
        <div className="flex flex-col md:flex-row">
          {/* Sidebar */}
          <Sidebar />

          {/* Mobile Navigation */}
          <MobileNav />

          {/* Main Content */}
          <main className="flex-1 py-4 md:p-8 lg:p-16 min-h-[calc(100vh-4rem)]">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
