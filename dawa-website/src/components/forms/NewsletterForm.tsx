import type React from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const NewsletterForm: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter subscription logic
    console.log('Subscribing email:', email);
    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <h3 className="text-lg font-semibold text-gray-900">
        Subscribe to our newsletter
      </h3>
      <p className="text-sm text-gray-600">
        Stay updated with our latest offers and products
      </p>
      <div className="flex gap-2">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-grow"
        />
        <Button
          type="submit"
          className="bg-primary_1 hover:bg-primary_1/90 text-white"
        >
          Subscribe
        </Button>
      </div>
    </form>
  );
};

export default NewsletterForm;
