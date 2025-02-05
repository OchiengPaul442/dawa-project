// src/views/pages/messages/MakeOfferDialog.tsx
'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { AlertCircle } from 'lucide-react';
import { useSendMessage } from '@core/hooks/useProductData';
import { formatCurrency } from '@/utils/CurrencyFormatter';

interface MakeOfferDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  receiverId: string; // from props, but must be converted to number
  itemId: string; // from props, but must be converted to number
  currentPrice: string | number;
}

interface MakeOfferFormValues {
  price: number;
}

const schema = yup
  .object({
    price: yup
      .number()
      .typeError('Price must be a valid number')
      .positive('Price must be greater than zero')
      .required('Price is required'),
  })
  .required();

const MakeOfferDialog: React.FC<MakeOfferDialogProps> = ({
  open,
  onOpenChange,
  receiverId,
  itemId,
  currentPrice,
}) => {
  // Ensure `currentPrice` is a number and fallback to 0 if invalid
  const basePrice =
    typeof currentPrice === 'string'
      ? parseInt(currentPrice.replace(/[^0-9]/g, '')) || 0
      : typeof currentPrice === 'number'
        ? currentPrice
        : 0;

  // Use your SWR hook for sending messages
  const { sendMessage, isSending, error } = useSendMessage();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MakeOfferFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      price: 0,
    },
  });

  const [suggestedPrices] = useState<number[]>([
    Math.round(basePrice * 0.95), // 5% below
    Math.round(basePrice * 0.9), // 10% below
    Math.round(basePrice * 0.85), // 15% below
    Math.round(basePrice * 0.8), // 20% below
  ]);

  const onSubmit = async (data: MakeOfferFormValues) => {
    const { price } = data;
    const formattedPrice = formatCurrency(price);

    // Generate a professional offer message
    const message = `Hello,

I am interested in your product and would like to offer ${formattedPrice}. Please let me know if this offer is acceptable to you.

Thank you`;

    try {
      await sendMessage({
        receiver_id: Number(receiverId), // convert to number
        item_id: Number(itemId), // convert to number
        message,
      });
      reset();
      onOpenChange(false);
      alert('Your offer has been sent successfully!');
    } catch (err: any) {
      console.error('Error sending offer:', err);
    }
  };

  // When a suggested price button is clicked, only update the form field (do not submit)
  const handleSuggestedPriceClick = (price: number) => {
    reset({ price });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Make an Offer</DialogTitle>
          <DialogDescription className="text-center mb-4">
            Submit your offer for the product.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Current Price Display */}
          <p className="text-center text-sm text-gray-500">
            Current Price: UGX {basePrice.toLocaleString()}
          </p>

          {/* Suggested Offers */}
          {suggestedPrices.length > 0 && (
            <div className="grid grid-cols-2 gap-4">
              {suggestedPrices.map((price, index) => (
                <Button
                  key={index}
                  variant="outline"
                  type="button" // <-- Set type="button" to prevent form submit
                  onClick={() => handleSuggestedPriceClick(price)}
                  className="w-full"
                >
                  UGX {price.toLocaleString()}
                </Button>
              ))}
            </div>
          )}

          {/* Custom Price Input */}
          <div className="space-y-2">
            <Label htmlFor="price">Your Offer Price (UGX)</Label>
            <div className="flex items-center">
              <span className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-l-md">
                UGX
              </span>
              <Input
                id="price"
                type="number"
                placeholder="Enter your offer price"
                {...register('price')}
                className="flex-1 border-t-0 border-b-0 border-l-0 rounded-none focus:border-primary_1"
                min={1}
              />
            </div>
            {errors.price && (
              <p className="text-red-500 text-sm">{errors.price.message}</p>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center text-red-500 text-sm">
              <AlertCircle className="w-5 h-5 mr-2" />
              <span>{typeof error === 'string' ? error : error.message}</span>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-primary_1 hover:bg-primary_1/90 flex items-center justify-center"
            disabled={isSending}
          >
            {isSending ? 'Sending Offer...' : 'Send Offer'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MakeOfferDialog;
