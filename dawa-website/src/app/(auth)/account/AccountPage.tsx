'use client';
import React, { useState } from 'react';
import Login_form from '@/components/forms/login_form';
import Register_form from '@/components/forms/registration_form';

const AccountPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex justify-center items-start mt-6">
      <div className="bg-white rounded-2xl flex flex-col md:flex-row w-full max-w-6xl mx-auto border border-gray-200">
        {/* Login Section */}
        <Login_form />

        {/* Divider */}
        <div className="hidden md:block w-px bg-gray-200"></div>
        <div className="block md:hidden h-px bg-gray-200 my-4 mx-8"></div>

        {/* Register Section */}
        <Register_form />
      </div>
    </div>
  );
};

export default AccountPage;
