import type React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FaWhatsapp, FaPhone, FaEnvelope } from 'react-icons/fa';
import type { UserProfile } from './types';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { MapPin } from 'lucide-react';

interface ShopHeaderProps {
  user: UserProfile;
  stats: {
    total_items: number;
    available_items: number;
    sold_items: number;
  };
  /** When true, hide the sold stat and message button */
  isAdmin?: boolean;
}

export const ShopHeader: React.FC<ShopHeaderProps> = ({
  user,
  stats,
  isAdmin = false,
}) => (
  <div className="bg-white rounded-xl shadow-sm">
    <div className="p-6 border-b border-gray-100">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        <Avatar className="w-20 h-20 border-4 border-white shadow-lg">
          <AvatarImage
            src={user.user_profile_picture}
            alt={user.user.first_name}
          />
          <AvatarFallback>{user.user.first_name[0]}</AvatarFallback>
        </Avatar>

        <div className="flex-grow">
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
            <h1 className="text-2xl font-bold text-gray-900">
              {`${user.user.first_name} ${user.user.last_name}'s Shop`}
            </h1>
            <div className="flex flex-wrap gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge variant="secondary" className="gap-1">
                      <MapPin className="h-3 w-3" />
                      {user.address || 'Unknown'}
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Shop Location</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-semibold">
                    {stats.total_items}
                  </span>
                </div>
                <div className="text-sm">
                  <p className="text-gray-600">Total Items</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-green-50 flex items-center justify-center">
                  <span className="text-green-600 font-semibold">
                    {stats.available_items}
                  </span>
                </div>
                <div className="text-sm">
                  <p className="text-gray-600">Available</p>
                </div>
              </div>
              {isAdmin && (
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-orange-50 flex items-center justify-center">
                    <span className="text-orange-600 font-semibold">
                      {stats.sold_items}
                    </span>
                  </div>
                  <div className="text-sm">
                    <p className="text-gray-600">Sold Out</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 md:ml-auto">
          <Button
            className="bg-[#25D366] hover:bg-[#128C7E] gap-2"
            onClick={() =>
              window.open(`https://wa.me/${user.contact}`, '_blank')
            }
          >
            <FaWhatsapp className="h-4 w-4" />
            WhatsApp
          </Button>
          {/* {!isAdmin && (
            <Button variant="outline" className="gap-2">
              <FaEnvelope className="h-4 w-4" />
              Message
            </Button>
          )} */}
        </div>
      </div>
    </div>

    <div className="px-6 py-3 bg-gray-50/50 flex flex-wrap gap-4 text-sm text-gray-600">
      <div className="flex items-center gap-2">
        <FaPhone className="h-4 w-4 text-primary_1" />
        <span>{user.contact}</span>
      </div>
      <div className="flex items-center gap-2">
        <FaEnvelope className="h-4 w-4 text-primary_1" />
        <span>{user.user.email}</span>
      </div>
    </div>
  </div>
);
