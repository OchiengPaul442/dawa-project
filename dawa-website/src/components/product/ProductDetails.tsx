import React, { useState } from 'react';
import {
  FaHeart,
  FaPhoneAlt,
  FaEnvelope,
  FaShieldAlt,
  FaFlag,
} from 'react-icons/fa';
import { HiOutlineArrowRight } from 'react-icons/hi';
import StarRating from '../common/StarRating';
import CustomImage from '../common/CustomImage';
import Button from '../common/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface ProductDetailsProps {
  product: {
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
  const [reportAbuseDetails, setReportAbuseDetails] = useState({
    name: '',
    email: '',
    description: '',
  });

  const [isWishlisted, setIsWishlisted] = useState(false);
  const [safetyDialogOpen, setSafetyDialogOpen] = useState(false);
  const [reportDialogOpen, setReportDialogOpen] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setReportAbuseDetails((prev) => ({
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

  const toggleWishlist = () => {
    setIsWishlisted((prev) => !prev);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">{product.title}</h1>
      <div className="flex items-center justify-between mb-4">
        <div className="flex flex-wrap items-center text-sm space-x-2 mb-2">
          <div className="flex items-center text-primary_1 gap-2 font-semibold">
            <span>{product.rating.toFixed(1)}</span>
            <StarRating
              initialRating={product.rating}
              maxRating={5}
              starSize={16}
              readOnly
            />
          </div>
          <span className="text-gray-500">
            ({product.totalReviews.toLocaleString()} reviews)
          </span>
          <span className="text-gray-500">|</span>
          <span className="text-gray-500">
            {product.sold.toLocaleString()} Sold
          </span>
          <span className="text-gray-500">|</span>
          <span className="text-gray-500">
            {product.viewed.toLocaleString()} Viewed
          </span>
        </div>
        <div className="flex items-center">
          <button
            className="flex items-center space-x-1"
            onClick={toggleWishlist}
          >
            <FaHeart
              className={`${
                isWishlisted ? 'text-primary_1' : 'text-gray-500'
              } transition duration-200`}
            />
            <span
              className={`${
                isWishlisted ? 'text-primary_1' : 'text-gray-500'
              } transition duration-200`}
            >
              {isWishlisted ? 'Wishlisted' : 'Add to wishlist'}
            </span>
          </button>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-primary_1 mb-6">
        {product.price}
      </h2>

      {/* Seller Info */}
      <div className="flex items-center bg-gray-100 p-4 rounded-lg space-x-4 mb-6">
        <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden">
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
          <h3 className="font-bold text-gray-800">{product.seller.name}</h3>
          <p className="text-sm text-gray-600">{product.seller.location}</p>
          <a href="#" className="text-primary_1 hover:text-primary_1 text-sm">
            View Store
          </a>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-4 mb-6">
        <Button
          icon={FaPhoneAlt}
          className="flex items-center h-10 space-x-2 px-6 py-2 bg-gray-200 rounded-lg text-gray-800 hover:bg-gray-300"
        >
          <span>Contact</span>
        </Button>
        <Button
          icon={FaEnvelope}
          className="flex items-center h-10 space-x-2 px-6 py-2 bg-primary_1 text-white rounded-lg hover:bg-primary_1"
        >
          <span>Message</span>
        </Button>
        <Button
          icon={HiOutlineArrowRight}
          className="flex items-center h-10 space-x-2 px-6 py-2 bg-gray-200 rounded-lg text-gray-800 hover:bg-gray-300"
        >
          <span>See Reviews</span>
        </Button>
      </div>

      {/* Product Status */}
      <p className="text-sm text-gray-600 mb-4">
        <span className="font-bold">Status:</span>{' '}
        <span className="text-green-600">{product.status}</span>
      </p>

      {/* Safety Tips and Report Abuse */}
      <div className="flex space-x-4">
        {/* Safety Tips Dialog */}
        <Dialog open={safetyDialogOpen} onOpenChange={setSafetyDialogOpen}>
          <DialogTrigger asChild>
            <Button
              icon={FaShieldAlt}
              className="flex items-center h-10 space-x-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
            >
              <span>Safety Tips</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Safety Tips</DialogTitle>
              <DialogDescription>
                Follow these safety tips to ensure secure transactions:
              </DialogDescription>
            </DialogHeader>
            <ul className="list-disc pl-5 text-gray-700">
              {safetyTips.map((tip, index) => (
                <li key={index} className="mb-2">
                  {tip}
                </li>
              ))}
            </ul>
            <DialogFooter>
              <Button
                className="px-4 py-2 bg-primary_1 text-white rounded-lg hover:bg-primary_1"
                onClick={() => setSafetyDialogOpen(false)}
              >
                Got It
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Report Abuse Dialog */}
        <Dialog open={reportDialogOpen} onOpenChange={setReportDialogOpen}>
          <DialogTrigger asChild>
            <Button
              icon={FaFlag}
              className="flex items-center h-10 space-x-2 px-4 text-red-600 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              <span className="text-gray-800">Report Abuse</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Report Abuse</DialogTitle>
              <DialogDescription>
                Fill out the form below to report any issues with this product:
              </DialogDescription>
            </DialogHeader>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmitReport();
              }}
              className="space-y-4"
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={reportAbuseDetails.name}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary_1"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={reportAbuseDetails.email}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary_1"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={reportAbuseDetails.description}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary_1"
                  rows={4}
                  required
                />
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  className="px-4 py-2 bg-primary_1 text-white rounded-lg hover:bg-primary_1 h-10"
                >
                  Submit Report
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ProductDetails;
