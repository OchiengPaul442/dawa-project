// components/ProductDetails.tsx

import React, { useState } from 'react';
import { FaHeart, FaShieldAlt, FaPlus, FaStore } from 'react-icons/fa';
import { HiOutlineArrowRight } from 'react-icons/hi';
import { useRouter } from 'next/navigation';
import StarRating from '../../../components/shared/StarRating';
import CustomImage from '../../../components/shared/CustomImage';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import useWindowSize from '@core/hooks/useWindowSize';
import { useAuth } from '@core/hooks/use-auth';
import { useDispatch } from '@redux-store/hooks';
import { openAuthDialog } from '@redux-store/slices/authDialog/authDialogSlice';
import { FaFlag, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';

// Importing the new components
import ReportAbuseDialog from '@/components/dialogs/ReportAbuseDialog';
import SendMessageDialog from '@/components/dialogs/SendMessageDialog';
import ContactSellerDialog from '@/components/dialogs/ContactSellerDialog';
import SafetyTipsDialog from '../../../components/dialogs/SafetyTipsDialog';

interface ProductDetailsProps {
  product: {
    id: string;
    title: string;
    rating: number;
    totalReviews: number;
    sold: number;
    viewed: number;
    price: string;
    status: string;
    seller: {
      avatar: string;
      name: string;
      location: string;
      phone?: string;
      email?: string;
    };
  };
}

const safetyTips = [
  'Always inspect the item before purchasing.',
  'Meet in a public, well-lit place for transactions.',
  'Verify the authenticity of the product before paying.',
  'Avoid sharing personal or financial details with strangers.',
  'Report suspicious activity immediately.',
];

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const router = useRouter();
  const { user } = useAuth();
  const dispatch = useDispatch();

  // State management
  const [reportAbuseDetails, setReportAbuseDetails] = useState({
    name: '',
    email: '',
    description: '',
  });
  const [messageDetails, setMessageDetails] = useState({
    message: '',
  });

  const [isWishlisted, setIsWishlisted] = useState(false);
  const [safetyDialogOpen, setSafetyDialogOpen] = useState(false);
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const { width } = useWindowSize();
  const isBreakPoint = width < 1300;

  // Handlers
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    stateSetter: React.Dispatch<React.SetStateAction<any>>,
  ) => {
    const { name, value } = e.target;
    stateSetter((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitReport = () => {
    console.log('Report Submitted:', reportAbuseDetails);
    alert('Thank you for reporting. We will review your submission shortly.');
    setReportAbuseDetails({ name: '', email: '', description: '' });
    setReportDialogOpen(false);
  };

  const handleSubmitMessage = () => {
    console.log('Message Sent:', messageDetails);
    alert('Your message has been sent to the seller.');
    setMessageDetails({ message: '' });
    setMessageDialogOpen(false);
  };

  const toggleWishlist = () => {
    if (!user) {
      dispatch(openAuthDialog());
      return;
    }
    setIsWishlisted(!isWishlisted);
  };

  const handlePostAd = () => {
    if (!user) {
      dispatch(openAuthDialog());
      return;
    }
    console.log('Post Ad');
  };

  const handleAction = (action: () => void) => {
    if (!user) {
      dispatch(openAuthDialog());
    } else {
      action();
    }
  };

  return (
    <div
      className={`grid ${isBreakPoint ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-3'} gap-6`}
    >
      {/* Main Content */}
      <div className={isBreakPoint ? 'space-y-6' : 'lg:col-span-2 space-y-6'}>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            {product.title}
          </h1>
          <div className="flex flex-wrap items-center text-sm space-x-4 mb-6">
            <div className="flex items-center text-primary_1 gap-2 font-semibold">
              <span className="text-lg">{product.rating.toFixed(1)}</span>
              <StarRating
                initialRating={product.rating}
                maxRating={5}
                starSize={18}
                readOnly
              />
            </div>
            <span className="text-gray-500">
              {product.totalReviews.toLocaleString()} reviews
            </span>
            <span className="text-gray-500">
              {product.sold.toLocaleString()} Sold
            </span>
            <span className="text-gray-500">
              {product.viewed.toLocaleString()} Viewed
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary_1 mb-6">
            {product.price}
          </h2>
          <Badge variant="outline" className="text-green-600 border-green-600">
            {product.status}
          </Badge>
        </div>

        {/* Seller Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl">
              Seller Information
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center space-x-6">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gray-300 overflow-hidden">
              <CustomImage
                src={product.seller.avatar}
                alt="Seller"
                fill
                style={{
                  objectFit: 'cover',
                }}
              />
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-bold text-gray-800">
                {product.seller.name}
              </h3>
              <p className="text-gray-600 mb-2">{product.seller.location}</p>
              <Button variant="link" className="text-primary_1 p-0 h-auto">
                <FaStore className="mr-2" /> View Store
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4">
          <Button
            variant="outline"
            size="lg"
            className="flex-1"
            onClick={() => setContactDialogOpen(true)}
          >
            <FaPhoneAlt className="mr-2 h-4 w-4" /> Contact
          </Button>

          <Button
            size="lg"
            className="flex-1 bg-primary_1 hover:bg-primary_1/90"
            onClick={() => handleAction(() => setMessageDialogOpen(true))}
          >
            <FaEnvelope className="mr-2 h-4 w-4" /> Message
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={() => {
              if (!user) {
                dispatch(openAuthDialog());
                return;
              } else {
                router.push(`/reviews/${product.id}`);
              }
            }}
            className="flex-1"
          >
            <HiOutlineArrowRight className="mr-2 h-4 w-4" /> See Reviews
          </Button>
        </div>
      </div>

      {/* Sidebar */}
      <div className="col-span-1 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              className="w-full bg-primary_1 hover:bg-primary_1/90"
              onClick={toggleWishlist}
            >
              <FaHeart
                className={`mr-2 h-4 w-4 ${isWishlisted ? 'text-red-500' : 'text-white'}`}
              />
              {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
            </Button>

            <Button onClick={handlePostAd} className="w-full" variant="outline">
              <FaPlus className="mr-2 h-4 w-4" /> Post an Ad
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Safety & Reporting</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Safety Tips Dialog */}
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setSafetyDialogOpen(true)}
            >
              <FaShieldAlt className="mr-2 h-4 w-4" /> Safety Tips
            </Button>

            {/* Report Abuse Button */}
            <Button
              variant="outline"
              className="w-full text-red-600 hover:text-red-700"
              onClick={() => handleAction(() => setReportDialogOpen(true))}
            >
              <FaFlag className="mr-2 h-4 w-4" /> Report Abuse
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Dialog Components */}
      <ReportAbuseDialog
        open={reportDialogOpen}
        onOpenChange={setReportDialogOpen}
        reportAbuseDetails={reportAbuseDetails}
        handleInputChange={(e) => handleInputChange(e, setReportAbuseDetails)}
        handleSubmitReport={handleSubmitReport}
      />

      <SendMessageDialog
        open={messageDialogOpen}
        onOpenChange={setMessageDialogOpen}
        messageDetails={messageDetails}
        handleInputChange={(e) => handleInputChange(e, setMessageDetails)}
        handleSubmitMessage={handleSubmitMessage}
      />

      <ContactSellerDialog
        open={contactDialogOpen}
        onOpenChange={setContactDialogOpen}
        sellerContact={{
          phone: product.seller.phone || '+1234567890',
          email: product.seller.email || 'seller@example.com',
        }}
      />

      <SafetyTipsDialog
        open={safetyDialogOpen}
        onOpenChange={setSafetyDialogOpen}
        safetyTips={safetyTips}
      />
    </div>
  );
};

export default ProductDetails;
