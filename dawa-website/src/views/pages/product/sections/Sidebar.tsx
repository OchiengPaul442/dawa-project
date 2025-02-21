import React from 'react';
import { FaHeart, FaPlus, FaShieldAlt, FaFlag } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useWishlist } from '@/contexts/WishlistContext';

interface SidebarProps {
  productId: string;
  onPostAd: () => void;
  onSafetyTips: () => void;
  onReportAbuse: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  productId,
  onPostAd,
  onSafetyTips,
  onReportAbuse,
}) => {
  const { isInWishlist, toggle, isLoading } = useWishlist();
  // const isWishlisted = isInWishlist(productId);

  // const handleWishlistToggle = async () => {
  //   await toggle(productId);
  // };

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1">
      {/* Post Ad Card */}
      <Card
        className="cursor-pointer hover:bg-gray-800 transition-colors duration-200 bg-gray-700 text-white flex flex-col h-full"
        onClick={onPostAd}
      >
        <CardContent className="p-6 flex flex-col items-center text-center space-y-4 flex-1">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
            <FaPlus className="h-8 w-8" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-1">
              Got something to sell?
            </h3>
            <p className="text-white/90">Post an advert for free!</p>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions Card */}
      {/* <Card className="flex flex-col h-full">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 flex-1 flex items-center justify-center">
          <Button
            className="w-full bg-primary_1 hover:bg-gray-700"
            onClick={handleWishlistToggle}
            disabled={isLoading}
          >
            <FaHeart
              className={`mr-2 h-4 w-4 ${isWishlisted ? 'text-red-500' : ''}`}
            />
            {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
          </Button>
        </CardContent>
      </Card> */}

      {/* Safety & Reporting Card */}
      <Card className="flex flex-col h-full">
        <CardHeader>
          <CardTitle>Safety & Reporting</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 flex-1 flex flex-col justify-center">
          <Button variant="outline" className="w-full" onClick={onSafetyTips}>
            <FaShieldAlt className="mr-2 h-4 w-4" /> Safety Tips
          </Button>
          <Button
            variant="outline"
            className="w-full text-red-600 hover:text-red-700"
            onClick={onReportAbuse}
          >
            <FaFlag className="mr-2 h-4 w-4" /> Report Abuse
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
