// components/dialogs/ContactSellerDialog.tsx

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface ContactSellerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sellerContact: {
    phone: string;
    email: string;
  };
}

const ContactSellerDialog: React.FC<ContactSellerDialogProps> = ({
  open,
  onOpenChange,
  sellerContact,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Contact Seller</DialogTitle>
          <DialogDescription>
            Here are the contact details for the seller.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-2">
          <p>
            <strong>Phone:</strong> {sellerContact.phone}
          </p>
          <p>
            <strong>Email:</strong> {sellerContact.email}
          </p>
        </div>
        <div className="mt-4">
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactSellerDialog;
