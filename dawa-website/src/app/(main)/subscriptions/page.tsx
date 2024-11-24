'use client';
import React, { useState } from 'react';

const SubscriptionPage = () => {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      title: 'Free',
      price: '$0',
      description: 'Free for personal account',
      features: [
        'Access basic features',
        'Console Customization',
        'Artificial Intelligence and ML',
        'Share up to 5 guests',
      ],
      color: 'bg-green-500',
    },
    {
      title: 'Most Popular',
      price: isYearly ? '$180' : '$19',
      description: 'Free for personal account',
      features: [
        'Access basic features',
        'Console Customization',
        'Artificial Intelligence and ML',
        'Priority Support',
      ],
      color: 'bg-blue-500',
    },
    {
      title: 'Custom',
      price: isYearly ? 'Contact Us' : '$50',
      description: 'Free for personal account',
      features: [
        'All features from Most Popular',
        'Dedicated Support Team',
        'Custom Integrations',
        'Unlimited Users',
      ],
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 py-10 px-4">
      {/* Header Section */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800">Pricing Plan</h2>
        <h3 className="text-2xl mt-4">
          Let’s start building your tomorrow,{' '}
          <span className="text-orange-500 font-bold">today.</span>
        </h3>
        <div className="flex justify-center gap-4 mt-6">
          <button className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
            Get started for free
          </button>
          <button className="px-6 py-2 bg-transparent border border-orange-500 text-orange-500 rounded-lg hover:bg-orange-500 hover:text-white">
            Contact sales
          </button>
        </div>
        <div className="flex justify-center items-center gap-2 mt-4">
          <span className="text-green-500 font-semibold">Save up to 30%</span>
          <div className="flex bg-gray-200 p-1 rounded-full">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-4 py-2 rounded-full ${
                !isYearly
                  ? 'bg-orange-500 text-white'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-4 py-2 rounded-full ${
                isYearly
                  ? 'bg-orange-500 text-white'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              Yearly
            </button>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`rounded-xl p-6 shadow-lg ${plan.color} bg-opacity-20`}
          >
            <h3 className="text-xl font-bold text-gray-800 text-center">
              {plan.title}
            </h3>
            <p className="text-center text-3xl font-extrabold text-orange-500 mt-4">
              {plan.price}
            </p>
            <p className="text-center text-gray-600 text-sm">
              {plan.description}
            </p>
            <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
              <h4 className="text-lg font-semibold text-gray-800">Features</h4>
              <ul className="mt-4 space-y-2 text-gray-600">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <span className="w-4 h-4 bg-orange-500 rounded-full mr-2"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPage;
