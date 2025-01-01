'use client';

import React, { useState, useEffect } from 'react';
import {
  FaUnlock,
  FaUserCircle,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
} from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import Button from '@/components/common/Button';
import { Checkbox } from '@/components/ui/checkbox';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import GoogleIcon from '@public/assets/svgs/google.svg';
import InputField from '@/components/Main/account/InputField';
import Link from 'next/link';
import { registerUser } from '@/lib/api/auth/api';
import { schema } from '@/@core/validations/authValidation';
import { signIn } from 'next-auth/react';
import { useAuth } from '@core/hooks/use-auth';

interface IFormInputs {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  terms: boolean;
}

const RegistrationForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<IFormInputs>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      phone: '',
      terms: false,
    },
  });

  const { user } = useAuth();

  // if user is authenticated, redirect to dashboard
  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  const handleGoogleSignIn = async () => {
    setLoading(true);

    // Initiate Google sign-in via NextAuth
    const result = await signIn('google', { redirect: false });

    if (result?.error) {
      return;
    } else if (result?.ok) {
      router.push('/');
    }

    setLoading(false);
  };

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    setLoading(true);
    setApiError(null);

    // Ensure the phone number is in E.164 format
    const formattedData = {
      email: data.email.trim(),
      password: data.password,
      password2: data.password,
      firstname: data.firstName.trim(),
      lastname: data.lastName.trim(),
      user_role: 'Client',
      contact: data.phone.trim(), // Already in "+<country><number>" format
    };

    try {
      const response = await registerUser(formattedData);

      if (response.status === 201 || response.status === 200) {
        // Save the email in session storage for use on the activation page
        sessionStorage.setItem('registeredEmail', formattedData.email);
        router.push('/activate');
      } else {
        throw new Error('Registration failed. Please try again.');
      }
    } catch (error: any) {
      console.error(
        'Registration failed:',
        error.response?.data?.message || error.message,
      );
      setApiError(
        error.response?.data?.message ||
          'Registration failed. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full md:w-[60%] px-10 py-12 md:px-12 md:py-16 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-2 text-black">
        Create an Account
      </h2>
      <p className="text-gray-500 mb-6">
        Please fill in your details to create your account.
      </p>

      {apiError && (
        <div className="mb-4 p-4 text-red-700 bg-red-100 border border-red-400 rounded">
          {apiError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name Fields */}
        <div className="flex flex-col w-full justify-between md:flex-row gap-4">
          <InputField
            label="First Name"
            icon={FaUserCircle}
            type="text"
            placeholder="First name"
            {...register('firstName')}
            errors={errors.firstName?.message}
          />

          <InputField
            label="Last Name"
            icon={FaUserCircle}
            type="text"
            placeholder="Last name"
            {...register('lastName')}
            errors={errors.lastName?.message}
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">
            Phone Number{' '}
            <span className="text-gray-300 text-sm font-normal">
              (e.g. +256 077 788 2393)
            </span>
          </label>
          <Controller
            name="phone"
            control={control}
            render={({ field: { onChange, value } }) => (
              <PhoneInput
                country="ug"
                enableAreaCodes={true}
                value={value}
                onChange={(numericValue) => {
                  // numericValue is something like "256778823938" for Uganda
                  let fullNumber = `+${numericValue}`.replace(/\s+/g, '');

                  // Remove a leading zero after country code (e.g., "+2560778823938" -> "+256778823938")
                  fullNumber = fullNumber.replace(/^(\+256)0/, '$1');

                  onChange(fullNumber);
                }}
                inputClass={`w-full bg-gray-50 border rounded-lg p-2 ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
                containerClass="w-full"
                buttonClass="bg-gray-50 border border-gray-300 rounded-lg"
                inputProps={{
                  placeholder: 'Enter phone number',
                  className:
                    'w-full flex-grow focus:border-primary_1 outline-none bg-transparent text-gray-700 placeholder-gray-400 border rounded-r-md px-12 py-4',
                }}
                specialLabel=""
              />
            )}
          />

          {errors.phone && (
            <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>
          )}
        </div>

        {/* Email Address */}
        <InputField
          label="Email Address"
          icon={FaEnvelope}
          type="email"
          placeholder="Enter email"
          {...register('email')}
          errors={errors.email?.message}
        />

        {/* Password */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">
            Password
          </label>
          <div
            className={`flex items-center border rounded-lg p-4 focus-within:border-primary_1 ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <FaUnlock className="text-gray-400 mr-2" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter password"
              {...register('password')}
              className="flex-grow outline-none bg-transparent text-gray-700 placeholder-gray-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-500 hover:text-primary_1 ml-2"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.password && (
            <p className="text-sm text-red-500 mt-1">
              {errors.password.message}
            </p>
          )}
          <p className="text-sm text-gray-500 mt-1">
            Never disclose your password to anyone.
          </p>
        </div>

        {/* Terms and Policies */}
        <div className="flex items-center mt-6">
          <Controller
            name="terms"
            control={control}
            render={({ field }) => (
              <Checkbox
                id="terms"
                checked={field.value}
                onCheckedChange={field.onChange}
                className="h-4 w-4"
              />
            )}
          />
          <label htmlFor="terms" className="ml-3 text-sm text-gray-700">
            I agree to the{' '}
            <Link
              href="/legal/terms"
              className="text-primary_1 hover:underline"
            >
              Terms and Policies
            </Link>
          </label>
        </div>
        {errors.terms && (
          <p className="text-sm text-red-500 mt-1">{errors.terms.message}</p>
        )}

        {/* Register Button */}
        <Button
          type="submit"
          disabled={!isValid || loading}
          className={`w-full mt-6 h-12 bg-primary_1 text-white py-3 rounded-md font-bold hover:bg-primary_1/90 transition-colors ${
            !isValid || loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Registering...' : 'REGISTER'}
        </Button>

        {/* Divider */}
        <div className="flex items-center justify-center mt-4">
          <hr className="flex-grow border-gray-300" />
          <span className="px-4 text-sm text-gray-500">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Register with Google */}
        <Button
          type="button"
          icon={GoogleIcon}
          onClick={handleGoogleSignIn}
          className="w-full mt-4 h-12 shadow-none flex items-center justify-center bg-gray-200 text-gray-700 py-3 rounded-md font-semibold hover:bg-gray-300 transition-colors"
        >
          Register with Google
        </Button>

        {/* Login Link */}
        <p className="mt-8 text-sm text-center text-gray-500">
          Already have an account?{' '}
          <Link href="/login" className="text-primary_1 hover:underline">
            Log In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegistrationForm;
