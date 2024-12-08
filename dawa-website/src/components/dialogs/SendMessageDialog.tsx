// components/dialogs/SendMessageDialog.tsx

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface SendMessageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  messageDetails: {
    message: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmitMessage: () => void;
}

const SendMessageDialog: React.FC<SendMessageDialogProps> = ({
  open,
  onOpenChange,
  messageDetails,
  handleInputChange,
  handleSubmitMessage,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
              onChange={handleInputChange}
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
  );
};

export default SendMessageDialog;
