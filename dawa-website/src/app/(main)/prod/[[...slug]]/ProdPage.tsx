'use client';
import React from 'react';
import ImageCarousel from '@/components/carousels/ImageCarousel';
import ProductTabs from '@/components/product/ProductTabs';
import ShareSection from '@/components/product/ShareSection';
import ProductDetails from '@/components/product/ProductDetails';
import Link from 'next/link';

const product = {
  title: 'LED Monitor With High Quality In The World',
  price: 'UGX1,250,000',
  rating: 4.5,
  totalReviews: 5,
  sold: 4320,
  viewed: 1400,
  status: 'Negotiable',
  seller: {
    name: 'Dawa Trading Limited',
    location: 'Kampala, Uganda',
    avatar:
      'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D',
  },
  images: [
    'https://images.unsplash.com/photo-1484788984921-03950022c9ef?q=80&w=2132&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1515846865653-cfda085cca48?w=500&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1524561506982-601111bed7a6?w=500&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1501163268664-3fdf329d019f?w=500&auto=format&fit=crop',
  ],
  specifications: [
    {
      title: 'Technical Specs',
      details: {
        Screen: '24 Inch',
        'Aspect Ratio': '16:9',
        'Panel Type': 'LED',
        'Refresh Rate': '120Hz',
        Resolution: '1920x1080',
      },
    },
    {
      title: 'Connectivity',
      details: {
        HDMI: '2 Ports',
        USB: '3 Ports',
        DisplayPort: '1 Port',
        'Audio Output': '3.5mm',
      },
    },
    {
      title: 'Power and Build',
      details: {
        'Power Supply': 'AC 110-240V, 50/60Hz',
        Weight: '3.5 Kg',
        Dimensions: '54.8 x 32.8 x 12.3 cm',
      },
    },
  ],
  reviews: [
    {
      name: 'John Doe',
      image:
        'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=500&auto=format&fit=crop',
      isVerified: true,
      rating: 4.5,
      review: 'Great product! Highly recommend it for office use.',
    },
    {
      name: 'Jane Smith',
      image:
        'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=500&auto=format&fit=crop',
      isVerified: true,
      rating: 4.0,
      review:
        'Good quality and decent performance. Works well for gaming and productivity.',
    },
    {
      name: 'Mike Johnson',
      image:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop',
      isVerified: false,
      rating: 3.5,
      review: 'Satisfactory product, but could use better color calibration.',
    },
    {
      name: 'Alice Brown',
      image:
        'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=500&auto=format&fit=crop',
      isVerified: true,
      rating: 5.0,
      review:
        'Excellent! The screen is bright and crisp. Perfect for video editing.',
    },
    {
      name: 'James Wilson',
      image:
        'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=500&auto=format&fit=crop',
      isVerified: false,
      rating: 2.0,
      review: 'Not what I expected. The build quality feels cheap.',
    },
  ],
};

interface ProdPageProps {
  slug: string[];
}

const ProdPage: React.FC<ProdPageProps> = ({ slug }) => {
  if (slug.length === 0) {
    // Handle `/prod` route
    return (
      <div>
        <h1>Welcome to the Prod Page</h1>
        <p>This is the default content for /prod.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      <section className="container mx-auto py-10 px-5">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 flex items-center space-x-2 mb-6">
          <Link href="/" className="hover:underline text-primary_1">
            Home
          </Link>
          <span>/</span>
          <Link
            href="/cat/TV & Monitors"
            className="hover:underline text-primary_1"
          >
            TV & Monitors
          </Link>
          <span>/</span>
          <span className="text-gray-800">LED</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Product Images Carousel */}
          <ImageCarousel images={product.images} />

          {/* Product Details */}
          <ProductDetails product={product} />
        </div>

        {/* Share Section */}
        <ShareSection />
      </section>

      <section>
        <ProductTabs product={product} />
      </section>
    </div>
  );
};

export default ProdPage;
