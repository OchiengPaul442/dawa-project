'use client';

import React, { useState } from 'react';
import { useAuth } from '@/@core/hooks/use-auth';
import { useDispatch } from '@/redux-store/hooks';
import { openAuthDialog } from '@/redux-store/slices/authDialog/authDialogSlice';
import useWindowSize from '@/@core/hooks/useWindowSize';
import { ProductInfo } from './sections/ProductInfo';
import { SellerInfo } from './sections/SellerInfo';
import { ActionButtons } from './sections/ActionButtons';
import { Sidebar } from './sections/Sidebar';
import { ProductDialogs } from './sections/ProductDialogs';
import { ProductType } from '@/types/product';
import { useRouter } from 'next/navigation';
import ImageCarousel from './ImageCarousel';
import ProductTabs from './ProductTabs';
import ShareSection from './ShareSection';

interface ProductDetailsProps {
  product: ProductType;
}

type DialogType = 'safety' | 'report' | 'message' | 'contact' | 'makeOffer';

export const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const router = useRouter();

  const [dialogStates, setDialogStates] = useState<Record<DialogType, boolean>>(
    {
      safety: false,
      report: false,
      message: false,
      contact: false,
      makeOffer: false,
    },
  );

  const handleAction = (action: () => void) => {
    if (!user) {
      dispatch(openAuthDialog());
    } else {
      action();
    }
  };

  const toggleDialog = (dialog: DialogType) => {
    setDialogStates((prev) => ({ ...prev, [dialog]: !prev[dialog] }));
  };

  return (
    <>
      <section>
        {/* Main grid container with sidebar - reduced sidebar width from 300px to 250px */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,250px] gap-6">
          {/* Left column - main content */}
          <div className="space-y-8">
            {/* Images and details in grid row - adjusted ratio to give more space to images */}
            <div className="grid grid-cols-1 lg:grid-cols-[3fr,2fr] gap-8">
              {/* Product images section */}
              <div className="w-full">
                {product.images && product.images.length > 0 ? (
                  <ImageCarousel images={product.images as any} />
                ) : (
                  <p className="text-gray-500">
                    No images available for this product.
                  </p>
                )}
              </div>

              {/* Product details section */}
              <div className="space-y-6">
                <ProductInfo product={product} />
                <SellerInfo
                  seller={product.seller}
                  reviews={product.reviews as any}
                />
                <ActionButtons
                  onContact={() => toggleDialog('contact')}
                  onMessage={() => handleAction(() => toggleDialog('message'))}
                  onMakeOffer={() =>
                    handleAction(() => toggleDialog('makeOffer'))
                  }
                />
              </div>
            </div>

            {/* Product tabs spanning full width below */}
            <div className="w-full flex flex-col gap-10">
              <ShareSection title={product.name} />
              <ProductTabs product={product} />
            </div>
          </div>

          {/* Right column - sidebar */}
          <div className="lg:sticky lg:top-4 h-fit">
            <Sidebar
              productId={product.id}
              onPostAd={() => handleAction(() => router.push('/post-ad'))}
              onSafetyTips={() => toggleDialog('safety')}
              onReportAbuse={() => handleAction(() => toggleDialog('report'))}
            />
          </div>
        </div>
      </section>
      <ProductDialogs
        product={product}
        dialogStates={dialogStates}
        toggleDialog={toggleDialog}
      />
    </>
  );
};
