import React from 'react';
import { FaHeart, FaPlus, FaShieldAlt, FaFlag } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SidebarProps {
  isWishlisted: boolean;
  toggleWishlist: () => void;
  onPostAd: () => void;
  onSafetyTips: () => void;
  onReportAbuse: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isWishlisted,
  toggleWishlist,
  onPostAd,
  onSafetyTips,
  onReportAbuse,
}) => (
  <div className="col-span-1 space-y-6">
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button className="w-full bg-primary_1" onClick={toggleWishlist}>
          <FaHeart
            className={`mr-2 h-4 w-4 ${isWishlisted ? 'text-red-500' : ''}`}
          />
          {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
        </Button>
        <Button onClick={onPostAd} className="w-full" variant="outline">
          <FaPlus className="mr-2 h-4 w-4" /> Post an Ad
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
