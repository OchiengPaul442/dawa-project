import React from 'react';
import { FaHeart, FaPlus, FaShieldAlt, FaFlag } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useWishlistActions } from '@core/hooks/useWishlistActions';

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
  const { isInWishlist, toggle, isLoading } = useWishlistActions();
  const isWishlisted = isInWishlist(productId);

  const handleWishlistToggle = async () => {
    await toggle(productId);
  };

  return (
    <div className="col-span-1 space-y-6">
      {/* Post Ad Card */}
      <Card
        className="bg-gray-700 text-white cursor-pointer hover:bg-gray-800 transition-colors duration-200"
        onClick={onPostAd}
      >
        <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
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

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
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
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Safety & Reporting</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
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
