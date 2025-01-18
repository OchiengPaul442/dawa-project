import React from 'react';

// Define the props interface
interface CurrencyFormatterProps {
  price: number;
  currency?: string;
  locale?: string;
  className?: string;
}

// CurrencyFormatter component with TypeScript
export const CurrencyFormatter: React.FC<CurrencyFormatterProps> = ({
  price,
  currency = 'UGX',
  locale = 'en-UG',
  className = '',
}) => {
  return (
    <span className={className}>
      {new Intl.NumberFormat(locale, { style: 'currency', currency }).format(
        price,
      )}
    </span>
  );
};
