'use client';

import React, { useState } from 'react';
import { useAuth } from '@core/hooks/use-auth';
import { useDispatch } from '@redux-store/hooks';
import { openAuthDialog } from '@redux-store/slices/authDialog/authDialogSlice';
import useWindowSize from '@core/hooks/useWindowSize';
import { ProductInfo } from './sections/ProductInfo';
import { SellerInfo } from './sections/SellerInfo';
import { ActionButtons } from './sections/ActionButtons';
import { Sidebar } from './sections/Sidebar';
import { ProductDialogs } from './sections/ProductDialogs';

interface ProductDetailsProps {
  product: {
    id: string;
    name: string;
    price: string;
    location: string;
    item_negotiable: boolean;
    status: string;
    description: string;
    subcategory: string;
    category: string;
    images: {
      image_id: string;
      image_url: string;
    }[];
    seller: {
      seller_id: string;
      seller_name: string;
      seller_profile_picture: string | null;
      seller_address: string;
      seller_contact: string;
      seller_email: string;
    };
    reviews: any[];
    created_at: string;
    updated_at: string;
  };
}

type DialogType = 'safety' | 'report' | 'message' | 'contact' | 'makeOffer';

export const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const { width } = useWindowSize();
  const isBreakPoint = width < 1300;

  const [isWishlisted, setIsWishlisted] = useState(false);
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
    <div
      className={`grid ${isBreakPoint ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-3'} gap-6`}
    >
      <div className={isBreakPoint ? 'space-y-6' : 'lg:col-span-2 space-y-6'}>
        <ProductInfo product={product} />
        <SellerInfo seller={product.seller} />
        <ActionButtons
          onContact={() => toggleDialog('contact')}
          onMessage={() => handleAction(() => toggleDialog('message'))}
          onMakeOffer={() => handleAction(() => toggleDialog('makeOffer'))}
        />
      </div>
      <Sidebar
        isWishlisted={isWishlisted}
        toggleWishlist={() =>
          handleAction(() => setIsWishlisted(!isWishlisted))
        }
        onPostAd={() => handleAction(() => console.log('Post Ad'))}
        onSafetyTips={() => toggleDialog('safety')}
        onReportAbuse={() => handleAction(() => toggleDialog('report'))}
      />
      <ProductDialogs
        product={product}
        dialogStates={dialogStates}
        toggleDialog={toggleDialog}
      />
    </div>
  );
};
