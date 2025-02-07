import { format } from 'date-fns';

/**
 * Formats a date to a standard format for e-commerce sites.
 * The default format is "MMM dd, yyyy" (e.g., "Aug 24, 2025").
 *
 * @param date - The date to format. Can be a Date object, string, or number.
 * @param dateFormat - (Optional) Custom format string to use.
 * @returns The formatted date string.
 */
export const formatDate = (
  date: Date | string | number,
  dateFormat: string = 'MMM dd, yyyy',
): string => {
  const parsedDate = new Date(date);
  return format(parsedDate, dateFormat);
};
