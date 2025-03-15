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

interface SafetyTipsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  safetyTips: string[];
}

const SafetyTipsDialog: React.FC<SafetyTipsDialogProps> = ({
  open,
  onOpenChange,
  safetyTips,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Safety Tips</DialogTitle>
          <DialogDescription>
            Follow these safety tips to ensure secure transactions:
          </DialogDescription>
        </DialogHeader>
        <ul className="list-disc pl-5 text-gray-700 mt-4">
          {safetyTips.map((tip, index) => (
            <li key={index} className="mb-2">
              {tip}
            </li>
          ))}
        </ul>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Got It</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SafetyTipsDialog;
