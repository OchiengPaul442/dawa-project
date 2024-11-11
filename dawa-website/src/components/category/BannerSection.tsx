'use client';

import Image from 'next/image';
import React from 'react';

const BannerSection = () => {
  return (
    <div className="relative flex items-center rounded-2xl overflow-hidden h-72">
      {/* Text and Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-transparent z-10 flex items-center p-8 sm:p-12">
        <div className="w-2/3 sm:w-1/2 flex flex-col gap-1 lg:gap-4">
          <h3 className="text-sm font-semibold text-gray-400 uppercase">
            Most Viewed Category
          </h3>
          <h2 className="text-3xl font-bold mt-2 text-black">
            Laptop & Computers Category
          </h2>
          <p className="text-gray-500 mt-2 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore.
          </p>
        </div>
      </div>

      {/* Background Image */}
      <div className="absolute inset-0 right-0">
        <Image
          src="https://images.unsplash.com/photo-1541807084-5c52b6b3adef?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Laptop & Computers Banner"
          layout="fill"
          objectFit="cover"
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default BannerSection;
