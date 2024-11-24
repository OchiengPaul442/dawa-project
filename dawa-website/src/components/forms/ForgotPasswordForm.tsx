'use client';
import React from 'react';
import InputField from '@/components/account/InputField';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FaEnvelope } from 'react-icons/fa';
import Button from '../common/Button';

// Define form schema using yup
const forgotPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
});

// Define form input types
interface ForgotPasswordFormInputs {
  email: string;
}

const ForgotPasswordForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ForgotPasswordFormInputs>({
    resolver: yupResolver(forgotPasswordSchema),
    mode: 'onChange', // Enables form validation on change
  });

  const onSubmit: SubmitHandler<ForgotPasswordFormInputs> = (data) => {
    console.log('Forgot Password Form Submitted', data);
    // Implement your reset password logic here
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Email Field */}
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <InputField
            type="email"
            label="Email Address"
            placeholder="Enter your email"
            icon={FaEnvelope}
            {...field}
            errors={errors.email?.message}
          />
        )}
      />

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={!isValid}
        className={`w-full py-3 bg-primary_1 text-white font-semibold h-10 rounded-md shadow hover:bg-primary_1-dark transition-colors ${
          !isValid ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        Send Reset Link
      </Button>
    </form>
  );
};

export default ForgotPasswordForm;
