'use client';

import React, { useState } from 'react';
import { FaUnlock, FaEye, FaEyeSlash } from 'react-icons/fa';
import Button from '@/components/common/Button';
import { Checkbox } from '@/components/ui/checkbox';
import GoogleIcon from '@public/assets/svgs/google.svg';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import InputField from '@/components/account/InputField';
import { FaUserCircle } from 'react-icons/fa';

// Improved type definitions
interface ILoginInputs {
  emailOrUsername: string;
  password: string;
  rememberMe: boolean;
}

// Enhanced validation schema
const schema = yup.object().shape({
  emailOrUsername: yup
    .string()
    .required('Username/Email is required')
    .test('is-valid', 'Please enter a valid email or username', (value) => {
      if (!value) return false;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const usernameRegex = /^[a-zA-Z0-9._-]{3,}$/;
      return emailRegex.test(value) || usernameRegex.test(value);
    }),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  rememberMe: yup.boolean().default(false),
});

const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<ILoginInputs>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      emailOrUsername: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit: SubmitHandler<ILoginInputs> = async (data) => {
    try {
      console.log('Login Data:', data);
      // Add your login logic here
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="flex-1 p-8 lg:rounded-l-2xl w-full">
      <h2 className="text-2xl font-semibold mb-2 text-center">Login</h2>
      <p className="text-gray-500 mb-6 text-center">
        Welcome back! Please login to your account.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email Field */}
        <InputField
          type="text"
          label="Username/Email Address"
          placeholder="Enter your username or email"
          icon={FaUserCircle}
          {...register('emailOrUsername')}
          errors={errors.emailOrUsername?.message}
        />

        {/* Password Field */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">
            Password
          </label>
          <div
            className={`flex items-center border rounded-lg p-4 ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <FaUnlock className="text-gray-400 mr-2" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              {...register('password')}
              className="flex-grow outline-none bg-transparent text-gray-700 placeholder-gray-400"
              aria-invalid={errors.password ? 'true' : 'false'}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-500 hover:text-primary_1 ml-2 focus:outline-none"
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
        </div>

        {/* Remember Me and Forgot Password */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center">
            <Controller
              name="rememberMe"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Checkbox
                  id="rememberMe"
                  className="mr-2"
                  checked={value}
                  onCheckedChange={onChange}
                />
              )}
            />
            <label htmlFor="rememberMe" className="text-gray-700 text-sm">
              Remember Me
            </label>
          </div>

          <a
            href="#"
            className="text-primary_1 text-sm font-semibold hover:underline"
          >
            Forgot Password?
          </a>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={!isValid}
          className={`w-full mt-6 h-12 bg-primary_1 text-white py-3 rounded-md font-bold hover:bg-primary_1-dark transition-colors ${
            !isValid ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          SIGN IN
        </Button>

        {/* Google Sign-In Button */}
        <Button
          type="button"
          icon={GoogleIcon}
          className="w-full mt-4 h-12 shadow-none flex items-center justify-center bg-gray-200 text-gray-700 py-3 rounded-md font-semibold hover:bg-gray-300 transition-colors"
        >
          Sign in with Google
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
