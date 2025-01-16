import React from 'react';
import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { HiOutlineArrowRight } from 'react-icons/hi';
import { Button } from '@/components/ui/button';

interface ActionButtonsProps {
  onContact: () => void;
  onMessage: () => void;
  onMakeOffer: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  onContact,
  onMessage,
  onMakeOffer,
}) => (
  <div className="flex flex-wrap gap-4">
    <Button variant="outline" size="lg" className="flex-1" onClick={onContact}>
      <FaPhoneAlt className="mr-2 h-4 w-4" /> Contact
    </Button>
    <Button size="lg" className="flex-1 bg-primary_1" onClick={onMessage}>
      <FaEnvelope className="mr-2 h-4 w-4" /> Message
    </Button>
    <Button
      variant="outline"
      size="lg"
      className="flex-1"
      onClick={onMakeOffer}
    >
      <HiOutlineArrowRight className="mr-2 h-4 w-4" /> Make an Offer
    </Button>
  </div>
);
