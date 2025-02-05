'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

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

interface SendMessageFormValues {
  message: string;
}

const schema = yup.object({
  message: yup.string().required('Message is required'),
});

const SendMessageDialog: React.FC<SendMessageDialogProps> = ({
  open,
  onOpenChange,
  receiverId,
  itemId,
}) => {
  const { sendMessage, isSending, error } = useSendMessage();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SendMessageFormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: SendMessageFormValues) => {
    try {
      await sendMessage({
        receiver_id: Number(receiverId), // convert to number
        item_id: Number(itemId), // convert to number
        message: data.message,
      });
      reset();
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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="message">Your Message</Label>
            <Textarea id="message" {...register('message')} rows={4} />
            {errors.message && (
              <p className="text-red-500 text-sm">{errors.message.message}</p>
            )}
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
