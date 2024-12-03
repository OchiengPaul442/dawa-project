import React, { useState } from 'react';
import {
  FaHeart,
  FaPhoneAlt,
  FaEnvelope,
  FaShieldAlt,
  FaFlag,
  FaPlus,
  FaStore,
} from 'react-icons/fa';
import { HiOutlineArrowRight } from 'react-icons/hi';
import { useRouter } from 'next/navigation';
import StarRating from '../common/StarRating';
import CustomImage from '../common/CustomImage';
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
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import useWindowSize from '@/hooks/useWindowSize';
import { useAuth } from '@/hooks/use-auth';
import { useDispatch } from '@/lib/hooks';
import { openAuthDialog } from '@/lib/features/authDialog/authDialogSlice';

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

        <div className="flex flex-wrap gap-4">
          <Button
            variant="outline"
            size="lg"
            className="flex-1"
            onClick={() => handleAction(() => setContactDialogOpen(true))}
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
            <Dialog open={safetyDialogOpen} onOpenChange={setSafetyDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                  <FaShieldAlt className="mr-2 h-4 w-4" /> Safety Tips
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Safety Tips</DialogTitle>
                  <DialogDescription>
                    Follow these safety tips to ensure secure transactions:
                  </DialogDescription>
                </DialogHeader>
                <ul className="list-disc pl-5 text-gray-700 mt-4">
                  {safetyTips.map((tip, index) => (
                    <li key={index} className="mb-2">
                      {tip}
                    </li>
                  ))}
                </ul>
                <DialogFooter>
                  <Button onClick={() => setSafetyDialogOpen(false)}>
                    Got It
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

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

      {user && (
        <>
          <Dialog open={reportDialogOpen} onOpenChange={setReportDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Report Abuse</DialogTitle>
                <DialogDescription>
                  Fill out the form below to report any issues with this
                  product:
                </DialogDescription>
              </DialogHeader>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmitReport();
                }}
                className="space-y-4 mt-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={reportAbuseDetails.name}
                    onChange={(e) =>
                      handleInputChange(e, setReportAbuseDetails)
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Your Email</Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={reportAbuseDetails.email}
                    onChange={(e) =>
                      handleInputChange(e, setReportAbuseDetails)
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={reportAbuseDetails.description}
                    onChange={(e) =>
                      handleInputChange(e, setReportAbuseDetails)
                    }
                    rows={4}
                    required
                  />
                </div>
                <DialogFooter>
                  <Button
                    type="submit"
                    className="bg-primary_1 hover:bg-primary_1/90"
                  >
                    Submit Report
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          <Dialog open={messageDialogOpen} onOpenChange={setMessageDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Send a Message</DialogTitle>
                <DialogDescription>
                  Send a message to the seller about this product.
                </DialogDescription>
              </DialogHeader>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmitMessage();
                }}
                className="space-y-4 mt-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="message">Your Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={messageDetails.message}
                    onChange={(e) => handleInputChange(e, setMessageDetails)}
                    rows={4}
                    required
                  />
                </div>
                <DialogFooter>
                  <Button
                    type="submit"
                    className="bg-primary_1 hover:bg-primary_1/90"
                  >
                    Send Message
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          <Dialog open={contactDialogOpen} onOpenChange={setContactDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Contact Seller</DialogTitle>
                <DialogDescription>
                  Here are the contact details for the seller.
                </DialogDescription>
              </DialogHeader>
              <div className="mt-4">
                <p>Phone: +1234567890</p>
                <p>Email: seller@example.com</p>
              </div>
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
};

export default ProductDetails;
