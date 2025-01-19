import Sidebar, { MobileNav } from '@/views/auth/Sidebar';
import { Card, CardContent } from '@/components/ui/card';
import mainConfig from '@/configs/mainConfigs';

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <Card className={`${mainConfig.maxWidthClass}`}>
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row">
            {/* Sidebar - hidden on mobile */}
            <div className="hidden md:block">
              <Sidebar />
            </div>

            {/* Mobile Navigation - visible only on mobile */}
            <div className="md:hidden">
              <MobileNav />
            </div>

            {/* Main Content */}
            <main className="flex-1 p-4 md:p-8 lg:p-16 min-h-[calc(100vh-4rem)]">
              {children}
            </main>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
