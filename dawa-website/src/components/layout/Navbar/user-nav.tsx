import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Bell,
  MessageSquare,
  Settings,
  User,
  BarChart2,
  LogOut,
  FileText,
} from 'lucide-react';
import Link from 'next/link';
import { FaHeart } from 'react-icons/fa';

interface UserNavProps {
  user: {
    name: string;
    email: string;
    image: string;
  };
  onLogout: () => void;
  counters: {
    favorites?: number;
    messages?: number;
    notifications?: number;
  };
}

// Number formatter for counters
const formatCount = (count: number) => {
  if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
  return count.toString();
};

export function UserNav({ user, onLogout, counters }: UserNavProps) {
  return (
    <div className="flex items-center gap-6">
      {/* Favorites */}
      <Link href="/wishlist" className="relative hidden lg:flex items-center">
        <Button variant="ghost" size="icon" className="rounded-xl h-6 w-6">
          <FaHeart className="h-5 w-5 text-gray-700" />
          {counters.favorites ? (
            <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-primary_1 text-white text-xs font-bold rounded-full w-auto px-1 h-4 flex items-center justify-center">
              {formatCount(counters.favorites)}
            </span>
          ) : null}
        </Button>
      </Link>

      {/* Messages */}
      <Link href="/messages" className="relative hidden lg:flex items-center">
        <Button variant="ghost" size="icon" className="rounded-full h-6 w-6">
          <MessageSquare className="h-5 w-5 text-gray-700" />
          {counters.messages ? (
            <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-primary_1 text-white text-xs font-bold rounded-full w-auto px-1 h-4 flex items-center justify-center">
              {formatCount(counters.messages)}
            </span>
          ) : null}
        </Button>
      </Link>

      {/* Notifications */}
      <Link
        href="/notifications"
        className="relative hidden lg:flex items-center"
      >
        <Button variant="ghost" size="icon" className="rounded-full h-6 w-6">
          <Bell className="h-5 w-5 text-gray-700" />
          {counters.notifications ? (
            <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-primary_1 text-white text-xs font-bold rounded-full w-auto px-1 h-4 flex items-center justify-center">
              {formatCount(counters.notifications)}
            </span>
          ) : null}
        </Button>
      </Link>

      {/* User Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="relative rounded-full h-12 w-12 p-1"
          >
            <Avatar className="h-full w-full">
              <AvatarImage src={user.image} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user.name}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link href="/account" className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Account</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/my-adverts" className="cursor-pointer">
                <FileText className="mr-2 h-4 w-4" />
                <span>My Adverts</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/settings" className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/performance" className="cursor-pointer">
                <BarChart2 className="mr-2 h-4 w-4" />
                <span>Performance</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={onLogout} className="text-red-600">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
