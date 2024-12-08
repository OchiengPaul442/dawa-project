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
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface ReportAbuseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reportAbuseDetails: {
    name: string;
    email: string;
    description: string;
  };
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  handleSubmitReport: () => void;
}

const ReportAbuseDialog: React.FC<ReportAbuseDialogProps> = ({
  open,
  onOpenChange,
  reportAbuseDetails,
  handleInputChange,
  handleSubmitReport,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Report Abuse</DialogTitle>
          <DialogDescription>
            Fill out the form below to report any issues with this product:
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmitReport();
          }}
          className="space-y-4 mt-4"
        >
          <div className="space-y-2">
            <Label htmlFor="name">Your Name</Label>
            <Input
              id="name"
              name="name"
              value={reportAbuseDetails.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Your Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={reportAbuseDetails.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={reportAbuseDetails.description}
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
              Submit Report
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReportAbuseDialog;
