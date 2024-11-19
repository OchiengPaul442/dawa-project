'use client';

import React, { useState } from 'react';
import {
  FaUnlock,
  FaUserCircle,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
} from 'react-icons/fa';
import Button from '@/components/common/Button';
import { Checkbox } from '@/components/ui/checkbox';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import GoogleIcon from '@public/assets/svgs/google.svg';
import InputField from '@/components/account/InputField';

// Define the shape of form data
interface IFormInputs {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  terms: boolean;
}

// Improved validation schema
const schema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Minimum 6 characters')
    .required('Password is required'),
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  phone: yup
    .string()
    .required('Phone number is required')
    .test('isValidPhone', 'Phone number is invalid', function (value) {
      if (!value) return false;

      // The phone input component removes the + and spaces automatically
      // We just need to verify we have the right number of digits
      const digitOnly = value.replace(/\D/g, '');

      // Allow phone numbers between 10 and 15 digits (including country code)
      return digitOnly.length >= 10 && digitOnly.length <= 15;
    }),
  terms: yup
    .boolean()
    .oneOf([true], 'You must accept the terms and policies')
    .required(),
});

const RegistrationForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

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

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    // Format the phone number with country code before submission
    const formattedData = {
      ...data,
      phone: `+${data.phone}`,
    };
    console.log('Form Data:', formattedData);
  };

  return (
    <div className="flex-1 p-8 bg-gray-50 lg:rounded-r-2xl">
      <h2 className="text-2xl font-semibold mb-2">Create an Account</h2>
      <p className="text-gray-500 mb-6">
        Please fill in your details to create your account.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

        <div>
          <label className="block font-semibold text-gray-700 mb-1">
            Phone Number
          </label>
          <Controller
            name="phone"
            control={control}
            render={({ field: { onChange, value } }) => (
              <PhoneInput
                country="ug"
                enableAreaCodes={true}
                value={value}
                onChange={(phone) => onChange(phone)}
                inputClass={`w-full bg-gray-50 border rounded-lg p-2 ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
                containerClass="w-full"
                buttonClass="bg-gray-50 border border-gray-300 rounded-lg"
                inputProps={{
                  placeholder: 'Enter phone number',
                  className:
                    'w-full flex-grow focus-within:border-primary_1 outline-none bg-transparent text-gray-700 placeholder-gray-400 border rounded-r-md px-12 py-4 bg-gray-50',
                }}
              />
            )}
          />

          {errors.phone && (
            <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>
          )}
        </div>

        <InputField
          label="Email Address"
          icon={FaEnvelope}
          type="email"
          placeholder="Enter email"
          {...register('email')}
          errors={errors.email?.message}
        />

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
            <a href="#" className="text-primary_1 hover:underline">
              Terms and Policies
            </a>
          </label>
        </div>
        {errors.terms && (
          <p className="text-sm text-red-500 mt-1">{errors.terms.message}</p>
        )}

        <Button
          type="submit"
          disabled={!isValid}
          className={`w-full mt-6 h-12 bg-primary_1 text-white py-3 rounded-md font-bold hover:bg-primary_1-dark transition-colors ${
            !isValid ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          REGISTER
        </Button>

        <Button
          type="button"
          icon={GoogleIcon}
          className="w-full mt-4 h-12 shadow-none flex items-center justify-center bg-gray-200 text-gray-700 py-3 rounded-md font-semibold hover:bg-gray-300 transition-colors"
        >
          Register with Google
        </Button>
      </form>
    </div>
  );
};

export default RegistrationForm;
