'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Settings, HelpCircle, FileText, LogOut, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useAuth } from '@core/hooks/use-auth';
import { useProfile } from '@/contexts/profile-context';
import { Skeleton } from '@/components/ui/skeleton';

const menuItems = [
  { href: '/account', icon: FileText, label: 'My Adverts' },
  { href: '/account/settings', icon: Settings, label: 'Settings' },
  { href: '/faqs', icon: HelpCircle, label: 'FAQ' },
];

interface NavItemProps {
  item: {
    href: string;
    icon: React.ElementType;
    label: string;
  };
  pathname: string;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ item, pathname, onClick }) => (
  <Link href={item.href} onClick={onClick}>
    <Button
      variant="ghost"
      className={`w-full justify-start ${
        pathname === item.href ? 'bg-gray-100 text-primary' : ''
      }`}
    >
      <item.icon className="mr-2 h-4 w-4" />
      {item.label}
    </Button>
  </Link>
);

interface LogoutButtonProps {
  onClick: () => void;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ onClick }) => (
  <Button
    onClick={onClick}
    variant="ghost"
    className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
  >
    <LogOut className="mr-2 h-4 w-4" />
    Log out
  </Button>
);

interface UserInfoProps {
  userProfile: any;
  isLoading: boolean;
}

const UserInfo: React.FC<UserInfoProps> = ({ userProfile, isLoading }) => (
  <div className="flex flex-col items-center space-y-3">
    {isLoading ? (
      <Skeleton className="w-20 h-20 rounded-full" />
    ) : (
      <Avatar className="w-20 h-20">
        <AvatarImage
          src={userProfile?.user_profile_picture}
          alt={`${userProfile?.user.first_name} ${userProfile?.user.last_name}`}
        />
        <AvatarFallback>{userProfile?.user.first_name?.[0]}</AvatarFallback>
      </Avatar>
    )}
    <div className="text-center">
      {isLoading ? (
        <>
          <Skeleton className="h-6 w-32 mb-1" />
          <Skeleton className="h-4 w-24" />
        </>
      ) : (
        <>
          <h2 className="text-lg font-semibold">
            {`${userProfile?.user.first_name} ${userProfile?.user.last_name}`}
          </h2>
          <p className="text-xs text-muted-foreground">
            {userProfile?.user.email}
          </p>
        </>
      )}
    </div>
  </div>
);

export const MobileNav: React.FC = () => {
  const pathname = usePathname();
  const { logout } = useAuth();
  const { userProfile, isLoading } = useProfile();
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <SheetHeader className="border-b pb-4 mb-4">
          {/* Add a title for accessibility */}
          <SheetTitle className="sr-only">User Menu</SheetTitle>
          <UserInfo userProfile={userProfile} isLoading={isLoading} />
        </SheetHeader>
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <NavItem
              key={item.href}
              item={item}
              pathname={pathname}
              onClick={() => setOpen(false)}
            />
          ))}
        </nav>
        <div className="mt-auto pt-4 border-t">
          <LogoutButton
            onClick={() => {
              logout();
              setOpen(false);
            }}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};

interface SidebarProps {
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const pathname = usePathname();
  const { logout } = useAuth();
  const { userProfile, isLoading } = useProfile();

  return (
    <div className={`w-64 bg-white shadow-lg p-6 space-y-6 ${className}`}>
      <UserInfo userProfile={userProfile} isLoading={isLoading} />
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <NavItem key={item.href} item={item} pathname={pathname} />
        ))}
      </nav>
      <div className="pt-4 border-t">
        <LogoutButton onClick={logout} />
      </div>
    </div>
  );
};

export default Sidebar;
