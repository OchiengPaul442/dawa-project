'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface MakeOfferDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentPrice: string | number;
  onSubmitOffer: (price: number) => void;
}

export default function MakeOfferDialog({
  open,
  onOpenChange,
  currentPrice,
  onSubmitOffer,
}: MakeOfferDialogProps) {
  // Ensure `currentPrice` is a number and fallback to 0 if invalid
  const basePrice =
    typeof currentPrice === 'string'
      ? parseInt(currentPrice.replace(/[^0-9]/g, '')) || 0
      : typeof currentPrice === 'number'
        ? currentPrice
        : 0;

  const [customPrice, setCustomPrice] = useState('');

  // Calculate suggested prices as percentages below the current price
  const getSuggestedPrices = (price: number) => {
    if (price <= 0) return [];
    return [
      Math.round(price * 0.95), // 5% below
      Math.round(price * 0.9), // 10% below
      Math.round(price * 0.85), // 15% below
      Math.round(price * 0.8), // 20% below
    ];
  };

  const suggestedPrices = getSuggestedPrices(basePrice);

  const handleSubmit = () => {
    const price = parseInt(customPrice);
    if (price > 0) {
      onSubmitOffer(price);
      onOpenChange(false);
      setCustomPrice('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Make an offer</DialogTitle>
        </DialogHeader>

        {/* Current Price Display */}
        <p className="text-center text-sm text-gray-500 mb-4">
          Current Price: UGX {basePrice.toLocaleString()}
        </p>

        {/* Suggested Offers */}
        {suggestedPrices.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 py-4">
            {suggestedPrices.map((price, index) => (
              <Button
                key={index}
                variant="outline"
                onClick={() => setCustomPrice(price.toString())}
                className="w-full"
              >
                UGX {price.toLocaleString()}
              </Button>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center mb-4">
            No suggestions available.
          </p>
        )}

        {/* Input Field with UGX prefix */}
        <div className="flex items-center gap-2">
          <span className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-md">
            UGX
          </span>
          <Input
            type="number"
            placeholder="Enter your price"
            value={customPrice}
            onChange={(e) => setCustomPrice(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1"
            min={1}
          />
          <Button
            onClick={handleSubmit}
            className="bg-primary_1 hover:bg-primary_1/90"
            disabled={!customPrice || parseInt(customPrice) <= 0}
          >
            Send
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
