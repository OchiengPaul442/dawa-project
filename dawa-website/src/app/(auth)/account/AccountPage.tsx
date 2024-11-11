'use client';
import React, { useState } from 'react';
import { FaLock, FaUser } from 'react-icons/fa';

const AccountPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex justify-center items-start">
      <div className="bg-white rounded-2xl flex flex-col md:flex-row w-full max-w-4xl border border-gray-200">
        {/* Login Section */}
        <div className="flex-1 p-8">
          <h2 className="text-2xl font-semibold mb-2">Login</h2>
          <p className="text-gray-500 mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="space-y-4">
            <label className="block font-semibold text-gray-700">
              Username/Email Address
            </label>
            <div className="flex items-center border rounded-md p-2 border-primary_1 bg-gray-50">
              <FaUser className="text-primary_1 mr-2" />
              <input
                type="text"
                placeholder="Type your username here"
                className="flex-grow outline-none bg-transparent text-gray-700 placeholder-gray-400"
              />
            </div>
            <label className="block font-semibold text-gray-700 mt-4">
              Password
            </label>
            <div className="flex items-center border rounded-md p-2 bg-gray-50">
              <FaLock className="text-gray-400 mr-2" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Type your password here"
                className="flex-grow outline-none bg-transparent text-gray-700 placeholder-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-primary_1 text-sm font-semibold"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between mt-4">
            <label className="flex items-center text-gray-700">
              <input type="checkbox" className="mr-2" />
              <span className="text-sm">Remember Me</span>
            </label>
            <a href="#" className="text-primary_1 text-sm font-semibold">
              Forgot Password
            </a>
          </div>
          <button className="w-full mt-6 bg-primary_1 text-white py-3 rounded-md font-bold hover:bg-primary_1 transition-colors">
            SIGN IN
          </button>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px bg-gray-200"></div>

        <div className="block md:hidden h-px bg-gray-200 my-4 mx-8"></div>

        {/* Register Section */}
        <div className="flex-1 p-8 bg-gray-50">
          <h2 className="text-2xl font-semibold mb-2">Create an Account</h2>
          <p className="text-gray-500 mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <label className="block font-semibold text-gray-700">
            Email Address
          </label>
          <div className="flex items-center border rounded-md p-2 border-primary_1 bg-gray-50">
            <FaUser className="text-primary_1 mr-2" />
            <input
              type="text"
              placeholder="Type your username here"
              className="flex-grow outline-none bg-transparent text-gray-700 placeholder-gray-400"
            />
          </div>
          <button className="w-full mt-6 bg-primary_1 text-white py-3 rounded-md font-bold hover:bg-primary_1 transition-colors">
            REGISTER
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
