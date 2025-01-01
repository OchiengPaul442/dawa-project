'use client';

import React from 'react';
import {
  Settings,
  Users,
  MessageSquare,
  HelpCircle,
  FileText,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { useAuth } from '@core/hooks/use-auth';
import { motion } from 'framer-motion';

interface SidebarItem {
  className?: string;
}

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

export const MobileNav = () => {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className="lg:hidden">
        <Button variant="outline" className="lg:hidden mt-8">
          <Menu className="text-3xl" scale={1.5} />
          <span className="">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full max-w-xs p-0">
        <div className="flex flex-col min-h-screen">
          <SheetHeader className="p-6 border-b">
            <div className="flex flex-col items-center space-y-3">
              <Avatar className="w-20 h-20">
                <AvatarImage src={user?.image} alt={user?.name} />
                <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h2 className="text-lg font-semibold">{user?.name}</h2>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
            </div>
          </SheetHeader>

          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={item.href} onClick={() => setOpen(false)}>
                  <Button
                    variant="ghost"
                    className={cn(
                      'w-full justify-start font-normal h-12',
                      pathname === item.href && 'bg-gray-100/80 font-medium',
                    )}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.label}
                  </Button>
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="p-4 border-t mt-auto">
            <Button
              onClick={() => {
                logout();
                setOpen(false);
              }}
              variant="ghost"
              className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 font-normal h-12"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Log out
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

const Sidebar = ({ className }: SidebarItem) => {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <>
      <div
        className={cn(
          'hidden lg:block w-[280px] border-r min-h-[calc(100vh-4rem)] p-6 space-y-6',
          className,
        )}
      >
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
    </>
  );
};

export default Sidebar;
