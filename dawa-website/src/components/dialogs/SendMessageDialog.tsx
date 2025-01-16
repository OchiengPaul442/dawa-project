'use client';

import React, { useState } from 'react';
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
import { useSendMessage } from '@core/hooks/useProductData';

interface SendMessageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  receiverId: string;
  itemId: string;
}

const SendMessageDialog: React.FC<SendMessageDialogProps> = ({
  open,
  onOpenChange,
  receiverId,
  itemId,
}) => {
  const { sendMessage, isSending, error } = useSendMessage();
  const [message, setMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmitMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await sendMessage({
        receiver_id: receiverId,
        item_id: itemId,
        message: message,
      });
      setMessage('');
      onOpenChange(false);

      alert('Message sent successfully');
    } catch {
      // Error is handled via the hook's error state
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Send a Message</DialogTitle>
          <DialogDescription>
            Send a message to the seller about this product.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmitMessage} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="message">Your Message</Label>
            <Textarea
              id="message"
              name="message"
              value={message}
              onChange={handleInputChange}
              rows={4}
              required
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm">
              {typeof error === 'string' ? error : error.message}
            </p>
          )}
          <DialogFooter>
            <Button
              type="submit"
              className="bg-primary_1 hover:bg-primary_1/90"
              disabled={isSending}
            >
              {isSending ? 'Sending...' : 'Send Message'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SendMessageDialog;
