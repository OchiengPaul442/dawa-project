'use client';
import Link from 'next/link';
import {
  Settings,
  Users,
  MessageSquare,
  HelpCircle,
  FileText,
  LogOut,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';

const menuItems = [
  {
    href: '/account/adverts',
    icon: FileText,
    label: 'My Adverts',
  },
  {
    href: '/account/followers',
    icon: Users,
    label: 'Followers',
  },
  {
    href: '/account/feedback',
    icon: MessageSquare,
    label: 'Feedback',
  },
  {
    href: '/account/settings',
    icon: Settings,
    label: 'Settings',
  },
  {
    href: '/faqs',
    icon: HelpCircle,
    label: 'FAQ',
  },
];

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <div className="md:bg-white border-t border-gray-200">
      <div>
        <div className="flex">
          {/* Sidebar */}
          <div className="hidden lg:block w-[280px] border-r min-h-[calc(100vh-4rem)] p-6 space-y-6">
            <div className="flex flex-col items-center space-y-3">
              <Avatar className="w-24 h-24">
                <AvatarImage src={user?.image} alt={user?.name} />
                <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h2 className="text-xl font-bold">{user?.name}</h2>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
            </div>
            <nav className="space-y-1">
              {menuItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant="ghost"
                    className={cn(
                      'w-full justify-start font-normal',
                      pathname === item.href && 'bg-gray-100/80 font-medium',
                    )}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </Button>
                </Link>
              ))}
            </nav>
            <div className="pt-4 border-t">
              <Button
                onClick={logout}
                variant="ghost"
                className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 font-normal"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <main className="flex-1 py-4 md:p-8 lg:p-16 min-h-[calc(100vh-4rem)]">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
