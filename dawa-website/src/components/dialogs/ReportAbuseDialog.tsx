'use client';

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
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
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { useReportAbuse } from '@core/hooks/useProductData';

// Define the valid reason types
const VALID_REASONS = [
  'Fake',
  'Damaged',
  'Fraudulent',
  'Illegal',
  'Other',
] as const;
type ReasonType = (typeof VALID_REASONS)[number];

interface ReportAbuseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  itemId: string;
}

// Updated form values interface to match schema types
interface ReportAbuseFormValues {
  reason: ReasonType;
  otherReason: string;
  description: string;
}

// Define the schema type
const schema: yup.ObjectSchema<ReportAbuseFormValues> = yup.object({
  reason: yup
    .string()
    .required('Reason is required')
    .oneOf(VALID_REASONS, 'Invalid reason') as yup.Schema<ReasonType>,
  otherReason: yup.string().when('reason', {
    is: (val: string) => val === 'Other',
    then: (schema) => schema.required('Please specify the reason'),
    otherwise: (schema) => schema.optional(),
  }),
  description: yup
    .string()
    .required('Description is required')
    .min(10, 'Description must be at least 10 characters'),
}) as yup.ObjectSchema<ReportAbuseFormValues>;

const ReportAbuseDialog: React.FC<ReportAbuseDialogProps> = ({
  open,
  onOpenChange,
  itemId,
}) => {
  const { reportAbuse, isLoading, error } = useReportAbuse();

  const {
    control,
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ReportAbuseFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      reason: 'Fake' as ReasonType, // Set a valid default value
      otherReason: '',
      description: '',
    },
  });

  const reasonWatch = watch('reason');

  const onSubmit = async (data: ReportAbuseFormValues) => {
    try {
      await reportAbuse({
        item_id: itemId,
        reason: data.reason === 'Other' ? data.otherReason : data.reason,
        description: data.description,
      });

      // Show success message
      alert('Report submitted successfully!');

      // Reset form and close dialog
      reset();
      onOpenChange(false);
    } catch (err) {
      console.error('Error submitting report:', err);
      alert('Failed to submit the report. Please try again.');
    }
  };

  // Handle dialog close
  const handleDialogClose = (open: boolean) => {
    if (!open) {
      reset();
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Report Abuse</DialogTitle>
          <DialogDescription>
            Please provide details about the issue you encountered with this
            product.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="reason">Reason for Report</Label>
            <Controller
              name="reason"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={(value: ReasonType) => field.onChange(value)}
                  value={field.value}
                >
                  <SelectTrigger id="reason" className="w-full">
                    <span>{field.value}</span>
                  </SelectTrigger>
                  <SelectContent>
                    {VALID_REASONS.map((reason) => (
                      <SelectItem key={reason} value={reason}>
                        {reason}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.reason && (
              <p className="text-red-500 text-sm">{errors.reason.message}</p>
            )}
          </div>

          {reasonWatch === 'Other' && (
            <div className="space-y-2">
              <Label htmlFor="otherReason">Please specify the reason</Label>
              <Textarea
                id="otherReason"
                {...register('otherReason')}
                rows={2}
                className="resize-none"
              />
              {errors.otherReason && (
                <p className="text-red-500 text-sm">
                  {errors.otherReason.message}
                </p>
              )}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="description">Detailed Description</Label>
            <Textarea
              id="description"
              {...register('description')}
              rows={4}
              placeholder="Please provide specific details about the issue..."
              className="resize-none"
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-3">
              <p className="text-red-700">Error: {error.message}</p>
            </div>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleDialogClose(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-primary_1 hover:bg-primary_1/90"
            >
              {isLoading ? 'Submitting...' : 'Submit Report'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReportAbuseDialog;
