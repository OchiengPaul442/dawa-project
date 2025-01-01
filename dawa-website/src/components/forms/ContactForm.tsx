'use client';

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '../shared/Button';

// Define the shape of form data
interface IFormInput {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Define validation schema using Yup
const schema = yup
  .object({
    name: yup
      .string()
      .required('Name is required')
      .max(50, 'Name cannot exceed 50 characters'),
    email: yup
      .string()
      .required('Email is required')
      .email('Invalid email address'),
    subject: yup
      .string()
      .required('Subject is required')
      .max(100, 'Subject cannot exceed 100 characters'),
    message: yup
      .string()
      .required('Message is required')
      .min(10, 'Message must be at least 10 characters'),
  })
  .required();

const ContactForm: React.FC = () => {
  // Initialize the form with react-hook-form and Yup resolver
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  // Handle form submission
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('Your message has been sent successfully!');
        reset();
      } else {
        alert('Something went wrong. Please try again later.');
      }
    } catch (error) {
      console.error('Error submitting the form:', error);
      alert('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-8 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Get in Touch
      </h2>

      {/* Name Field */}
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 mb-2">
          Name<span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          {...register('name')}
          className={`w-full px-4 py-2 border ${
            errors.name ? 'border-red-500' : 'border-gray-300'
          } rounded-md focus:outline-none focus:ring-2 focus:ring-primary_1`}
          placeholder="Your Name"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* Email Field */}
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 mb-2">
          Email<span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          {...register('email')}
          className={`w-full px-4 py-2 border ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          } rounded-md focus:outline-none focus:ring-2 focus:ring-primary_1`}
          placeholder="your.email@dawa.com"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Subject Field */}
      <div className="mb-4">
        <label htmlFor="subject" className="block text-gray-700 mb-2">
          Subject<span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="subject"
          {...register('subject')}
          className={`w-full px-4 py-2 border ${
            errors.subject ? 'border-red-500' : 'border-gray-300'
          } rounded-md focus:outline-none focus:ring-2 focus:ring-primary_1`}
          placeholder="Subject"
        />
        {errors.subject && (
          <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
        )}
      </div>

      {/* Message Field */}
      <div className="mb-4">
        <label htmlFor="message" className="block text-gray-700 mb-2">
          Message<span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          {...register('message')}
          rows={5}
          className={`w-full px-4 py-2 border ${
            errors.message ? 'border-red-500' : 'border-gray-300'
          } rounded-md focus:outline-none focus:ring-2 focus:ring-primary_1`}
          placeholder="Your message..."
        ></textarea>
        {errors.message && (
          <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary_1 h-12 text-white py-2 px-4 rounded-md hover:bg-primary_1 transition duration-300 disabled:opacity-50"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  );
};

export default ContactForm;
